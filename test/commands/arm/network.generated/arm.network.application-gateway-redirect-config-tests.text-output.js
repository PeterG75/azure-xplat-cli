﻿/**
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

// Warning: This code was generated by a tool.
// 
// Changes to this file may cause incorrect behavior and will be lost if the
// code is regenerated.

'use strict';

var should = require('should');
var util = require('util');
var _ = require('underscore');

var CLITest = require('../../../framework/arm-cli-test');
var utils = require('../../../../lib/util/utils');
var tagUtils = require('../../../../lib/commands/arm/tag/tagUtils');
var testUtils = require('../../../util/util');

var networkTestUtil = new (require('../../../util/networkTestUtil'))();

var generatorUtils = require('../../../../lib/util/generatorUtils');
var profile = require('../../../../lib/util/profile');
var $ = utils.getLocaleString;

var testPrefix = 'arm-network-application-gateway-redirect-config-tests-generated',
  groupName = 'xplat-test-redirect-config',
  location;
var index = 0;

var redirectConfigurations = {
  redirectType: 'Permanent',
  redirectTypeNew: 'Temporary',
  targetUrlNew: 'http://bing.com',
  includePath: 'true',
  includeQueryString: 'true',
  includeQueryStringNew: 'false',
  name: 'redirectConfigurationName'
};

redirectConfigurations.virtualNetworkName = 'virtualNetworkName';
redirectConfigurations.subnetName = 'subnetName';
redirectConfigurations.publicIPAddressName = 'publicIPAddressName';
redirectConfigurations.applicationGatewayName = 'applicationGatewayName';
redirectConfigurations.frontendIPConfigurationName = 'frontendIPConfigurationName';
redirectConfigurations.frontendPortName = 'frontendPortName';
redirectConfigurations.httpListenerName = 'httpListenerName';

var subnet = {
  addressPrefix: '10.0.0.0/16',
  virtualNetworkName: 'virtualNetworkName',
  name: 'subnetName'
};

var publicIPAddress = {
  location: 'westus',
  name: 'publicIPAddressName'
};

var httpListener = {
  applicationGatewayName: 'applicationGatewayName',
  frontendIPConfigurationName: 'frontendIPConfigurationName',
  frontendPortName: 'frontendPortName',
  name: 'httpListenerName'
};

var applicationGateway = {
  backendAddresses: '10.0.0.0',
  location: 'westus',
  virtualNetworkName: 'virtualNetworkName',
  subnetName: 'subnetName',
  publicIPAddressName: 'publicIPAddressName',
  name: 'applicationGatewayName'
};

var virtualNetwork = {
  location: 'westus',
  name: 'virtualNetworkName'
};

var frontendPort = {
  port: '4242',
  applicationGatewayName: 'applicationGatewayName',
  name: 'frontendPortName'
};

var frontendIPConfiguration = {
  applicationGatewayName: 'applicationGatewayName',
  virtualNetworkName: 'virtualNetworkName',
  subnetName: 'subnetName',
  name: 'frontendIPConfigurationName'
};

var requiredEnvironment = [{
  name: 'AZURE_VM_TEST_LOCATION',
  defaultValue: 'westus'
}];

describe('arm', function () {
  describe('network', function () {
    var suite, retry = 5;
    var hour = 60 * 60000;
    var testTimeout = 3 * hour;

    before(function (done) {
      this.timeout(testTimeout);
      suite = new CLITest(this, testPrefix, requiredEnvironment, true);
      suite.isRecording = false;
      suite.setupSuite(function () {
        location = redirectConfigurations.location || process.env.AZURE_VM_TEST_LOCATION;
        groupName = suite.isMocked ? groupName : suite.generateId(groupName, null);
        redirectConfigurations.location = location;
        redirectConfigurations.name = suite.isMocked ? redirectConfigurations.name : suite.generateId(redirectConfigurations.name, null);
        redirectConfigurations.group = groupName;
        if (!suite.isPlayback()) {
          networkTestUtil.createGroup(groupName, location, suite, function () {
            var cmd = 'network vnet create -g {1} -n {name} --location {location} --json'.formatArgs(virtualNetwork, groupName);
            testUtils.executeCommand(suite, retry, cmd, function (result) {
              result.exitStatus.should.equal(0);
              var cmd = 'network vnet subnet create -g {1} -n {name} --address-prefix {addressPrefix} --vnet-name {virtualNetworkName} --json'.formatArgs(subnet, groupName);
              testUtils.executeCommand(suite, retry, cmd, function (result) {
                result.exitStatus.should.equal(0);
                var cmd = 'network public-ip create -g {1} -n {name} --location {location} --json'.formatArgs(publicIPAddress, groupName);
                testUtils.executeCommand(suite, retry, cmd, function (result) {
                  result.exitStatus.should.equal(0);
                  var cmd = 'network application-gateway create -g {1} -n {name} --servers {backendAddresses} --location {location} --vnet-name {virtualNetworkName} --subnet-name {subnetName} --public-ip-name {publicIPAddressName} --json'.formatArgs(applicationGateway, groupName);
                  testUtils.executeCommand(suite, retry, cmd, function (result) {
                    result.exitStatus.should.equal(0);
                    var cmd = 'network application-gateway frontend-ip create -g {1} -n {name} --gateway-name {applicationGatewayName} --vnet-name {virtualNetworkName} --subnet-name {subnetName} --json'.formatArgs(frontendIPConfiguration, groupName);
                    testUtils.executeCommand(suite, retry, cmd, function (result) {
                      result.exitStatus.should.equal(0);
                      var cmd = 'network application-gateway frontend-port create -g {1} -n {name} --port {port} --gateway-name {applicationGatewayName} --json'.formatArgs(frontendPort, groupName);
                      testUtils.executeCommand(suite, retry, cmd, function (result) {
                        result.exitStatus.should.equal(0);
                        var cmd = 'network application-gateway http-listener create -g {1} -n {name} --gateway-name {applicationGatewayName} --frontend-ip-name {frontendIPConfigurationName} --frontend-port-name {frontendPortName} --json'.formatArgs(httpListener, groupName);
                        testUtils.executeCommand(suite, retry, cmd, function (result) {
                          result.exitStatus.should.equal(0);
                          var output = JSON.parse(result.text);
                          redirectConfigurations.httpListenerId = utils.findFirstCaseIgnore(output.httpListeners, {name: 'httpListenerName'}).id;
                          done();
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        } else {
          var subscriptionId = profile.current.getSubscription().id;
          redirectConfigurations.httpListenerId = generatorUtils.generateResourceIdCommon(subscriptionId, groupName, 'applicationGateways/applicationGatewayName/httpListeners', redirectConfigurations.httpListenerName);
          done();
        }
      });
    });
    after(function (done) {
      this.timeout(testTimeout);
      networkTestUtil.deleteGroup(groupName, suite, function () {
        suite.teardownSuite(done);
      });
    });
    beforeEach(function (done) {
      suite.setupTest(done);
    });
    afterEach(function (done) {
      suite.teardownTest(done);
    });

    describe('redirect configurations', function () {
      this.timeout(testTimeout);
      it('create should create redirect configurations', function (done) {
        var cmd = 'network application-gateway redirect-config create -g {group} -n {name} --redirect-type {redirectType} --include-path {includePath} --include-query-string {includeQueryString} --gateway-name {applicationGatewayName} --target-listener-id {httpListenerId}'.formatArgs(redirectConfigurations);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          done();
        });
      });
      it('show should display redirect configurations details', function (done) {
        var cmd = 'network application-gateway redirect-config show -g {group} -n {name} --gateway-name {applicationGatewayName}'.formatArgs(redirectConfigurations);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          done();
        });
      });
      it('set should update redirect configurations', function (done) {
        var cmd = 'network application-gateway redirect-config set -g {group} -n {name} --redirect-type {redirectTypeNew} --target-url {targetUrlNew} --include-query-string {includeQueryStringNew} --gateway-name {applicationGatewayName} --target-listener-id'.formatArgs(redirectConfigurations);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          done();
        });
      });
      it('list should display all redirect configurations in resource group', function (done) {
        var cmd = 'network application-gateway redirect-config list -g {group} --gateway-name {applicationGatewayName}'.formatArgs(redirectConfigurations);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          done();
        });
      });
      it('delete should delete redirect configurations', function (done) {
        var cmd = 'network application-gateway redirect-config delete -g {group} -n {name} --gateway-name {applicationGatewayName} --quiet'.formatArgs(redirectConfigurations);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);

          cmd = 'network application-gateway redirect-config show -g {group} -n {name} --gateway-name {applicationGatewayName}'.formatArgs(redirectConfigurations);
          testUtils.executeCommand(suite, retry, cmd, function (result) {
            result.exitStatus.should.equal(0);
            done();
          });
        });
      });
    });
  });
});
