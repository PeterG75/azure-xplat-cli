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
    registeredProviders: ['mobileservice'],
    _eventsCount: '1',
    isDefault: true
  }, newProfile.environments['AzureCloud']));

  return newProfile;
};

exports.setEnvironment = function() {
  process.env['AZURE_VM_TEST_LOCATION'] = 'westus';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Network/networkWatchers/networkWatchersName?api-version=2016-09-01')
  .reply(200, "{\r\n  \"name\": \"networkWatchersName\",\r\n  \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Network/networkWatchers/networkWatchersName\",\r\n  \"etag\": \"W/\\\"7a20d1ad-7e52-4a6c-8d0b-1c1c192cb236\\\"\",\r\n  \"type\": \"Microsoft.Network/networkWatchers\",\r\n  \"location\": \"westcentralus\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"runningOperationIds\": []\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '431',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  etag: 'W/"7a20d1ad-7e52-4a6c-8d0b-1c1c192cb236"',
  'x-ms-request-id': 'b83bfc14-88e6-4d1c-9d7a-8d9df6a68914',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14992',
  'x-ms-correlation-request-id': '46fccf44-e61b-468d-97ee-5a74505da015',
  'x-ms-routing-request-id': 'WESTEUROPE:20170215T104425Z:46fccf44-e61b-468d-97ee-5a74505da015',
  date: 'Wed, 15 Feb 2017 10:44:25 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Network/networkWatchers/networkWatchersName?api-version=2016-09-01')
  .reply(200, "{\r\n  \"name\": \"networkWatchersName\",\r\n  \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Network/networkWatchers/networkWatchersName\",\r\n  \"etag\": \"W/\\\"7a20d1ad-7e52-4a6c-8d0b-1c1c192cb236\\\"\",\r\n  \"type\": \"Microsoft.Network/networkWatchers\",\r\n  \"location\": \"westcentralus\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"runningOperationIds\": []\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '431',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  etag: 'W/"7a20d1ad-7e52-4a6c-8d0b-1c1c192cb236"',
  'x-ms-request-id': 'b83bfc14-88e6-4d1c-9d7a-8d9df6a68914',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14992',
  'x-ms-correlation-request-id': '46fccf44-e61b-468d-97ee-5a74505da015',
  'x-ms-routing-request-id': 'WESTEUROPE:20170215T104425Z:46fccf44-e61b-468d-97ee-5a74505da015',
  date: 'Wed, 15 Feb 2017 10:44:25 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Network/networkWatchers/networkWatchersName/configureFlowLog?api-version=2016-09-01', '*')
  .reply(200, "{\r\n  \"targetResourceId\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Network/networkSecurityGroups/nsgForCapture\",\r\n  \"properties\": {\r\n    \"storageId\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Storage/storageAccounts/troubleshootteststorage\",\r\n    \"enabled\": true,\r\n    \"retentionPolicy\": {\r\n      \"days\": 123,\r\n      \"enabled\": true\r\n    }\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '477',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '8456eecd-fc80-4acc-b084-8153a9d5f718',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1199',
  'x-ms-correlation-request-id': 'fb13b82f-9825-471f-8b20-ca734b45b3a8',
  'x-ms-routing-request-id': 'WESTEUROPE:20170215T104431Z:fb13b82f-9825-471f-8b20-ca734b45b3a8',
  date: 'Wed, 15 Feb 2017 10:44:31 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Network/networkWatchers/networkWatchersName/configureFlowLog?api-version=2016-09-01', '*')
  .reply(200, "{\r\n  \"targetResourceId\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Network/networkSecurityGroups/nsgForCapture\",\r\n  \"properties\": {\r\n    \"storageId\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Storage/storageAccounts/troubleshootteststorage\",\r\n    \"enabled\": true,\r\n    \"retentionPolicy\": {\r\n      \"days\": 123,\r\n      \"enabled\": true\r\n    }\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '477',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '8456eecd-fc80-4acc-b084-8153a9d5f718',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1199',
  'x-ms-correlation-request-id': 'fb13b82f-9825-471f-8b20-ca734b45b3a8',
  'x-ms-routing-request-id': 'WESTEUROPE:20170215T104431Z:fb13b82f-9825-471f-8b20-ca734b45b3a8',
  date: 'Wed, 15 Feb 2017 10:44:31 GMT',
  connection: 'close' });
 return result; }]];