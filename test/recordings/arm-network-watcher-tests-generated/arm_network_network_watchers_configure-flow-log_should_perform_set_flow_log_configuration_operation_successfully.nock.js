// This file has been autogenerated.

var profile = require('../../../lib/util/profile');

exports.getMockedProfile = function () {
  var newProfile = new profile.Profile();

  newProfile.addSubscription(new profile.Subscription({
    id: '2c224e7e-3ef5-431d-a57b-e71f4662e3a6',
    name: 'Node CLI Test',
    user: {
      name: 'user@domain.example',
      type: 'user'
    },
    tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47',
    state: 'Enabled',
    registeredProviders: [],
    _eventsCount: '1',
    isDefault: true
  }, newProfile.environments['AzureCloud']));

  return newProfile;
};

exports.setEnvironment = function() {
  process.env['AZURE_VM_TEST_LOCATION'] = 'westcentralus';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Network/networkWatchers/networkWatcherName?api-version=2017-06-01')
  .reply(200, "{\r\n  \"name\": \"networkWatcherName\",\r\n  \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Network/networkWatchers/networkWatcherName\",\r\n  \"etag\": \"W/\\\"ac3b7612-93dc-45ed-aa9f-7c27a828a92a\\\"\",\r\n  \"type\": \"Microsoft.Network/networkWatchers\",\r\n  \"location\": \"westcentralus\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"runningOperationIds\": []\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '429',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  etag: 'W/"ac3b7612-93dc-45ed-aa9f-7c27a828a92a"',
  'x-ms-request-id': 'f91d5745-a186-481f-9c23-cbdee652c48c',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14991',
  'x-ms-correlation-request-id': '8ba0f098-a20d-4c00-a7a1-9fa27a2dbfb5',
  'x-ms-routing-request-id': 'WESTEUROPE:20170714T073147Z:8ba0f098-a20d-4c00-a7a1-9fa27a2dbfb5',
  date: 'Fri, 14 Jul 2017 07:31:46 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Network/networkWatchers/networkWatcherName?api-version=2017-06-01')
  .reply(200, "{\r\n  \"name\": \"networkWatcherName\",\r\n  \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Network/networkWatchers/networkWatcherName\",\r\n  \"etag\": \"W/\\\"ac3b7612-93dc-45ed-aa9f-7c27a828a92a\\\"\",\r\n  \"type\": \"Microsoft.Network/networkWatchers\",\r\n  \"location\": \"westcentralus\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"runningOperationIds\": []\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '429',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  etag: 'W/"ac3b7612-93dc-45ed-aa9f-7c27a828a92a"',
  'x-ms-request-id': 'f91d5745-a186-481f-9c23-cbdee652c48c',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14991',
  'x-ms-correlation-request-id': '8ba0f098-a20d-4c00-a7a1-9fa27a2dbfb5',
  'x-ms-routing-request-id': 'WESTEUROPE:20170714T073147Z:8ba0f098-a20d-4c00-a7a1-9fa27a2dbfb5',
  date: 'Fri, 14 Jul 2017 07:31:46 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Network/networkWatchers/networkWatcherName/configureFlowLog?api-version=2017-06-01', '*')
  .reply(200, "{\r\n  \"targetResourceId\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Network/networkSecurityGroups/networkSecurityGroupName\",\r\n  \"properties\": {\r\n    \"storageId\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Storage/storageAccounts/troubleshootteststorage\",\r\n    \"enabled\": true,\r\n    \"retentionPolicy\": {\r\n      \"days\": 123,\r\n      \"enabled\": true\r\n    }\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '488',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '470ad83e-ffdc-4f9f-9e78-21e90c9c6a18',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1199',
  'x-ms-correlation-request-id': 'a5aca82c-a5f1-4550-aa04-de4f0617d9b4',
  'x-ms-routing-request-id': 'WESTEUROPE:20170714T073151Z:a5aca82c-a5f1-4550-aa04-de4f0617d9b4',
  date: 'Fri, 14 Jul 2017 07:31:50 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Network/networkWatchers/networkWatcherName/configureFlowLog?api-version=2017-06-01', '*')
  .reply(200, "{\r\n  \"targetResourceId\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Network/networkSecurityGroups/networkSecurityGroupName\",\r\n  \"properties\": {\r\n    \"storageId\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Storage/storageAccounts/troubleshootteststorage\",\r\n    \"enabled\": true,\r\n    \"retentionPolicy\": {\r\n      \"days\": 123,\r\n      \"enabled\": true\r\n    }\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '488',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '470ad83e-ffdc-4f9f-9e78-21e90c9c6a18',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1199',
  'x-ms-correlation-request-id': 'a5aca82c-a5f1-4550-aa04-de4f0617d9b4',
  'x-ms-routing-request-id': 'WESTEUROPE:20170714T073151Z:a5aca82c-a5f1-4550-aa04-de4f0617d9b4',
  date: 'Fri, 14 Jul 2017 07:31:50 GMT',
  connection: 'close' });
 return result; }]];