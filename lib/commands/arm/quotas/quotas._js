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

'use strict';

var util = require('util');

var profile = require('../../../util/profile');
var utils = require('../../../util/utils');
var VirtualNetwork = require('../network/virtualNetwork');
var VMClient = require('../vm/vmClient');

var $ = utils.getLocaleString;

exports.init = function (cli) {
  var log = cli.output;
	
  var usage = cli.category('quotas')
    .description($('Command to view your aggregated Azure quotas'));

	usage.command('show [location]')
      .description($('Show cores, storage account and network quotas for the current subscription'))
      .usage('[options] <location>')
      .option('-l, --location <location>', $('the location'))
      .option('-s, --subscription <subscription>', $('the subscription identifier'))
      .execute(function (location, options, _) {
        location = cli.interaction.promptIfNotGiven($('Location: '), location, _);
        location = utils.toLowerCaseAndRemoveSpace(location);
		
		//cores quotas
		var coresQuotas = log.info($('Showing Cores and VM Quotas'));
        var vmClient = new VMClient(cli, options.subscription);
        vmClient.listComputeUsage(location, options, _);
		var lineBreaks = log.info($('\n'));

		//networking quotas
		var networkQuotas = log.info($('Showing Networking Quotas'));
		var networkManagementClient = getNetworkManagementClient(options);
		var virtualNetwork = new VirtualNetwork(cli, networkManagementClient);
        virtualNetwork.listNetworkUsage(location, options, _);

		var moreLineBreaks = log.info($('\n'));

		//storage account quotas
		var networkQuotas = log.info($('Showing Storage Accounts Quota (NOTE: Global, not per region)'));
        var storageClient = createStorageManagementClient(options.subscription);
		var usage = showStorageUsage(storageClient, options.subscription, _);
		cli.interaction.formatOutput(usage, function(outputData) {
		  log.data($('Subscription:'), outputData.subscriptionId);
		  log.data($('Used Storage Accounts:'), outputData.used);
		  log.data($('Max Storage Accounts:'), outputData.limit);
		});
  });
  
  function getNetworkManagementClient(options) {
    var subscription = profile.current.getSubscription(options.subscription);
    return utils.createNetworkManagementClient(subscription);
  }

  function createStorageManagementClient(subscriptionOrName) {
	var subscription = profile.current.getSubscription(subscriptionOrName);
    var client = utils.createStorageResourceProviderClient(subscription);

	return client;
  }

  function showStorageUsage(serviceClient, subscriptionId, _) {
    var message = $('Showing the subscription usage');
    var usage = { subscription: subscriptionId };

    if(!subscriptionId) {
      usage.subscriptionId = profile.current.getSubscription().id;
    }

    var usageList = serviceClient.usageOperations.list(_);
    for (var i = 0; i < usageList.value.length; i++) {
      if (usageList.value[i].name.value === 'StorageAccounts') {
        usage.used = usageList.value[i].currentValue;
        usage.limit = usageList.value[i].limit;
        break;
      }
    }

    return usage;
  }

};

