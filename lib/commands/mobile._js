/**
* Copyright (c) Microsoft.  All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

var fs = require('fs');
var url = require('url');
var uuid = require('node-uuid');
var async = require('async');

var Channel = require('../util/channel');
var utils = require('../util/utils');
var util = require('util');
var __ = require('underscore');
var $ = utils.getLocaleString;

exports.init = function (cli) {

  var log = cli.output;

  cli.category('account').registerResourceType('Mobileservice');

  function promptServiceNameIfNotGiven (options, servicename, _) {
    var result = cli.interaction.chooseIfNotGiven($('Mobile Service: '), $('Retrieving choices'), servicename,
      function(cb) {
        mobile.listServices(options, function (error, services) {
          if(error) { cb(error); }
          cb(null, services.map(function(service) { return service.name; }));
        });
      }, _);

    return result;
  }

  function promptIfNotGiven(prompt, value, _) {
    var result = cli.interaction.promptIfNotGiven(prompt, value, _);
    if(result.length === 0) {
      throw new Error(util.format($('%s must be specified'), prompt.split(':')[0]));
    }
    return result;
  }

  function promptString(prompt, callback) {
    cli.prompt(prompt, function (text) {
      if (text.length > 0) {
        callback(text);
      }
      else {
        throw(new Error(util.format($('%s must be specified'), prompt.split(':')[0])));
      }
    });
  }

  function createSqlManagementService(subscription) {
    return utils.createSqlManagementService(cli.category('account').getCurrentSubscription(subscription), log);
  }

  function getBaseChannel(options) {
    var currentSubscription = cli.category('account').getCurrentSubscription(options.subscription);
    options.subscription = currentSubscription.Id;
    var managementEndpoint = url.parse(cli.environmentManager.getManagementEndpointUrl(currentSubscription.managementEndpointUrl));
    var pem = currentSubscription.managementCertificate;
    var host = managementEndpoint.hostname;
    var port = managementEndpoint.port;

    var channel = new Channel({
      host: host,
      port: port,
      key: pem.key,
      cert: pem.cert
    }).header('x-ms-version', '2012-03-01')
      .path(options.subscription);

    return channel;
  }

  function getMobileChannel(options) {
    var channel = getBaseChannel(options)
      .header('Accept', 'application/json')
      .path('services')
      .path('mobileservices');

    return channel;
  }

  function getAppManagerChannel(options) {
    var channel = getBaseChannel(options)
      .header('Accept', 'application/xml')
      .path('applications');

    return channel;
  }

  var mobile = cli.category('mobile')
        .description($('Commands to manage your Mobile Services'));

  mobile.getRegions = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('regions');

    channel.GET(callback);
  };

  mobile.listServices = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices');

    channel.GET(callback);
  };

  mobile.getService = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename);

    channel.GET(callback);
  };

  mobile.recover = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('recover')
      .query('targetMobileService', options.targetservicename);

    channel.POST(null, callback);
  };

  mobile.getScaleSettings = function(options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('scalesettings');

    channel.GET(function (error, scalesettings) {
      if (scalesettings) {
        scalesettings.numberOfInstances = typeof scalesettings.numberOfInstances === 'undefined' ? 1 : scalesettings.numberOfInstances;
        scalesettings.tier = scalesettings.tier || 'free';
      }

      callback(error, scalesettings);
    });
  };

  mobile.setScaleSettings = function(options, settings, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('scalesettings')
      .header('Content-Type', 'application/json');

    channel.send('PUT', settings, callback);
  };

  mobile.getServiceSettings = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('settings');

    channel.GET(callback);
  };

  /**
  * Formats the raw crossDomainWhitelist setting into a string for display
  * @param {array} [crossDomainWhitelist] Array of hosts in form of { host: value }
  * @return {string} Comma seperated list of hosts
  */
  function formatCrossDomainWhitelistForDisplay(crossDomainWhitelist) {
    var result = '';
    if(crossDomainWhitelist) {
      if(Array.isArray(crossDomainWhitelist)) {
        var data = [];
        crossDomainWhitelist.forEach(function (host) { data.push(host.host); });
        result = data.join(',');
      }
    } else {
      result = 'localhost';
    }

    return result;
  }

  /**
  * Converts a comma seperated list of the crossDomainWhitelists into their
  * raw value representation of { host: value }
  * @param {string} [crossDomainWhitelist] Comma seperated list of hosts
  * @return {array} Array of hosts in form of { host: value }
  */
  function formatCrossDomainWhitelistForSaving(crossDomainWhitelist) {
    var result = [];
    crossDomainWhitelist.split(',').forEach(function(host) {
      result.push({ host: host });
    });
    return result;
  }

  mobile.setServiceSettings = function (options, settings, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('settings')
      .header('Content-Type', 'application/json');

    log.silly('New service settings:');
    log.json('silly', settings);

    channel.send('PATCH', JSON.stringify(settings), callback);
  };

  mobile.getLiveSettings = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('livesettings');

    channel.GET(callback);
  };

  mobile.setLiveSettings = function (options, settings, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('livesettings')
      .header('Content-Type', 'application/json');

    log.silly('New live settings:');
    log.json('silly', settings);

    channel.PUT(JSON.stringify(settings), callback);
  };

  mobile.getAuthSettings = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('authsettings');

    channel.GET(callback);
  };

  mobile.setAuthSettings = function (options, settings, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('authsettings')
      .header('Content-Type', 'application/json');

    log.silly('New auth settings:');
    log.json('silly', settings);

    channel.PUT(JSON.stringify(settings), callback);
  };

  mobile.getApnsSettings = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('apns')
      .path('settings');

    channel.GET(callback);
  };

  mobile.setApnsSettings = function (options, settings, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('apns')
      .path('certificates')
      .header('Content-Type', 'application/json');

    channel.POST(settings, callback);
  };

  mobile.getGcmSettings = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('gcm')
      .path('settings');

    channel.GET(callback);
  };

  mobile.setGcmSettings = function (options, settings, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('gcm')
      .path('settings')
      .header('Content-Type', 'application/json');

    log.silly('New GCM settings:');
    log.json('silly', settings);

    channel.PUT(JSON.stringify(settings), callback);
  };

  mobile.getPreviews = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('previewfeatures');

    channel.GET(callback);
  };

  mobile.enablePreview = function (options, feature, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('previewfeatures')
      .header('Content-Type', 'application/json');

    log.silly($('Enabling preview feature'));
    log.json('silly', feature);

    channel.send('POST', JSON.stringify(feature), callback);
  };

  mobile.regenerateKey = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('regenerateKey')
      .query('type', options.type);

    channel.POST(null, callback);
  };

  mobile.setKey = function (options, key, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('keys')
      .header('Content-Type', 'application/json');

    log.silly('Setting key');
    log.json('silly', key);
    
    channel.PUT(JSON.stringify(key), callback);
  };

  mobile.restartService = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('redeploy');

    var progress = cli.interaction.progress($('Restarting mobile service'));
    try {
      channel.POST(null, function (error, result) {
        progress.end();
        callback(error, result);
      });
    }
    catch (e) {
      progress.end();
      throw e;
    }
  };

  mobile.getLogs = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('logs');

    if (options.query) {
      options.query.split('&').forEach(function (keyvalue) {
        var kv = keyvalue.split('=');
        if (kv.length === 2) {
          channel.query(kv[0], kv[1]);
        }
        else {
          return callback(new Error($('Invalid format of query parameter')));
        }
      });
    } else {
      if (options.continuationToken) {
        channel.query('continuationToken', options.continuationToken);
      }

      channel.query('$top', options.top || 10);

      var filter = [];
      if (options.type) {
        filter.push('Type eq \'' + options.type + '\'');
      }
      if (options.source) {
        filter.push('Source eq \'' + options.source + '\'');
      }
      if (filter.length > 0) {
        channel.query('$filter', filter.join(' and '));
      }
    }

    channel.GET(callback);
  };

  mobile.listTables = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('tables');

    channel.GET(callback);
  };

  mobile.getRepositorySharedFolder = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('repository')
      .path('service')
      .path('shared');

    channel.GET(callback);
  };
  
  mobile.getSharedScripts = function (options, _) {
    var files = mobile.getRepositorySharedFolder(options, _);
    return __.filter(files, function(file) { return file.name.indexOf('.js', file.length - 3) !== -1; });
  };

  mobile.getSharedScript = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('repository')
      .path('service')
      .path('shared')
      .path(options.script.shared.name + '.js');

    channel.GET(callback);
  };

  mobile.setSharedScript = function (options, script, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('repository')
      .path('service')
      .path('shared')
      .path(options.script.shared.name + '.js')
      .header('Content-Type', 'text/plain');

    channel.PUT(script, callback);
  };

  mobile.loadAllScripts = function (options, _) {
    var results = async.parallel({
      table: function (_) { return mobile.getAllTableScripts(options, _); },
      shared: function (_) { return mobile.getSharedScripts(options, _); },
      scheduler: function (_) { return mobile.getSchedulerScripts(options, _); },
      api: function (_) { return mobile.getCustomApis(options, _); }
    }, _);

    return results;
  };

  mobile.deleteSharedScript = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('repository')
      .path('service')
      .path('shared')
      .path(options.script.shared.name + '.js');

    channel.DELETE(callback);
  };

  /* Custom API Functions */

  mobile.getCustomApis = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('apis');

    channel.GET(callback);
  };

  mobile.createApi = function (options, settings, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('apis')
      .header('Content-Type', 'application/json');

    log.silly($('New api settings:'));
    log.json('silly', settings);

    channel.POST(JSON.stringify(settings), callback);
  };

  mobile.getCustomApi = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('apis')
      .path(options.apiname || options.script.api.name);

    channel.GET(callback);
  };

  mobile.setCustomApi = function (options, settings, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('apis')
      .path(options.apiname || options.script.api.name)
      .header('Content-Type', 'application/json');

    log.silly($('Updated api settings:'));
    log.json('silly', settings);

    channel.PUT(JSON.stringify(settings), callback);
  };

  mobile.getCustomApiScript = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('apis')
      .path(options.apiname || options.script.api.name)
      .path('script');

    channel.GET(callback);
  };

  mobile.setCustomApiScript = function (options, script, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('apis')
      .path(options.apiname || options.script.api.name)
      .path('script')
      .header('Content-Type', 'text/plain');

    channel.PUT(script, callback);
  };

  mobile.deleteCustomApi = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('apis')
      .path(options.apiname || options.script.api.name);

    channel.DELETE(callback);
  };

  /* Scheduler Functions */

  mobile.getSchedulerScripts = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('scheduler')
      .path('jobs');

    channel.GET(callback);
  };

  mobile.getJob = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('scheduler')
      .path('jobs')
      .path(options.jobname);

    channel.GET(callback);
  };

  mobile.getSchedulerScript = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('scheduler')
      .path('jobs')
      .path(options.script.scheduler.name)
      .path('script');

    channel.GET(callback);
  };

  mobile.setSchedulerScript = function (options, script, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('scheduler')
      .path('jobs')
      .path(options.script.scheduler.name)
      .path('script')
      .header('Content-Type', 'text/plain');

    channel.PUT(script, callback);
  };

  mobile.deleteSchedulerScript = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('scheduler')
      .path('jobs')
      .path(options.jobname || options.script.scheduler.name);

    channel.DELETE(callback);
  };

  mobile.createJob = function (options, job, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('scheduler')
      .path('jobs')
      .header('Content-Type', 'application/json');

    channel.send('POST', job, callback);
  };

  mobile.setJob = function (options, job, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('scheduler')
      .path('jobs')
      .path(options.jobname)
      .header('Content-Type', 'application/json');

    log.silly('New job settings:');
    log.json('silly', job);

    channel.send('PUT', JSON.stringify(job), callback);
  };

  mobile.getTableScripts = function (options, table, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('tables')
      .path(table)
      .path('scripts');

    channel.GET(callback);
  };

  mobile.getTableScript = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('tables')
      .path(options.script.table.name)
      .path('scripts')
      .path(options.script.table.operation)
      .path('code');

    channel.GET(callback);
  };

  mobile.setTableScript = function (options, script, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('tables')
      .path(options.script.table.name)
      .path('scripts')
      .path(options.script.table.operation)
      .path('code')
      .header('Content-Type', 'text/plain');

    channel.PUT(script, callback);
  };

  mobile.deleteTableScript = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('tables')
      .path(options.script.table.name)
      .path('scripts')
      .path(options.script.table.operation);

    channel.DELETE(callback);
  };

  mobile.getAllTableScripts = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var results = [];
    mobile.listTables(options, function (error, tables) {
      if (error || tables.length === 0) {
        return callback(error, tables);
      }

      var resultCount = 0;
      var finalError;
      tables.forEach(function (table) {
        mobile.getTableScripts(options, table.name, function (error, scripts) {
          finalError = finalError || error;
          if (Array.isArray(scripts)) {
            scripts.forEach(function (script) {
              script.table = table.name;
              results.push(script);
            });
          }

          if (++resultCount == tables.length) {
            callback(finalError, results);
          }
        });
      });
    });
  };

  mobile.getTable = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('tables')
      .path(options.tablename);

    channel.GET(callback);
  };

  mobile.createTable = function (options, settings, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('tables')
      .header('Content-Type', 'application/json');

    channel.POST(settings, callback);
  };

  mobile.deleteTable = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('tables')
      .path(options.tablename);

    channel.DELETE(callback);
  };

  mobile.truncateTable = function (options, payload, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('tables')
      .path(options.tablename)
      .path('truncate')
      .header('Content-Type', 'application/json');

    channel.POST(payload, callback);
  };

  mobile.getPermissions = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('tables')
      .path(options.tablename)
      .path('permissions');

    channel.GET(callback);
  };

  mobile.updatePermissions = function (options, newPermissions, callback) {
    log.verbose('Subscription', options.subscription);
    mobile.getPermissions(options, function (error, currentPermissions) {
      if (error) {
        return callback(error);
      }

      for (var i in currentPermissions) {
        if (!newPermissions[i]) {
          newPermissions[i] = currentPermissions[i];
        }
      }

      var channel = getMobileChannel(options)
        .path('mobileservices')
        .path(options.servicename)
        .path('tables')
        .path(options.tablename)
        .path('permissions')
        .header('Content-Type', 'application/json');

      channel.PUT(JSON.stringify(newPermissions), callback);
    });
  };

  mobile.getScripts = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('tables')
      .path(options.tablename)
      .path('scripts');

    channel.GET(callback);
  };

  mobile.getColumns = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('tables')
      .path(options.tablename)
      .path('columns');

    channel.GET(callback);
  };

  mobile.deleteColumn = function (options, column, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('tables')
      .path(options.tablename)
      .path('columns')
      .path(column);

    channel.DELETE(callback);
  };

  mobile.createIndex = function (options, column, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('tables')
      .path(options.tablename)
      .path('indexes')
      .path(column);

    channel.PUT(null, callback);
  };

  mobile.deleteIndex = function (options, column, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('tables')
      .path(options.tablename)
      .path('indexes')
      .path(column);

    channel.DELETE(callback);
  };

  mobile.getMobileServiceApplication = function (options, callback) {
    var channel = getAppManagerChannel(options)
      .path(options.servicename + 'mobileservice')
      .header('Content-Type', 'application/xml');

    channel.GET(callback);
  };

  mobile.deleteMobileServiceApplication = function (options, callback) {
    var channel = getAppManagerChannel(options)
      .path(options.servicename + 'mobileservice')
      .header('Content-Type', 'application/xml');

    channel.DELETE(function (error, body, res) {
      if (error) {
        log.silly(util.format($('Delete mobile service application error: %s'), JSON.stringify(error, null, 2)));
        return callback(error);
      }

      mobile.trackAsyncOperation(options, res.headers['x-ms-request-id'], function (error) {
        log.silly(util.format($('Delete mobile service application result: %s'), error ? JSON.stringify(error, null, 2) : 'ok'));
        callback(error);
      });
    });
  };

  mobile.getData = function (options, callback) {
    log.verbose('Subscription', options.subscription);
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename)
      .path('tables')
      .path(options.tablename)
      .path('data');

    if (options.query) {
      options.query.split('&').forEach(function (keyvalue) {
        var kv = keyvalue.split('=');
        if (kv.length === 2) {
          channel.query(kv[0], kv[1]);
        }
        else {
          return callback(new Error($('Invalid format of query parameter')));
        }
      });
    }
    else {
      channel.query('$top', options.top || 10);

      if (options.skip) {
        channel.query('$skip', options.skip);
      }
    }

    channel.GET(callback);
  };

  mobile.trackAsyncOperation = function (options, requestId, callback) {
    function waitOne() {
      var asyncChannel = getBaseChannel(options)
        .path('operations')
        .path(requestId)
        .header('Accept', 'application/json');

      asyncChannel.GET(function (error, body) {
        if (error) {
          return callback(new Error($('Unable to determine the status of the async operation. Please check the status on the management portal.')));
        }

        log.silly(util.format($('Operation status: %s'), body.Status));

        if (body.Status === 'Succeeded') {
          callback();
        }
        else if (body.Status === 'Failed') {
          callback(new Error($('Operation failed. Please confirm the status on the management portal')));
        }
        else if (body.Status !== 'InProgress') {
          callback(new Error($('Unexpected response from Windows Azure. ' +
            'Please confirm the status of the mobile service n the management portal')));
        }
        else {
          setTimeout(waitOne(), 5000);
        }
      });
    }

    waitOne();
  };

  var resourceTypeView = {
    'Microsoft.WindowsAzure.MobileServices.MobileService': 'Mobile service',
    'Microsoft.WindowsAzure.SQLAzure.DataBase': 'SQL database',
    'Microsoft.WindowsAzure.SQLAzure.Server': 'SQL server'
  };

  mobile.getFlatApplicationDescription = function (description) {
    var result = {
      State: description.State,
      Name: description.Name,
      Label: description.Label,
      Resources: []
    };

    function flatten(resource) {
      var list;
      if (Array.isArray(resource))
        list = resource;
      else if (typeof resource == 'object')
        list = [ resource ];

      if (list) {
        list.forEach(function (item) {
          result.Resources.push(item);
          item.TypeView = resourceTypeView[item.Type];
          item.NameView = item.Label || item.Name;
          if (typeof item.FailureCode === 'string') {
            var match = item.FailureCode.match(/<Message\>([^<]*)<\/Message\>/);
            item.Error = match ? match[1] : item.FailureCode;
          }
        });
      }
    }

    flatten(description.InternalResources.InternalResource);
    flatten(description.ExternalResources.ExternalResource);

    return result;
  };

  mobile.deleteService = function (options, callback) {
    var channel = getMobileChannel(options)
      .path('mobileservices')
      .path(options.servicename);

    if (options.deleteData) {
      channel.query('deletedata', 'true');
    }

    channel.DELETE(function (error, body) {
      log.silly($('Delete mobile service:'));
      log.silly(JSON.stringify(error, null, 2));
      log.silly(JSON.stringify(body, null, 2));

      // Treat not found (404) as success for delete purposes to match the logic we use on the portal
      if(error && error.Code === 404) {
        error = null;
      }
      callback(error);
    });
  };

  mobile.deleteSqlServer = function (options, resource, callback) {
    var sqlService = createSqlManagementService(options.subscription);
    sqlService.deleteServer(resource.Name, callback);
  };

  var createMobileServiceApplicationTemplate =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<Application xmlns="http://schemas.microsoft.com/windowsazure">' +
      '<Name>##name##</Name>' +
      '<Label>##label##</Label>' +
      '<Description>##description##</Description>' +
      '<Configuration>##spec##</Configuration>' +
    '</Application>';

  mobile.createService = function (options, callback) {
    var channel = getAppManagerChannel(options)
      .header('Content-Type', 'application/xml');

    var serverRefName = 'ZumoSqlServer_' + uuid.v4().replace(/-/g,'');
    var serverSpec;

    if (options.sqlServer) {
      // use existing SQL server
      serverSpec = {
        Name: serverRefName,
        Type: 'Microsoft.WindowsAzure.SQLAzure.Server',
        URI:  cli.environmentManager.getSqlManagementEndpointUrl() +
                options.subscription + '/services/sqlservers/servers/' + options.sqlServer
      };
    }
    else {
      // create new SQL server
      serverSpec = {
        ProvisioningParameters: {
          AdministratorLogin: options.username,
          AdministratorLoginPassword: options.password,
          Location: options.sqlLocation
        },
        ProvisioningConfigParameters: {
          FirewallRules: [
            {
              Name: 'AllowAllWindowsAzureIps',
              StartIPAddress: '0.0.0.0',
              EndIPAddress: '0.0.0.0'
            }
          ]
        },
        Version: '1.0',
        Name: serverRefName,
        Type: 'Microsoft.WindowsAzure.SQLAzure.Server'
      };
    }

    var dbRefName = 'ZumoSqlDatabase_' + uuid.v4().replace(/-/g,'');
    var dbSpec;

    if (options.sqlDb) {
      // use existing SQL database

      dbSpec = {
        Name: dbRefName,
        Type: 'Microsoft.WindowsAzure.SQLAzure.DataBase',
        URI: cli.environmentManager.getSqlManagementEndpointUrl() +
          options.subscription + '/services/sqlservers/servers/' + options.sqlServer +
          '/databases/' + options.sqlDb
      };
    }
    else {
      // create a new SQL database

      dbSpec = {
        ProvisioningParameters: {
          Name: options.servicename + '_db',
          Edition: 'WEB',
          MaxSizeInGB: '1',
          DBServer: {
            ResourceReference: serverRefName + '.Name'
          },
          CollationName: 'SQL_Latin1_General_CP1_CI_AS'
        },
        Version: '1.0',
        Name: dbRefName,
        Type: 'Microsoft.WindowsAzure.SQLAzure.DataBase'
      };
    }

    var spec = {
      SchemaVersion: '2012-05.1.0',
      Location: 'West US',
      ExternalResources: {},
      InternalResources: {
        ZumoMobileService: {
          ProvisioningParameters: {
            Name: options.servicename,
            Location: options.location
          },
          ProvisioningConfigParameters: {
            Server: {
              StringConcat: [
                {
                  ResourceReference: serverRefName + '.Name'
                },
                cli.environmentManager.getSqlServerHostnameSuffix()
              ]
            },
            Database: {
              ResourceReference: dbRefName + '.Name'
            },
            AdministratorLogin: options.username,
            AdministratorLoginPassword: options.password
          },
          Version: '2012-05-21.1.0',
          Name: 'ZumoMobileService',
          Type: 'Microsoft.WindowsAzure.MobileServices.MobileService'
        }
      }
    };

    if (options.sqlServer) {
      // use existing SQL server as an external resource
      spec.ExternalResources[serverRefName] = serverSpec;
    }
    else {
      // create a new SQL server as in internal resource
      spec.InternalResources[serverRefName] = serverSpec;
    }

    if (options.sqlDb) {
      spec.ExternalResources[dbRefName] = dbSpec;
    }
    else {
      // create a new SQL database as an internal resource
      spec.InternalResources[dbRefName] = dbSpec;
    }

    log.silly($('New mobile service application specification:'));
    log.silly(JSON.stringify(spec, null, 2));

    var encodedSpec = new Buffer(JSON.stringify(spec)).toString('base64');
    var payload = createMobileServiceApplicationTemplate
      .replace('##name##', options.servicename + 'mobileservice')
      .replace('##label##', options.servicename)
      .replace('##description##', options.servicename)
      .replace('##spec##', encodedSpec);

    log.silly($('New mobile service request body:'));
    log.silly(payload);

    var progress = cli.interaction.progress($('Creating mobile service'));
    try {
      channel.POST(payload, function (error, body, res) {
        if (error) {
          progress.end();
          return callback(error);
        }

        log.silly(util.format($('Create mobile app HTTP response: %s'), res.statusCode));
        log.silly(JSON.stringify(res.headers, null, 2));

        // async operation, wait for completion
        mobile.trackAsyncOperation(options, res.headers['x-ms-request-id'], function (error) {
          if (error) {
            progress.end();
            return callback(error);
          }

          // get the application specification and confirm the status of individual components
          var channel = getAppManagerChannel(options)
            .path(options.servicename + 'mobileservice');

          channel.GET(function (error, body) {
            progress.end();
            if (error) {
              return callback(error);
            }

            if (log.format().json) {
              log.json(body);
            }
            else {
              log.silly(JSON.stringify(body, null, 2));
              var flat = mobile.getFlatApplicationDescription(body);
              var logger = flat.State == 'Healthy' ? log.info : log.error;
              log.silly(JSON.stringify(flat, null, 2));
              logger(util.format($('Overall application state: %s'), flat.State));
              flat.Resources.forEach(function (resource) {
                logger(resource.TypeView + (resource.NameView ? ' (' + resource.NameView + ')' : '') + ' state: ' + resource.State);
                if (resource.Error) {
                  logger(resource.Error);
                }
              });
            }

            callback(body.State === 'Healthy' ? null : new Error($('Creation of a mobile service failed')));
          });
        });
      });
    }
    catch (e) {
      progress.end();
      throw e;
    }
  };

  mobile.command('locations')
        .usage('[options]')
        .description($('List available mobile service locations'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (options, callback) {
          mobile.getRegions(options, function (error, result) {
            if (error) {
              return callback(error);
            }

            if (log.format().json) {
              log.json(result);
            }
            else {
              result.forEach(function (region, index) {
                log.info(region.region + (index === 0 ? ' (default)' : ''));
              });
            }
          });
        });

  mobile.command('create [servicename] [username] [password]')
        .usage('[options] [servicename] [sqlAdminUsername] [sqlAdminPassword]')
        .description($('Create a new mobile service'))
        .option('-r, --sqlServer <sqlServer>', $('use existing SQL server'))
        .option('-d, --sqlDb <sqlDb>', $('use existing SQL database'))
        .option('-l, --location <location>', $('create the service in a particular location; run azure mobile locations to get available locations'))
        .option('--sqlLocation <location>', $('create the SQL server in a particular location; defaults to mobile service location'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (servicename, username, password, options, _) {
          if (options.sqlDb && !options.sqlServer) {
            throw new Error($('To use an existing SQL database, you must specify the name of an existing SQL server using the --sqlServer parameter.'));
          }

          if (!options.location) {
            var result = mobile.getRegions(options, _);
            if (!Array.isArray(result) || result.length === 0 || !result[0].region) {
              throw new Error($('Unable to determine the default mobile service location.'));
            }
            options.location = result[0].region;
          }

          options.sqlLocation = options.sqlLocation || options.location;
          options.servicename = cli.interaction.promptIfNotGiven('Mobile service name: ', servicename, _);

          if (options.servicename.length < 2 || options.servicename.length > 48) {
            throw new Error($('Service name must be between 2 and 48 characters.'));
          } else if(!options.servicename.match(/^[a-zA-Z][0-9a-zA-Z-]*[0-9a-zA-Z]$/)) {
            throw new Error($('Service name must start with a letter, contain only letters, numbers, and hyphens, and end with a letter or number.'));
          }

          options.username = cli.interaction.promptIfNotGiven($('SQL administrator user name: '), username, _);
          if (!isUsernameValid(options.username)) {
            throw new Error($('Invalid username'));
          }

          if(options.sqlServer) {
            options.password = cli.interaction.promptPasswordOnceIfNotGiven($('SQL administrator password: '), password, _);
          } else {
            options.password = cli.interaction.promptPasswordIfNotGiven($('SQL administrator password: '), password, _);
          }
          if (!isPasswordValid(options.username, options.password)) {
            throw new Error($('Invalid password'));
          }

          mobile.createService(options, _);

          function isPasswordValid(username, password) {
            // Eight or more characters in length
            // Does not contain all or part of the username
            // Contains characters from at least 3 of the categories
            // - A-Z
            // - a-z
            // - 0-9
            // - Non-alphanumeric: !$#%

            var matches = 0;
            [ new RegExp('[A-Z]'),
              new RegExp('[a-z]'),
              new RegExp('[0-9]'),
              new RegExp('[\\~\\`\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)\\_\\-\\+\\=\\{\\[\\}\\]\\|\\\\:\\;\\"\\\'\\<\\,\\>\\.\\?\\/]')
            ].forEach(function (regex) {
              if (password.match(regex))
                matches++;
            });

            if (password.length >= 8 && password.indexOf(username) == -1 && matches > 2) {
              return true;
            } else {
              log.warn($('Password must:'));
              log.warn($('- be 8 or more characters long,'));
              log.warn($('- not contain the username,'));
              log.warn($('- contain characters from at least 3 of the categories:'));
              log.warn($('  - uppercase letter [A-Z],'));
              log.warn($('  - lowecase letter [a-z],'));
              log.warn($('  - digit [0-9],'));
              log.warn($('  - special character (e.g. !@#$%^&).'));
              return false;
            }
          }

          function isUsernameValid(username) {
            if (username.length > 0) {
              return true;
            } else {
              log.warn($('User name cannot be empty'));
              return false;
            }
          }

        });

  mobile.command('delete [servicename]')
        .description($('Delete a mobile service'))
        .option('-d, --deleteData', $('delete all data from the database'))
        .option('-a, --deleteAll', $('delete all data, SQL database, and SQL server'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .option('-q, --quiet', $('do not prompt for confirmation'))
        .execute(function (servicename, username, password, options, _) {
          var prompt;
          if (options.deleteAll) {
            prompt = $(' with all data, SQL database, and the SQL server');
            options.deleteSqlDb = options.deleteData = true;
          }
          else if (options.deleteSqlDb) {
            prompt = $(' with all data and the SQL database, but leave SQL server intact');
            options.deleteData = true;
          }
          else if (options.deleteData) {
            prompt = $(' with all data but leave SQL database and SQL server intact');
          }
          else {
            prompt = $(' but leave all data, SQL database, and SQL server intact');
          }

          options.servicename = promptServiceNameIfNotGiven(options, servicename, _);

          var progress = cli.interaction.progress($('Getting mobile service details'));
          var result;
          try {
            result = mobile.getMobileServiceApplication(options, _);
          } finally {
            progress.end();
          }

          var resources = {};
          var flat = mobile.getFlatApplicationDescription(result);
          log.silly(JSON.stringify(flat, null, 2));
          flat.Resources.forEach(function (resource) {
            if (!log.format().json) {
              log.data(resource.TypeView, resource.NameView ? resource.NameView.green : 'N/A'.green);
            }

            resources[resource.Type] = resource;
          });

          if (!options.quiet) {
            var proceed = cli.interaction.confirm(util.format($('Do you want to delete the mobile service %s ? [y/n]: '), prompt), _);
            if (!proceed) {
              log.info($('Deletion cancelled with no changes made.'));
              return;
            }
          }

          // We delete the mobile service from ZRP first
          progress = cli.interaction.progress($('Deleting mobile service'));
          try {
            mobile.deleteService(options, _);
          } catch(e) {
            progress.end();
            log.error($('Failed to delete the mobile service.'));
            if(options.deleteAll) {
              log.error($('The deletion of the SQL server was cancelled.'));
            }
            throw(e);
          }

          // Only on successful deletion from ZRP do we continue
          progress.end();
          log.info($('Deleted mobile service.'));

          // delete SQL server
          if (options.deleteAll) {
            progress = cli.interaction.progress($('Deleting SQL server'));
            try {
              mobile.deleteSqlServer(options, resources['Microsoft.WindowsAzure.SQLAzure.Server'], _);
            } catch(e) {
              // Continue on with the application delete
              progress.end();
              log.error($('Failed to delete SQL server'));
              log.error(e);
            }
            progress.end();
            log.info($('Deleted SQL server'));
          }

          // delete application
          progress = cli.interaction.progress($('Deleting mobile application'));
          try {
            mobile.deleteMobileServiceApplication(options, _);
          } catch(e) {
            progress.end();
            log.error($('Failed to delete mobile application.'));
            throw(e);
          }

          progress.end();
          log.info($('Deleted mobile application.'));
        });

  var scaleMaxInstanceCounts = {
    'free': 1,
    'standard': 6,
    'premium': 10
  };

  function displayScaleSettings(scalesettings) {
    log.data('tier', scalesettings.tier.green);
    log.data('numberOfInstances', scalesettings.numberOfInstances.toString().green);
  }

  mobile.command('list')
        .usage('[options]')
        .description($('List your mobile services'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (options, _) {
          var progress = cli.interaction.progress($('Getting list of mobile services'));
          var result;
          try {
            result = mobile.listServices(options, _);
          } finally {
            progress.end();
          }

          cli.interaction.formatOutput(result, function (services) {
            if (services && services.length > 0) {
              log.table(services, function (row, s) {
                row.cell($('Name'), s.name);
                row.cell($('State'), s.state);
                row.cell($('URL'), s.applicationUrl);
              });
            } else {
              log.info($('No mobile services created yet. You can create new mobile services using the \'azure mobile create\' command.'));
            }
          });
        });

  mobile.command('show [servicename]')
        .usage('[servicename] [options]')
        .description($('Show details for a mobile service'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (servicename, options, _) {
          options.servicename = promptServiceNameIfNotGiven(options, servicename, _);

          ensuredServiceName(_);

          function ensuredServiceName(callback) {
            var results = {};
            var resultCount = 0;

            var progress = cli.interaction.progress($('Getting information'));

            function tryFinish() {
              if (++resultCount < 3) {
                return;
              }

              progress.end();

              log.silly($('Results:'));
              log.silly(JSON.stringify(results, null, 2));

              if (log.format().json) {
                log.json(results);
              } else {
                if (results.application) {
                  log.info($('Mobile application').blue);
                  var flat = mobile.getFlatApplicationDescription(results.application);
                  log.silly(JSON.stringify(flat, null, 2));
                  log.data($('status'), flat.State == 'Healthy' ? $('Healthy').green : flat.State.red);
                  flat.Resources.forEach(function (resource) {
                    log.data(resource.TypeView + ' name', resource.NameView ? resource.NameView.green : 'N/A'.green);
                    if (resource.Error) {
                      log.data(resource.TypeView + ' status', resource.State.red);
                      log.data(resource.TypeView + ' error', resource.Error.red);
                    }
                    else {
                      log.data(resource.TypeView + ' status', resource.State.green);
                    }
                  });
                }

                if (results.service) {
                  log.info('Mobile service'.blue);
                  ['name', 'state', 'applicationUrl', 'applicationKey', 'masterKey', 'scalesettings', 'region']
                    .forEach(function (item) {
                      if (results.service[item]) {
                        log.data(item, results.service[item].toString().green);
                      }
                    });

                  if (results.service.tables.length > 0)
                  {
                    var tables = '';
                    results.service.tables.forEach(function (table) { tables += (tables.length > 0 ? ',' : '') + table.name ; });
                    log.data('tables', tables.green);
                  } else {
                    log.info($('No tables are created. Use azure mobile table command to create tables.'));
                  }
                }

                if (results.scalesettings) {
                  log.info('Scale'.blue);
                  displayScaleSettings(results.scalesettings);
                }
              }

              if (!results.service && !results.application) {
                return callback('Cannot obtain informaton about the service ' + options.servicename +
                  '. Use azure mobile list to check if it exists.');
              } else {
                return callback();
              }
            }

            function createCallback(name) {
              return function (error, result) {
                log.silly(name, error);
                if (!error) {
                  results[name] = result;
                }

                if (name === 'service') {
                  if (result) {
                    mobile.getScaleSettings(options, createCallback('scalesettings'));
                  } else {
                    resultCount++;
                  }
                }

                tryFinish();
              };
            }

            try {
              mobile.getService(options, createCallback('service'));
              mobile.getMobileServiceApplication(options, createCallback('application'));
            } catch (e) {
              progress.end();
              callback(e);
            }
          }
        });

  mobile.command('restart [servicename]')
        .description($('Restart a mobile service'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (servicename, options, _) {
          options.servicename = promptServiceNameIfNotGiven(options, servicename, _);

          var progress = cli.interaction.progress(util.format($('Restarting mobile service: \'%s\''), options.servicename));
          var result;
          try {
            result = mobile.restartService(options, _);
          } finally {
            progress.end();
          }

          if (log.format().json) {
            log.json({});
          } else {
            log.info($('Service was restarted.'));
          }
        });

  var mobileKey = mobile.category('key')
        .description($('Commands to manage your Mobile Service keys'));

  var keyTypes = ['application', 'master'];

  function promptKeyFields(options, servicename, type, _) {
    options.servicename = promptServiceNameIfNotGiven(options, servicename, _);
    options.type = cli.interaction.chooseIfNotGiven($('Key type: '), $('Retrieving choices'), type,
      function(cb) {
        cb(null, keyTypes);
      }, _);

    if (!__.contains(keyTypes, options.type)) {
      throw new Error($('The key type must be \'application\' or \'master\'.'));
    }
  }

  mobileKey.command('regenerate [servicename] [type]')
        .description($('Regenerate the mobile service key'))
        .option('-s, --subscription <id>', $('use the subscription id'))
        .execute(function (servicename, type, options, _) {
          promptKeyFields(options, servicename, type, _);

          var result,
              progress = cli.interaction.progress($('Regenerating key'));

          try {
            result = mobile.regenerateKey(options, _);
          } finally {
            progress.end();
          }

          cli.interaction.formatOutput(result, function(keyData) {
            log.info(util.format($('New %s key is %s'), options.type, keyData[options.type + 'Key']));
          });
        });

  mobileKey.command('set [servicename] [type] [value]')
        .description($('Set the mobile service key to a specific value'))
        .option('-s, --subscription <id>', $('use the subscription id'))
        .execute(function (servicename, type, value, options, _) {
          promptKeyFields(options, servicename, type, _);
          options.value = cli.interaction.promptIfNotGiven($('Key value: '), value, _);

          var result,
              progress = cli.interaction.progress($('Setting key'));

          try {
            result = mobile.setKey(options, { Type: options.type, Value: options.value }, _);
          } finally {
            progress.end();
          }

          cli.interaction.formatOutput(result, function(keyData) {
            log.info(util.format($('New %s key is %s'), options.type, keyData[options.type + 'Key']));
          });
        });

  mobile.command('log [servicename]')
        .usage('[options] [servicename]')
        .description($('Get mobile service logs'))
        .option('-r, --query <query>', $('log query; takes precedence over --type, --source, --continuationToken, and --top'))
        .option('-t, --type <type>', $('filter entry by type'))
        .option('--source <source>', $('filter entry by source'))
        .option('-c, --continuationToken <token>', $('show logs starting from the specified continuation token'))
        .option('-p, --top <top>', $('return the first <top> number of remaining rows'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (servicename, options, _) {
          options.servicename = promptServiceNameIfNotGiven(options, servicename, _);

          var result,
              progress = cli.interaction.progress($('Retrieving logs'));
          
          try {
            result = mobile.getLogs(options, _);
          } finally {
            progress.end();
          }

          cli.interaction.formatOutput(result, function(logs) {
            if (logs && logs.results && logs.results.length > 0) {
              logs.results.forEach(function (entry) {
                log.data('', '');

                for (var i in entry) {
                  log.data(i, entry[i]);
                }
              });

              log.data('', '');
              if (logs.continuationToken) {
                log.data($('Continuation token to receive the next result set:'), logs.continuationToken.green);
              }
            } else {
              log.info($('There are no matching log entries.'));
            }
          });
        });

  mobile.command('recover [unhealthyservicename] [healthyservicename]')
        .usage('[options] [unhealthyservicename] [healthyservicename]')
        .description($('Recovers an unhealthy mobile service using the capacity reserved by a healthy mobile service in a different region.'))
        .option('-q, --quiet', $('do not prompt for confirmation of recovery'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (unhealthyservice, healthyservice, options, callback) {
          if (unhealthyservice) {
            ensuredUnhealthyServiceName(unhealthyservice);
          } else {
            promptString($('Name of the unhealthy mobile service to recover: '), ensuredUnhealthyServiceName);
          }

          function ensuredUnhealthyServiceName(unhealthyservice) {
            options.servicename = unhealthyservice;

            if (healthyservice) {
              ensuredHealthyServiceName(healthyservice);
            } else {
              promptString($('Name of the healthy mobile service to use for capacity: '), ensuredHealthyServiceName);
            }

            function ensuredHealthyServiceName(healthyservice) {
              options.targetservicename = healthyservice;

              if(options.quiet) {
                doProceed(true);
              } else {
                cli.confirm(util.format($('Warning: this action will use the capacity from the mobile service \'%s\' and delete it. Do you want to recover the mobile service \'%s\'? [y/n]: '), healthyservice), doProceed);
              }

              function doProceed(decision) {
                if (!decision) {
                  log.info($('Recovery terminated with no changes made'));
                  callback();
                } else {
                  var progress = cli.interaction.progress($('Performing recovery'));
                  mobile.recover(options, function(error) {
                    if (error) {
                      progress.end();
                      callback(error);
                    } else {
                      progress = cli.interaction.progress($('Cleaning up'));
                      options.servicename = healthyservice;
                      mobile.deleteMobileServiceApplication(options, function(error) {
                        progress.end();
                        if (error) {
                          callback(error);
                        }
                        else {
                          log.info($('Recovery complete'));
                          callback();
                        }
                      });
                    }
                  });
                }
              }
            }
          }
        });

  var mobileConfig = mobile.category('config')
        .description($('Commands to manage your Mobile Service configuration'));

  mobileConfig.command('list [servicename]')
        .usage('[options] [servicename]')
        .description($('Show your mobile service configuration settings'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (servicename, options, _) {
          options.servicename = promptServiceNameIfNotGiven(options, servicename, _);

          // Load up all the settings that comprise the configuration
          var progress = cli.interaction.progress($('Getting mobile service configuration'));
          var results = {};
          try {
            results.service = mobile.getServiceSettings(options, _);
            results.live = mobile.getLiveSettings(options, _);
            results.auth = mobile.getAuthSettings(options, _);
            results.apns = mobile.getApnsSettings(options, _);
            results.gcm = mobile.getGcmSettings(options, _);
          } finally {
            progress.end();
          }

          // Display the configuration
          cli.interaction.formatOutput(results, displayConfiguration);

          function displayConfiguration (results) {
            var settings = {};
            [ 'dynamicSchemaEnabled',
              'microsoftAccountClientSecret',
              'microsoftAccountClientId',
              'microsoftAccountPackageSID',
              'facebookClientId',
              'facebookClientSecret',
              'twitterClientId',
              'twitterClientSecret',
              'googleClientId',
              'googleClientSecret',
              'apns',
              'crossDomainWhitelist',
              'gcm'
            ].forEach(function (name) {
              settings[name] = $('Unable to obtain the value of this setting');
            });

            if (results.service) {
              if (typeof results.service.dynamicSchemaEnabled == 'boolean') {
                settings.dynamicSchemaEnabled = results.service.dynamicSchemaEnabled.toString();
              } else {
                settings.dynamicSchemaEnabled = $('Not configured');
              }

              settings.crossDomainWhitelist = formatCrossDomainWhitelistForDisplay(results.service.crossDomainWhitelist);
            }

            if (results.live) {
              settings.microsoftAccountClientSecret = results.live.clientSecret || $('Not configured');
              settings.microsoftAccountClientId = results.live.clientID || $('Not configured');
              settings.microsoftAccountPackageSID = results.live.packageSID || $('Not configured');
            }

            if (results.apns) {
              settings.apns = results.apns.mode || $('Not configured');
            }

            if(results.gcm) {
              settings.gcm = results.gcm.apiKey || $('Not configured');
            }

            if (Array.isArray(results.auth)) {
              ['twitter', 'facebook', 'google'].forEach(function (provider) {
                settings[provider + 'ClientId'] = $('Not configured');
                settings[provider + 'ClientSecret'] = $('Not configured');
              });

              results.auth.forEach(function (creds) {
                settings[creds.provider + 'ClientId'] = creds.appId;
                settings[creds.provider + 'ClientSecret'] = creds.secret;
              });
            }

            log.table(settings, function (row, item) {
              row.cell('Setting', item);
              if(settings[item] === $('Not configured')) {
                row.cell('Value', settings[item].blue);
              } else if (settings[item] === $('Unable to obtain the value of this setting')) {
                row.cell('Value', settings[item].red);
              } else {
                row.cell('Value', settings[item].green);
              }
            });
          }
        });

  function createSetConfigHandler(coreGetHandler, coreSetHandler, picker1, picker2) {
    return function (options, newValue, callback) {
      coreGetHandler(options, function (error, result) {
        if (error) {
          return callback(error);
        }

        // Picker2 is set only for authentication provider settings
        if (picker2) {
          if (picker1 === 'microsoft') {
            if(Object.keys(result).length === 0) {
              // We have no LiveSettings, so set the required fields
              // {clientID, clientSecret*, packageSID} (*required)         
              result = { clientSecret: '' };
            } else if(!result['clientSecret']) {
              result['clientSecret'] = '';
            }
            result[picker2] = newValue;
            
          } else if (Array.isArray(result)) {
            // Look to see if we have any existing authentication provider settings
            var found;
            for (var i = 0; i < result.length; i++) {
              if (result[i].provider == picker1) {
                result[i][picker2] = newValue;
                found = true;
                break;
              }
            }

            // If not, we need to set the required fields
            if (!found) {
              var newProvider = { provider: picker1, appId: '', secret: '' };
              newProvider[picker2] = newValue;
              result.push(newProvider);
            }
          }
        } else {
          result[picker1] = newValue;
        }

        coreSetHandler(options, result, callback);
      });
    };
  }

  var setConfigHandlers = {
    'dynamicSchemaEnabled': createSetConfigHandler(mobile.getServiceSettings, mobile.setServiceSettings, 'dynamicSchemaEnabled'),
    'crossDomainWhitelist': createSetConfigHandler(mobile.getServiceSettings, mobile.setServiceSettings, 'crossDomainWhitelist'),
    'microsoftAccountClientSecret': createSetConfigHandler(mobile.getLiveSettings, mobile.setLiveSettings, 'microsoft', 'clientSecret'),
    'microsoftAccountClientId': createSetConfigHandler(mobile.getLiveSettings, mobile.setLiveSettings, 'microsoft', 'clientID'),
    'microsoftAccountPackageSID': createSetConfigHandler(mobile.getLiveSettings, mobile.setLiveSettings, 'microsoft', 'packageSID'),
    'facebookClientId': createSetConfigHandler(mobile.getAuthSettings, mobile.setAuthSettings, 'facebook', 'appId'),
    'facebookClientSecret': createSetConfigHandler(mobile.getAuthSettings, mobile.setAuthSettings, 'facebook', 'secret'),
    'twitterClientId': createSetConfigHandler(mobile.getAuthSettings, mobile.setAuthSettings, 'twitter', 'appId'),
    'twitterClientSecret': createSetConfigHandler(mobile.getAuthSettings, mobile.setAuthSettings, 'twitter', 'secret'),
    'googleClientId': createSetConfigHandler(mobile.getAuthSettings, mobile.setAuthSettings, 'google', 'appId'),
    'googleClientSecret': createSetConfigHandler(mobile.getAuthSettings, mobile.setAuthSettings, 'google', 'secret'),
    'apns': parseAndSetApnsSettings,
    'gcm': createSetConfigHandler(mobile.getGcmSettings, mobile.setGcmSettings, 'apiKey')
  };

  function parseAndSetApnsSettings(options, value, callback) {
    var match = value.match(/^(dev|prod):((?::{2}|[^:])*):(.+)/);
    if (!match) {
      return callback(new Error($('The value of the apns setting must be in the format (dev|prod):<password>:<pkcs12CertificateFile>, ' +
        'e.g. dev:abc!123:./mycertificate.pfx. If the password contains : (colon) characters, they must be escaped as :: (double colon).')));
    }

    var settings = {
      mode: match[1],
      password: match[2].replace(/::/g, ':')
    };

    if (settings.password.match(/:/)) {
      log.warn(util.format($('Password was unescaped to %s'), settings.password));
    }

    settings.data = fs.readFileSync(match[3], 'base64');

    mobile.setApnsSettings(options, JSON.stringify(settings), callback);
  }

  mobileConfig.command('set <servicename> <key> [value]')
        .usage('[options] <servicename> <key> [value]')
        .description($('Set a mobile service configuration setting'))
        .option('-f, --file <file>', $('read the value of the setting from a file'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (servicename, key, value, options, callback) {
          if (!setConfigHandlers[key]) {
            log.info('Supported keys:');
            for (var i in getConfigHandlers) {
              log.info(i.blue);
            }
            return callback('Unsupported key ' + key.red);
          } else if (!value && !options.file) {
            return callback(new Error($('Either value parameter must be provided or --file option specified')));
          } else {
            if (!value && options.file) {
              value = fs.readFileSync(options.file, 'utf8');
              log.info('Value was read from ' + options.file);
            }

            if (key === 'dynamicSchemaEnabled') {
              if (value === 'true') {
                value = true;
              } else if (value === 'false') {
                value = false;
              } else {
                return callback(new Error($('The value must be either true or false')));
              }
            } else if (key === 'crossDomainWhitelist') {
              value = formatCrossDomainWhitelistForSaving(value);
            }

            options.servicename = servicename;
            setConfigHandlers[key](options, value, callback);
          }
        });

  function createGetConfigHandler(coreHandler, picker1, picker2) {
    return function (options, callback) {
      coreHandler(options, function (error, result) {
        if (error) {
          return callback(error);
        }

        if (picker2) {
          if (Array.isArray(result)) {
            for (var i = 0; i < result.length; i++) {
              if (result[i].provider == picker1) {
                return callback(null, result[i][picker2]);
              }
            }
          }

          callback(null, null);
        } else {
          callback(null, result[picker1]);
        }
      });
    };
  }

  var getConfigHandlers = {
    'dynamicSchemaEnabled': createGetConfigHandler(mobile.getServiceSettings, 'dynamicSchemaEnabled'),
    'crossDomainWhitelist': createGetConfigHandler(mobile.getServiceSettings, 'crossDomainWhitelist'),
    'microsoftAccountClientSecret': createGetConfigHandler(mobile.getLiveSettings, 'clientSecret'),
    'microsoftAccountClientId': createGetConfigHandler(mobile.getLiveSettings, 'clientID'),
    'microsoftAccountPackageSID': createGetConfigHandler(mobile.getLiveSettings, 'packageSID'),
    'facebookClientId': createGetConfigHandler(mobile.getAuthSettings, 'facebook', 'appId'),
    'facebookClientSecret': createGetConfigHandler(mobile.getAuthSettings, 'facebook', 'secret'),
    'twitterClientId': createGetConfigHandler(mobile.getAuthSettings, 'twitter', 'appId'),
    'twitterClientSecret': createGetConfigHandler(mobile.getAuthSettings, 'twitter', 'secret'),
    'googleClientId': createGetConfigHandler(mobile.getAuthSettings, 'google', 'appId'),
    'googleClientSecret': createGetConfigHandler(mobile.getAuthSettings, 'google', 'secret'),
    'apns': createGetConfigHandler(mobile.getApnsSettings, 'mode'),
    'gcm': createGetConfigHandler(mobile.getGcmSettings, 'apiKey')
  };

  mobileConfig.command('get [servicename] [key]')
        .usage('[options] [servicename] [key]')
        .description($('Get a mobile service configuration setting'))
        .option('-f, --file <file>', $('save the value of the setting to a file'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (servicename, key, options, _) {
          options.servicename = promptServiceNameIfNotGiven(options, servicename, _);
          key = cli.interaction.chooseIfNotGiven($('Setting key: '), $('Getting choices'), key,
            function(cb) {
              cb(null, __.keys(getConfigHandlers));
            }, _);

          if (!getConfigHandlers[key]) {
            log.info($('Supported keys:'));
            for (var i in getConfigHandlers) {
              log.info(i.blue);
            }

            throw new Error(util.format($('Unsupported key %s'), key.red));
          }

          var result;
          var progress = cli.interaction.progress(util.format($('Retrieving setting: %s'), key));
          try {
            result = getConfigHandlers[key](options, _);
          } finally {
            progress.end();
          }

          var value = {};
          value[key] = result;

          cli.interaction.formatOutput(value, function (output) {
            if (output[key]) {
              if(key === 'crossDomainWhitelist') {
                output[key] = formatCrossDomainWhitelistForDisplay(output[key]);
              }

              if (typeof options.file === 'string') {
                fs.writeFileSync(options.file, output[key], 'utf8');
                log.info(util.format($('Written value to %s'), options.file));
              } else {
                log.data(key, output[key].toString().green);
              }
            } else {
              log.warn($('Setting is not configured').blue);
            }
          });
        });

  var mobileTable = mobile.category('table')
        .description($('Commands to manage your Mobile Service tables'));

  mobileTable.command('list [servicename]')
        .usage('[options] [servicename]')
        .description($('List mobile service tables'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (servicename, options, callback) {

          if (servicename) {
            ensuredServiceName(servicename);
          } else {
            promptString($('Mobile service name: '), ensuredServiceName);
          }

          function ensuredServiceName(servicename) {
            options.servicename = servicename;

            mobile.listTables(options, function (error, tables) {
              if (error) {
                return callback(error);
              }

              if (log.format().json) {
                log.json(tables);
              } else if (tables && tables.length > 0) {
                log.table(tables, function (row, s) {
                  row.cell($('Name'), s.name);
                  row.cell($('Indexes'), s.metrics.indexCount);
                  row.cell($('Rows'), s.metrics.recordCount);
                });
              } else {
                log.info($('No tables created yet. You can create a mobile service table using azure mobile table create command'));
              }

              callback();
            });
          }
        });

  mobileTable.command('show [servicename] [tablename]')
        .usage('[options] [servicename] [tablename]')
        .description($('Show details for a mobile service table'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (servicename, tablename, options, callback) {

          if (servicename) {
            ensuredServiceName(servicename);
          } else {
            promptString($('Mobile service name: '), ensuredServiceName);
          }

          function ensuredServiceName(servicename) {
            options.servicename = servicename;

            if (tablename) {
              ensuredTableName(tablename);
            } else {
              promptString($('Table name: '), ensuredTableName);
            }

            function ensuredTableName(tablename) {
              options.tablename = tablename;

              // unlike async.parallel, we want all operations to execute regardless if some have errors

              var progress = cli.interaction.progress($('Getting table information'));
              var results = {};
              var operationCount = 0;
              function tryFinish() {
                if (++operationCount < 4) {
                  return;
                }

                progress.end();

                if (log.format().json) {
                  log.json(results);
                } else if (!results.table) {
                  return callback(new Error(util.format($('Table %s or mobile service %s does not exist'), tablename, servicename)));
                } else {
                  log.info($('Table statistics:').green);
                  log.data($('Number of records'), results.table.metrics.recordCount.toString().green);
                  log.info($('Table operations:').green);
                  log.table(['insert', 'read', 'update', 'delete'], function (row, s) {
                    row.cell($('Operation'), s);

                    var script;
                    if (results.scripts) {
                      for (var i = 0; i < results.scripts.length; i++) {
                        if (results.scripts[i].operation === s) {
                          script = results.scripts[i];
                          break;
                        }
                      }

                      row.cell('Script', script ? script.sizeBytes.toString() + ' bytes' : 'Not defined');
                    } else {
                      row.cell('Script', 'N/A');
                    }

                    if (results.permissions) {
                      row.cell('Permissions', results.permissions[s] || 'default');
                    } else {
                      row.cell('Permissions', 'N/A');
                    }

                  });

                  if (results.columns) {
                    log.info($('Table columns:').green);
                    log.table(results.columns, function (row, s) {
                      row.cell($('Name'), s.name);
                      row.cell($('Type'), s.type);
                      row.cell($('Indexed'), s.indexed ? 'Yes' : '');
                    });
                  } else {
                    log.error($('Unable to obtain table columns'));
                  }
                }

                callback();
              }

              function createCallback(name) {
                return function (error, result) {
                  log.silly(name, error);
                  if (!error) {
                    results[name] = result;
                  }

                  tryFinish();
                };
              }

              try {
                mobile.getTable(options, createCallback('table'));
                mobile.getPermissions(options, createCallback('permissions'));
                mobile.getColumns(options, createCallback('columns'));
                mobile.getScripts(options, createCallback('scripts'));
              } catch (e) {
                progress.end();
                callback(e);
              }
            }
          }
        });

  var roles = ['user', 'public', 'application', 'admin'];
  var operations = ['insert', 'read', 'update', 'delete'];
  var methods = ['get', 'put', 'post', 'patch', 'delete'];
  function parsePermissions(permissions, keys) {
    var result = {};
    if (typeof permissions == 'string') {
      permissions = permissions.toLowerCase();
      permissions.split(',').forEach(function (pair) {
        var match = pair.match(/^([^\=]+)\=(.+)$/);
        if (!match) {
          throw new Error(util.format($('Syntax error in parsing the permission pair "%s"'), pair));
        }

        if (match[1] !== '*' && !keys.some(function (key) { return key === match[1]; })) {
          throw new Error(util.format($('Unsupported operation name \'%s\'. Operation must be one of *, %s'), match[1], keys.join(', ')));
        }

        if (!roles.some(function (role) { return role === match[2]; })) {
          throw new Error(util.format($('Unsupported permission value \'%s\'. Permission must be one of %s'),  match[2].red, roles.join(', ')));
        }

        if (match[1] === '*') {
          keys.forEach(function (key) {
            result[key] = match[2];
          });
        } else {
          result[match[1]] = match[2];
        }
      });
    }

    return result;
  }

  mobileTable.command('create [servicename] [tablename]')
        .usage('[options] [servicename] [tablename]')
        .description($('Create a new mobile service table'))
        .option('-p, --permissions <permissions>', $('comma delimited list of <operation>=<permission> pairs'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (servicename, tablename, options, callback) {
          var settings;
          try {
            settings = parsePermissions(options.permissions, operations);
          }
          catch (e) {
            log.error($('Permissions must be specified as a comma delimited list of <operation>=<permission> pairs.'));
            log.error(util.format($('<operation> must be one of %s'), operations.join(', ')));
            log.error(util.format($('<permission> must be one of %s'), roles.join(', ')));

            return callback(e);
          }

          // default table permissions to 'application'
          operations.forEach(function (operation) {
            if (!settings[operation]) {
              settings[operation] = 'application';
            }
          });

          if (servicename) {
            ensuredServiceName(servicename);
          } else {
            promptString(util.format($('Mobile service name: %s'), ensuredServiceName));
          }

          function ensuredServiceName(servicename) {
            options.servicename = servicename;

            if (tablename) {
              ensuredTableName(tablename);
            } else {
              promptString($('Table name: '), ensuredTableName);
            }

            function ensuredTableName(tablename) {
              options.tablename = tablename;
              settings.name = tablename;
              var progress = cli.interaction.progress($('Creating table'));
              try {
                mobile.createTable(options, JSON.stringify(settings), function (error) {
                  progress.end();
                  callback(error);
                });
              } catch (e) {
                progress.end();
                throw e;
              }
            }
          }
        });

  mobileTable.command('update [servicename] [tablename]')
        .usage('[options] [servicename] [tablename]')
        .description($('Update mobile service table properties'))
        .option('-p, --permissions <permissions>', $('comma delimited list of <operation>=<permission> pairs'))
        .option('--deleteColumn <columns>', $('comma separated list of columns to delete'))
        .option('-q, --quiet', $('do not prompt for confirmation of column deletion'))
        .option('--addIndex <columns>', $('comma separated list of columns to create an index on'))
        .option('--deleteIndex <columns>', $('comma separated list of columns to delete an index from'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (servicename, tablename, options, callback) {
          if (!options.deleteIndex && !options.addIndex && !options.permissions && !options.deleteColumn) {
            return callback(new Error($('No updates specified. Check the list of available updates with --help and specify at least one.')));
          }

          try {
            options.permissions = parsePermissions(options.permissions, operations);
          } catch (e) {
            log.error($('Permissions must be specified as a comma delimited list of <operation>=<permission> pairs.'));
            log.error(util.format($('<operation> must be one of %s'), operations.join(', ')));
            log.error(util.format($('<permission> must be one of %s'), roles.join(', ')));
            return callback(e);
          }

          if (servicename) {
            ensuredServiceName(servicename);
          } else {
            promptString($('Mobile service name: '), ensuredServiceName);
          }

          function ensuredServiceName(servicename) {
            options.servicename = servicename;

            if (tablename) {
              ensuredTableName(tablename);
            } else {
              promptString($('Table name: '), ensuredTableName);
            }

            function ensuredTableName(tablename) {
              options.tablename = tablename;
              if (typeof options.deleteColumn !== 'string' || options.quiet) {
                doProceed(true);
              } else {
                cli.confirm($('Do you really want to delete the column(s)? [y/n]: '), doProceed);
              }

              function doProceed(decision) {
                if (!decision) {
                  log.info($('Update terminated with no changes made'));
                  callback();
                } else {
                  var plan = [];

                  // add permission update to plan

                  if (Object.getOwnPropertyNames(options.permissions).length > 0) {
                    plan.push({
                      progress: $('Updating permissions'),
                      success: $('Updated permissions'),
                      failure: $('Failed to update permissions'),
                      handler: function (callback) {
                        mobile.updatePermissions(options, options.permissions, callback);
                      }
                    });
                  }

                  // add index deletion to plan

                  if (options.deleteIndex) {
                    options.deleteIndex.split(',').forEach(function (column) {
                      plan.push({
                        progress: util.format($('Deleting index from column %s'), column),
                        success: util.format($('Deleted index from column %s'), column),
                        failure: util.format($('Failed to delete index from column %s'), column),
                        handler: function (callback) {
                          mobile.deleteIndex(options, column, callback);
                        }
                      });
                    });
                  }

                  // add index addition to plan

                  if (options.addIndex) {
                    options.addIndex.split(',').forEach(function (column) {
                      plan.push({
                        progress: util.format($('Adding index to column %s'), column),
                        success: util.format($('Added index to column %s'), column),
                        failure: util.format($('Failed to add index to column %s'), column),
                        handler: function (callback) {
                          mobile.createIndex(options, column, callback);
                        }
                      });
                    });
                  }

                  // add column deletion to plan

                  if (options.deleteColumn) {
                    options.deleteColumn.split(',').forEach(function (column) {
                      plan.push({
                        progress: util.format($('Deleting column %s'), column),
                        success: util.format($('Deleted column %s'), column),
                        failure: util.format($('Failed to delete column %s'), column),
                        handler: function (callback) {
                          mobile.deleteColumn(options, column, callback);
                        }
                      });
                    });
                  }

                  // execute plan

                  var failures = 0;
                  var doStep = function (stepIndex) {
                    if (stepIndex == plan.length) {
                      return callback(failures > 0 ? $('Not all update operations completed successfuly') : null);
                    }

                    var step = plan[stepIndex];
                    var progress = cli.interaction.progress(step.progress);
                    try {
                      step.handler(function (error) {
                        progress.end();
                        if (error) {
                          log.error(step.failure);
                          failures++;
                        } else {
                          log.info(step.success);
                        }

                        doStep(stepIndex + 1);
                      });
                    } catch (e) {
                      progress.end();
                      failures++;
                      doStep(stepIndex + 1);
                    }
                  };

                  doStep(0);
                }
              }
            }
          }
        });

  mobileTable.command('delete [servicename] [tablename]')
        .usage('[options] [servicename] [tablename]')
        .description($('Delete a mobile service table'))
        .option('-q, --quiet', $('do not prompt for confirmation'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (servicename, tablename, options, callback) {

          if (servicename) {
            ensuredServiceName(servicename);
          } else {
            promptString($('Mobile service name: '), ensuredServiceName);
          }

          function ensuredServiceName(servicename) {
            options.servicename = servicename;

            if (tablename) {
              ensuredTableName(tablename);
            } else {
              promptString($('Table name: '), ensuredTableName);
            }

            function ensuredTableName(tablename) {
              options.tablename = tablename;

              if (options.quiet) {
                doDelete(true);
              } else {
                cli.confirm($('Do you really want to delete the table? [y/n]: '), doDelete);
              }

              function doDelete(decision) {
                if (decision) {
                  var progress = cli.interaction.progress($('Deleting table'));
                  try {
                    mobile.deleteTable(options, function (error) {
                      progress.end();
                      callback(error);
                    });
                  }
                  catch (e) {
                    progress.end();
                    throw e;
                  }
                }
                else {
                  log.info($('Table was not deleted'));
                  callback();
                }
              }
            }
          }
        });

  var mobileData = mobile.category('data')
        .description($('Commands to manage your Mobile Service tables data'));

  mobileData.command('read [servicename] [tablename] [query]')
        .usage('[options] [servicename] [tablename] [query]')
        .description($('Query data from a mobile service table'))
        .option('-k, --skip <top>', $('skip the first <skip> number of rows'))
        .option('-t, --top <top>', $('return the first <top> number of remaining rows'))
        .option('-l, --list', $('display results in list format'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (servicename, tablename, query, options, callback) {

          if (servicename) {
            ensuredServiceName(servicename);
          } else {
            promptString($('Mobile service name: '), ensuredServiceName);
          }

          function ensuredServiceName(servicename) {
            options.servicename = servicename;

            if (tablename) {
              ensuredTableName(tablename);
            } else {
              promptString($('Table name: '), ensuredTableName);
            }

            function ensuredTableName(tablename) {
              options.tablename = tablename;
              options.query = query;
              mobile.getData(options, function (error, data) {
                if (error) {
                  return callback(error);
                }

                if (log.format().json) {
                  log.json(data);
                } else if (!Array.isArray(data) || data.length === 0) {
                  log.info($('No matching records found'));
                } else if (options.list) {
                  data.forEach(function (record) {
                    log.data('', '');
                    for (var i in record) {
                      log.data(i, record[i] === null ? '<null>'.green : record[i].toString().green);
                    }
                  });
                  log.data('', '');
                } else {
                  log.table(data, function (row, s) {
                    for (var i in s) {
                      row.cell(i, s[i]);
                    }
                  });
                }

                callback();
              });
            }
          }
        });

  mobileData.command('truncate [servicename] [tablename]')
        .usage('[options] [servicename] [tablename]')
        .description($('Delete all data from a mobile service table'))
        .option('-q, --quiet', $('do not prompt for confirmation'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (servicename, tablename, options, callback) {

          if (servicename) {
            ensuredServiceName(servicename);
          } else {
            promptString($('Mobile service name: '), ensuredServiceName);
          }

          function ensuredServiceName(servicename) {
            options.servicename = servicename;

            if (tablename) {
              ensuredTableName(tablename);
            } else {
              promptString($('Table name: '), ensuredTableName);
            }

            function ensuredTableName(tablename) {
              options.tablename = tablename;

              if (options.quiet) {
                mobile.truncateTable(options, JSON.stringify({confirm: true}), afterDelete);
              } else {
                mobile.truncateTable(options, JSON.stringify({confirm: false}), confirmDeletion);
              }

              function confirmDeletion(error, result) {
                if (error) {
                  return callback(error);
                }

                if (result.rowCount === 0) {
                  log.info($('There is no data in the table.'));
                  return callback();
                }

                log.info(util.format($('There are %s data rows in the table'), result.rowCount));
                cli.confirm($('Do you really want to delete all data from the table? [y/n]: '), function (decision) {
                  if (decision) {
                    mobile.truncateTable(options, JSON.stringify({confirm: true}), afterDelete);
                  } else {
                    log.info($('No data was deleted.'));
                    callback();
                  }
                });
              }

              function afterDelete(error, result) {
                if (error) {
                  return callback(error);
                }

                if (log.format().json) {
                  log.json(result);
                } else {
                  log.info(util.format($('Deleted %s rows'), result.rowCount));
                }

                callback();
              }
            }
          }
        });

  function displayScheduledJob(row, s) {
    row.cell($('Job name'), s.name);
    row.cell($('Script name'), 'scheduler/' + s.name);
    row.cell($('Status'), s.status);
    row.cell($('Interval'), s.intervalUnit ? (s.intervalPeriod + ' [' + s.intervalUnit + ']') : 'on demand');
    row.cell($('Last run'), s.lastRun || 'N/A');
    row.cell($('Next run'), s.nextRun || 'N/A');
  }

  var mobileScript = mobile.category('script')
        .description($('Commands to manage your Mobile Service scripts'));

  mobileScript.command('list [servicename]')
        .description($('List mobile service scripts'))
        .option('-s, --subscription <id>', $('use the subscription id'))
        .execute(function (servicename, options, _) {
          options.servicename = promptServiceNameIfNotGiven(options, servicename, _);

          var progress = cli.interaction.progress($('Retrieving script information'));
          var results = {};
          try {
            results = mobile.loadAllScripts(options, _);
          } finally {
            progress.end();
          }

          cli.interaction.formatOutput(results, function (scripts) {
            if (!scripts.table) {
              log.error($('Unable to get table scripts'));
            } else if (!Array.isArray(scripts.table) || scripts.table.length === 0) {
              log.info($('There are no table scripts. Create scripts using the \'azure mobile script upload\' command.'));
            } else {
              log.info($('Table scripts').green);
              log.table(scripts.table, function (row, s) {
                row.cell($('Name'), 'table/' + s.table + '.' + s.operation);
                row.cell($('Size'), s.sizeBytes);
              });
            }

            if (!scripts.shared) {
              log.error($('Unable to get shared scripts'));
            } else if (!Array.isArray(scripts.shared) || scripts.shared.length === 0) {
              log.info($('There are no shared scripts. Create scripts using the \'azure mobile script upload\' command.'));
            } else {
              log.info($('Shared scripts').green);
              log.table(scripts.shared, function (row, s) {
                row.cell($('Name'), 'shared/' + s.name);
                row.cell($('Size'), s.size);
              });
            }

            if (!scripts.scheduler) {
              log.error($('Unable to get scheduled job scripts'));
            } else if (!Array.isArray(scripts.scheduler) || scripts.scheduler.length === 0) {
              log.info($('There are no scheduled job scripts. Create scheduled jobs using the \'azure mobile job\' command.'));
            } else {
              log.info($('Scheduled job scripts').green);
              log.table(scripts.scheduler, displayScheduledJob);
            }

            if (!scripts.api) {
              log.error($('Unable to get custom API scripts'));
            } else if (!Array.isArray(scripts.api) || scripts.api.length === 0) {
              log.info($('There are no custom API scripts. Create APIs using the \'azure mobile api\' command.'));
            } else {
              log.info($('Custom API scripts').green);
              log.table(scripts.api, displayCustomApi);
              if(scripts.api.some(function (api) { return api.hasAdditionalPermissions === true; })) {
                log.info($('* indicates the permissions metadata file has been manually modified.'));
              }
            }
          });
        });

  function checkScriptName(options) {
    if (!options.script) {
      log.info($('For table scripts, specify table/<tableName>.{insert|read|update|delete}'));
      log.info($('For shared scripts, specify shared/<scriptname>'));
      log.info($('For scheduler scripts, specify scheduler/<scriptName>'));
      log.info($('For custom API scripts, specify api/<scriptName>'));

      throw new Error(util.format($('Invalid script name \'%s\''), options.scriptname));
    }
  }

  function parseScriptName(scriptname) {
    var result = null,
        match = scriptname.match(/^(table|scheduler|shared|api)\/([^\.]+)/);

    if(!match) {
      return result;
    }

    var parts;
    if(match[1] === 'table') {
      parts = scriptname.match(/^table\/([^\.]+)\.(insert|read|update|delete)(?:$|\.js$)/);
      if (parts) {
        result = { type: 'table', table: { name: parts[1], operation: parts[2] } };
      }
    } else {
      parts = match[2].match(/([a-zA-Z0-9_]+)(?:$|\.js$)/);
      if (parts) {
        result = { type: match[1] };
        result[match[1]] = { name: parts[1] };
      }
    }

    return result;
  }

  function saveScriptFile(scriptSpec, script, output, force) {
    var file;
    var dir;

    if (output) {
      file = output;
    } else {
      dir = './' + scriptSpec.type;
      file = dir + '/';
      if (scriptSpec.type === 'table') {
        file += scriptSpec.table.name + '.' + scriptSpec.table.operation + '.js';
      } else {
        file += scriptSpec[scriptSpec.type].name + '.js';
      }
    }

    if (utils.pathExistsSync(file) && !force) {
      throw new Error(util.format($('File %s already exists. Use --override to override.'), file));
    } else {
      try {
        if (!output) {
          if (!utils.pathExistsSync(dir)) {
            fs.mkdirSync(dir);
          }
        }

        fs.writeFileSync(file, script, 'utf8');
        log.info(util.format($('Saved script to %s'), file));
      }
      catch (e) {
        throw new Error(util.format($('Unable to save file \'%s\''), file));
      }
    }

    return null;
  }

  var getScriptHandlers = {
    table: mobile.getTableScript,
    scheduler: mobile.getSchedulerScript,
    shared: mobile.getSharedScript,
    api: mobile.getCustomApiScript
  };

  mobileScript.command('download [servicename] [scriptname]')
        .description($('Downloads a mobile service script'))
        .option('-s, --subscription <id>', $('use the subscription id'))
        .option('-f, --file <file>', $('file to save the script to'))
        .option('-o, --override', $('override existing files'))
        .option('-c, --console', $('write the script to the console instead of a file'))
        .execute(function (servicename, scriptname, options, _) {
          options.servicename = promptServiceNameIfNotGiven(options, servicename, _);
          options.scriptname = promptIfNotGiven($('Script: '), scriptname, _);
          options.script = parseScriptName(options.scriptname);
          checkScriptName(options);

          var progress = cli.interaction.progress(util.format($('Downloading script: \'%s\''), options.scriptname));
          var script;
          try {
            script = getScriptHandlers[options.script.type](options, _);
          } finally {
            progress.end();
          }
  
          script = script.toString();

          if (options.console) {
            console.log(script);
          } else {
            saveScriptFile(options.script, script, options.file, options.override);
          }
        });

  var setScriptHandlers = {
    table: mobile.setTableScript,
    scheduler: mobile.setSchedulerScript,
    shared: mobile.setSharedScript,
    api: mobile.setCustomApiScript
  };

  mobileScript.command('upload [servicename] [scriptname]')
        .description($('Uploads a mobile service script'))
        .option('-s, --subscription <id>', $('use the subscription id'))
        .option('-f, --file <file>', $('file to read the script from'))
        .execute(function (servicename, scriptname, options, _) {
          options.servicename = promptServiceNameIfNotGiven(options, servicename, _);
          options.scriptname = promptIfNotGiven($('Script: '), scriptname, _);
          options.script = parseScriptName(options.scriptname);
          checkScriptName(options);

          if (!options.file) {
            options.file = './' + options.script.type + '/';
            if (options.script.table) {
              options.file += options.script.table.name + '.' + options.script.table.operation + '.js';
            } else {
              options.file += options.script[options.script.type].name + '.js';
            }
          }

          var script;
          try {
            script = fs.readFileSync(options.file, 'utf8');
          }
          catch (e) {
            throw new Error(util.format($('Unable to read script from file %s'), options.file));
          }

          var progress = cli.interaction.progress(util.format($('Uploading script: \'%s\''), options.scriptname));
          try {
            setScriptHandlers[options.script.type](options, script, _);
          } finally {
            progress.end();
          }
        });

  var deleteScriptHandlers = {
    table: mobile.deleteTableScript,
    scheduler: mobile.deleteSchedulerScript,
    shared: mobile.deleteSharedScript,
    api: mobile.deleteCustomApi
  };

  mobileScript.command('delete [servicename] [scriptname]')
        .description($('Deletes a mobile service script'))
        .option('-s, --subscription <id>', $('use the subscription id'))
        .execute(function (servicename, scriptname, options, _) {
          options.servicename = promptServiceNameIfNotGiven(options, servicename, _);
          options.scriptname = promptIfNotGiven($('Script: '), scriptname, _);
          options.script = parseScriptName(options.scriptname);
          checkScriptName(options);

          var progress = cli.interaction.progress(util.format($('Deleting script: \'%s\''), options.scriptname));
          try {
            deleteScriptHandlers[options.script.type](options, _);
          } finally {
            progress.end();
          }
        });

  var mobileScale = mobile.category('scale')
        .description($('Commands to manage your Mobile Service scaling'));

  mobileScale.command('show [servicename]')
        .usage('[options] [servicename]')
        .description($('Show the scalability settings of a mobile service'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (servicename, options, callback) {

          if (servicename) {
            ensuredServiceName(servicename);
          } else {
            promptString($('Mobile service name: '), ensuredServiceName);
          }

          function ensuredServiceName(servicename) {
            options.servicename = servicename;

            var progress = cli.interaction.progress($('Getting mobile service scale settings'));
            mobile.getScaleSettings(options, function (error, scalesettings) {
              progress.end();
              if (error) {
                return callback(error);
              }

              if (log.format().json) {
                log.json(scalesettings);
              }
              else {
                displayScaleSettings(scalesettings);
              }

              callback();
            });
          }
        });


  mobileScale.command('change [servicename]')
        .usage('[options] [servicename]')
        .description($('Change the scalability settings of a mobile service'))
        .option('-t, --tier <tier>', $('choose the free, standard or premium tier'))
        .option('-i, --numberOfInstances <count>', $('number of instances in standard or premium mode'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (servicename, options, callback) {
          if (!options.tier && !options.numberOfInstances) {
            return callback(new Error($('Specify at least one option. Type --help for more information')));
          }

          // Convert options to internal values, confirm valid value was entered
          if(options.tier !== undefined) {
            if(options.tier !== 'free' && options.tier !== 'standard' && options.tier !== 'premium') {
              return callback(new Error($('Allowed values for tier are free, standard or premium')));
            }

            // If going to 'free' and they didn't specify a number, set it to 1
            if(options.tier === 'free' && options.numberOfInstances === undefined) {
              options.numberOfInstances = 1;
            }
          }

          // Verify number of instances is valid
          if (options.numberOfInstances !== undefined && isNaN(options.numberOfInstances)) {
            return callback(new Error($('Number of instances must be a positive integer')));
          }

          if (servicename) {
            ensuredServiceName(servicename);
          } else {
            promptString($('Mobile service name: '), ensuredServiceName);
          }

          function ensuredServiceName(servicename) {
            options.servicename = servicename;

            var progress = cli.interaction.progress($('Rescaling the mobile service'));
            mobile.getScaleSettings(options, function (error, scalesettings) {
              if (error) {
                progress.end();
                return callback(error);
              }

              if ((options.tier === undefined || options.tier === scalesettings.tier) &&
                  (options.numberOfInstances === undefined || options.numberOfInstances == scalesettings.numberOfInstances)) {
                // nothing to change
                progress.end();
                log.info($('Current scale settings of the mobile service already match the requested settings. No changes are made'));
                return callback();
              }

              var newScaleSettings = {
                tier: options.tier || scalesettings.tier,
                numberOfInstances: options.numberOfInstances || scalesettings.numberOfInstances
              };

              //ensure limits are correct
              if(scaleMaxInstanceCounts[newScaleSettings.tier] < newScaleSettings.numberOfInstances) {
                progress.end();
                if(scaleMaxInstanceCounts[newScaleSettings.tier] === 1) {
                  return callback(new Error(util.format($('Number of instances must be set to 1 when the mobile service is in the %s tier'), newScaleSettings.tier)));
                }

                return callback('Cannot set number of instances to ' + newScaleSettings.numberOfInstances.toString() +
                   ' when the mobile service is in the ' + newScaleSettings.tier + ' tier.' +
                   ' Valid values for this tier are 1 to ' + scaleMaxInstanceCounts[newScaleSettings.tier].toString()) + '.';
              }

              mobile.setScaleSettings(options, JSON.stringify(newScaleSettings), function (error) {
                progress.end();
                callback(error);
              });
            });
          }
        });

  var mobileJob = mobile.category('job')
        .description($('Commands to manage your Mobile Service scheduled jobs'));

  mobileJob.command('list [servicename]')
        .usage('[options] [servicename]')
        .description($('List mobile service scheduled jobs'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (servicename, options, callback) {

          if (servicename) {
            ensuredServiceName(servicename);
          } else {
            promptString($('Mobile service name: '), ensuredServiceName);
          }

          function ensuredServiceName(servicename) {
            options.servicename = servicename;

            mobile.getSchedulerScripts(options, function (error, results) {
              if (error) {
                return callback(error);
              }

              if (log.format().json) {
                log.json(results);
              } else {
                if (!Array.isArray(results) || results.length === 0) {
                  log.info($('There are no scheduled jobs. Create scheduled jobs using the \'azure mobile job create\' command'));
                } else {
                  log.info($('Scheduled jobs').green);
                  log.table(results, displayScheduledJob);
                  log.info($('You can manipulate scheduled job scripts using the \'azure mobile script\' command.').green);
                }
              }

              callback();
            });
          }
        });

  var intervalUnits = ['second', 'minute', 'hour', 'day', 'month', 'year', 'none'];

  mobileJob.command('create [servicename] [jobname]')
        .usage('[options] [servicename] [jobname]')
        .description($('Create a mobile service scheduled job'))
        .option('-i, --interval <number>',$('job interval as an integer; defaults to 15'))
        .option('-u, --intervalUnit <unit>', $('specify one of: minute, hour, day, month or none for on-demand jobs; defaults to minute'))
        .option('-t, --startTime <time>', $('time of the first run of the script in ISO format; defaults to now'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (servicename, jobname, options, callback) {
          options.interval = typeof options.interval === 'undefined' ? 15 : +options.interval;
          options.intervalUnit = options.intervalUnit || 'minute';

          if (isNaN(options.interval) || options.interval < 0) {
            return callback(new Error($('The --interval must be a positive integer')));
          }

          if (!intervalUnits.some(function (unit) { return unit === options.intervalUnit; })) {
            return callback(util.format($('The --intervalUnit must be one of %s'), intervalUnits.join(', ')));
          }

          if (servicename) {
            ensuredServiceName(servicename);
          } else {
            promptString($('Mobile service name: '), ensuredServiceName);
          }

          function ensuredServiceName(servicename) {
            options.servicename = servicename;

            if (jobname) {
              ensuredJobName(jobname);
            } else {
              promptString($('Scheduled job name: '), ensuredJobName);
            }

            function ensuredJobName(jobname) {
              options.jobname = jobname;

              var job = {
                name: options.jobname
              };

              if (options.intervalUnit !== 'none') {
                job.intervalUnit = options.intervalUnit;
                job.intervalPeriod = options.interval;
                job.startTime = options.startTime || new Date().toISOString();
              }

              mobile.createJob(options, JSON.stringify(job), function (error) {
                if (error) {
                  return callback(error);
                }

                log.info($('Job was created in disabled state. You can enable the job using the \'azure mobile job update\' command').green);
                log.info($('You can manipulate the scheduled job script using the \'azure mobile script\' command').green);
                callback();
              });
            }
          }
        });

  mobileJob.command('update [servicename] [jobname]')
        .usage('[options] [servicename] [jobname]')
        .description($('Update a mobile service scheduled job'))
        .option('-i, --interval <number>', $('job interval as an integer'))
        .option('-u, --intervalUnit <unit>', $('specify one of: minute, hour, day, month or none for on-demand jobs'))
        .option('-t, --startTime <time>', $('time of the first run of the script in ISO format'))
        .option('-a, --status <status>', $('enabled or disabled'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (servicename, jobname, options, _) {

          if (typeof options.interval !== 'undefined' && isNaN(options.interval) || options.interval < 0) {
            throw new Error($('The --interval must be a positive integer'));
          }

          if (typeof options.intervalUnits !== 'undefined' && !intervalUnits.some(function (unit) { return unit === options.intervalUnit; })) {
            throw new Error(util.format($('The --intervalUnit must be one of %s'), intervalUnits.join(', ')));
          }

          if (typeof options.status !== 'undefined' && options.status !== 'enabled' && options.status !== 'disabled') {
            throw new Error($('The --status must be either enabled or disabled'));
          }

          options.servicename = promptServiceNameIfNotGiven(options, servicename, _);
          options.jobname = cli.interaction.chooseIfNotGiven($('Scheduled job name: '), $('Getting choices'), jobname,
            function(cb) {
              mobile.getSchedulerScripts(options, function (error, jobs) {
                if(error) { return cb(error); }
                log.silly(JSON.stringify(jobs));

                cb(null, jobs.map(function(job) { return job.name; }));
              });
            }, _);

          var progress = cli.interaction.progress($('Updating job settings'));
          var job, newJob;
          try {
            job = mobile.getJob(options, _);
          } catch(e) {
            progress.end();
            throw e;
          }

          log.silly($('Current settings for job: '));
          log.json('silly', job);

          if(options.intervalUnit === 'none') {
            newJob = {
              status: 'disabled',
              intervalUnit: undefined
            };
          } else {
            newJob = {
              intervalPeriod: +options.interval || job.intervalPeriod,
              intervalUnit: options.intervalUnit || job.intervalUnit,
              startTime: options.startTime || job.startTime || '1900-01-01T00:00:00Z',
              status: options.status || job.status
            };
          }

          var changed = false;
          for (var i in newJob) {
            if (newJob[i] !== job[i]) {
              changed = true;
              break;
            }
          }

          if (changed) {
            try {
              mobile.setJob(options, newJob, _);
            } catch(e) {
              progress.end();
              throw e;
            }
          } else {
            log.info($('The scheduled job settings already match the requested settings. No changes made'));
          }
          progress.end();

        });

  mobileJob.command('delete [servicename] [jobname]')
        .usage('[options] [servicename] [jobname]')
        .description($('Delete a mobile service scheduled job'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (servicename, jobname, options, callback) {

          if (servicename) {
            ensuredServiceName(servicename);
          } else {
            promptString($('Mobile service name: '), ensuredServiceName);
          }

          function ensuredServiceName(servicename) {
            options.servicename = servicename;

            if (jobname) {
              ensuredJobName(jobname);
            } else {
              promptString($('Scheduled job name: '), ensuredJobName);
            }

            function ensuredJobName(jobname) {
              options.jobname = jobname;
              mobile.deleteSchedulerScript(options, callback);
            }
          }
        });

  var mobilePreview = mobile.category('preview')
    .description($('Commands to enable preview features for your Mobile Service'));

  mobilePreview.command('list [servicename]')
        .description($('Show the preview features enabled for a mobile service'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (servicename, options, _) {
          options.servicename = promptServiceNameIfNotGiven(options, servicename, _);

          var progress = cli.interaction.progress($('Getting preview features'));
          var result;
          try {
            result = mobile.getPreviews(options, _);
          } finally {
            progress.end();
          }

          cli.interaction.formatOutput(result, function (features) {
            if(features && (features.enabled && features.enabled.length > 0) || (features.available && features.available.length > 0)) {
              var combinedFeatures = __.union(features.enabled, features.available);
              log.table(combinedFeatures, function (row, f) {
                row.cell($('Preview feature'), f);
                row.cell($('Enabled'), __.contains(features.enabled, f) ? 'Yes'.green : 'No');
              });
              log.info($('You can enable preview features using the \'azure mobile preview enable\' command.'));
            } else {
              log.data($('There are no preview features available.'));
            }
          });
        });

  mobilePreview.command('enable [servicename] [featurename]')
        .usage('[options] [servicename] [featurename]')
        .description($('Enable a preview feature for a mobile service. Note that preview features cannot be disabled for a mobile service!'))
        .option('-s, --subscription <id>', $('the subscription id'))
        .execute(function (servicename, featurename, options, _) {
          options.servicename = promptServiceNameIfNotGiven(options, servicename, _);
          options.featurename = cli.interaction.chooseIfNotGiven($('Preview feature: '), $('Getting choices'), featurename,
            function(cb) {
              mobile.getPreviews(options, function (error, features) {
                if(error) { return cb(error); }
                cb(null, features.available);
              });
            }, _);

          var progress = cli.interaction.progress($('Enabling preview feature for mobile service'));
          var result;
          try {
            result = mobile.enablePreview(options, { enable: options.featurename }, _);
          } finally {
            progress.end();
          }

          cli.interaction.formatOutput(result, function (feature) {
            log.info($('Result of enabling feature:').green);
            log.info(feature.summary);

            Object.keys(feature.data).forEach(function (property) {
              var value = feature.data[property];
              if (__.isObject(value)) {
                value =  JSON.stringify(value);
              }
              log.data(util.format($('data.%s'), property), value.green);
            });

            log.verbose(util.format($('Detailed information: %s'), result.details));
          });
        });

  var mobileApi = mobile.category('api')
        .description($('Commands to manage your mobile service APIs'));

  mobileApi.command('list [servicename]')
        .description($('List mobile service custom APIs'))
        .option('-s, --subscription <id>', $('use the subscription id'))
        .execute(function (servicename, options, _) {
          options.servicename = promptServiceNameIfNotGiven(options, servicename, _);

          var progress =  cli.interaction.progress($('Retrieving list of APIs'));
          var result;
          try {
            result = mobile.getCustomApis(options, _);
          } finally {
            progress.end();
          }

          cli.interaction.formatOutput(result, function(apis) {
            if (!Array.isArray(apis) || apis.length === 0) {
              log.info($('There are no custom APIs. Create an API using the \'azure mobile api create\' command.'));
            } else {
              log.info($('APIs').green);
              log.table(apis, displayCustomApi);
              if(apis.some(function (api) { return api.hasAdditionalPermissions === true; })) {
                log.info($('* indicates the permissions metadata file has been manually modified.'));
              }
              log.info($('You can manipulate API scripts using the \'azure mobile script\' command.').green);
            }
          });
        });

  function displayCustomApi(row, s) {
    var name = s.name;
    if(s.hasAdditionalPermissions === true) {
      name += '*';
    }

    row.cell($('Name'), name);
    row.cell('Get', s.get || 'admin');
    row.cell('Put', s.put || 'admin');
    row.cell('Post', s.post || 'admin');
    row.cell('Patch', s.patch || 'admin');
    row.cell('Delete', s.delete || 'admin');
  }

  mobileApi.command('create [servicename] [apiname]')
        .description($('Creates a mobile service custom API'))
        .option('-s, --subscription <id>', $('use the subscription id'))
        .option('-p, --permissions <permissions>', $('comma delimited list of <method>=<permission> pairs'))
        .execute(function (servicename, apiname, options, _) {
          options.servicename = promptServiceNameIfNotGiven(options, servicename, _);
          options.apiname = promptIfNotGiven($('API name: '), apiname, _);

          var settings = parsePermissions(options.permissions, methods);
          
          // Populate default permissions for create to be application
          methods.forEach(function (method) {
            if(!settings[method]) {
              settings[method] = 'application';
            }
          });
          settings['name'] = options.apiname;

          // Now create the API
          var progress =  cli.interaction.progress(util.format($('Creating custom API: \'%s\''), options.apiname));
          try {
            mobile.createApi(options, settings, _);
          } finally {
            progress.end();
          }

          log.info($('API was created successfully. You can modify the API using the \'azure mobile script\' command.').green);
        });

  mobileApi.command('update [servicename] [apiname]')
        .description($('Updates a mobile service custom API'))
        .option('-s, --subscription <id>', $('use the subscription id'))
        .option('-p, --permissions <permissions>', $('comma delimited list of <method>=<permission> pairs'))
        .option('-f, --force', $('override any custom changes to the permissions metadata file'))
        .execute(function (servicename, apiname, options, _) {
          options.servicename = promptServiceNameIfNotGiven(options, servicename, _);
          options.apiname = promptIfNotGiven($('API name: '), apiname, _);
          if (!options.permissions) {
            throw new Error($('No updates specified. Check the list of available updates with \'--help\' and specify at least one.'));
          }

          var settings = parsePermissions(options.permissions, methods);
          var progress = cli.interaction.progress(util.format($('Updating API: \'%s\''), options.apiname));

          // Load the current settings
          var result;
          try {
            result = mobile.getCustomApi(options, _);
          } catch(e) {
            // Only end progress on error as we have more work to do yet
            progress.end();
            throw e;
          }

          log.silly($('Existing api settings:'));
          log.json('silly', result);

          // If the json file has been modified, don't overwrite those changes unless explicitly asked to
          if(result.hasAdditionalPermissions === true && options.force !== true) {
            progress.end();
            throw new Error($('The permissions for this custom API cannot be changed because the metadata file has been edited directly. To change the permissions and overwrite the existing metadata use the \'--force\' option.'));
          }

          // Update any permissions that are not specified
          methods.forEach(function(method) {
            if(!settings[method]) {
              settings[method] = result[method];
            }
          });

          // Save the merged set of permissions
          try {
            mobile.setCustomApi(options, settings, _);
          } finally {
            progress.end();
          }
        });

  mobileApi.command('delete [servicename] [apiname]')
        .description($('Deletes a mobile service custom API'))
        .option('-s, --subscription <id>', $('use the subscription id'))
        .execute(function (servicename, apiname, options, _) {
          options.servicename = promptServiceNameIfNotGiven(options, servicename, _);
          options.apiname = promptIfNotGiven($('API name: '), apiname, _);

          var progress = cli.interaction.progress(util.format($('Deleting API: \'%s\''), options.apiname));
          try {
            result = mobile.deleteCustomApi(options, _);
          } finally {
            progress.end();
          }
        });
};
