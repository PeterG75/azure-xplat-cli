// This file has been autogenerated.

var profile = require('../../../lib/util/profile');

exports.getMockedProfile = function () {
  var newProfile = new profile.Profile();

  newProfile.addSubscription(new profile.Subscription({
    id: '947d47b4-7883-4bb9-9d85-c5e8e2f572ce',
    name: 'nrptest58.westus.validation.partner',
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
  process.env['AZURE_VM_TEST_LOCATION'] = 'brazilsouth';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-circuit/providers/Microsoft.Network/expressRouteCircuits/invalidBandwidthName?api-version=2017-08-01')
  .reply(404, "{\"error\":{\"code\":\"ResourceNotFound\",\"message\":\"The Resource 'Microsoft.Network/expressRouteCircuits/invalidBandwidthName' under resource group 'xplat-test-circuit' was not found.\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-failure-cause': 'gateway',
  'x-ms-request-id': '565e8149-cd50-44e0-92ba-98dc539c51ad',
  'x-ms-correlation-request-id': '565e8149-cd50-44e0-92ba-98dc539c51ad',
  'x-ms-routing-request-id': 'WESTEUROPE:20170901T114114Z:565e8149-cd50-44e0-92ba-98dc539c51ad',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Fri, 01 Sep 2017 11:41:14 GMT',
  connection: 'close',
  'content-length': '181' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-circuit/providers/Microsoft.Network/expressRouteCircuits/invalidBandwidthName?api-version=2017-08-01')
  .reply(404, "{\"error\":{\"code\":\"ResourceNotFound\",\"message\":\"The Resource 'Microsoft.Network/expressRouteCircuits/invalidBandwidthName' under resource group 'xplat-test-circuit' was not found.\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-failure-cause': 'gateway',
  'x-ms-request-id': '565e8149-cd50-44e0-92ba-98dc539c51ad',
  'x-ms-correlation-request-id': '565e8149-cd50-44e0-92ba-98dc539c51ad',
  'x-ms-routing-request-id': 'WESTEUROPE:20170901T114114Z:565e8149-cd50-44e0-92ba-98dc539c51ad',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Fri, 01 Sep 2017 11:41:14 GMT',
  connection: 'close',
  'content-length': '181' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-circuit/providers/Microsoft.Network/expressRouteCircuits/invalidBandwidthName?api-version=2017-08-01', '*')
  .reply(400, "{\r\n  \"error\": {\r\n    \"code\": \"ExpressRouteCircuitServiceProviderDoesNotExist\",\r\n    \"message\": \"The Service Provider Equinix specified for Express Route Circuit /subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-circuit/providers/Microsoft.Network/expressRouteCircuits/invalidBandwidthName does not exist.\",\r\n    \"details\": []\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '361',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '422cdf02-cc71-4691-9cd1-8c136ded0ff7',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1196',
  'x-ms-correlation-request-id': '305305b3-aeee-4e43-bdb5-4cb46fdec082',
  'x-ms-routing-request-id': 'WESTEUROPE:20170901T114127Z:305305b3-aeee-4e43-bdb5-4cb46fdec082',
  date: 'Fri, 01 Sep 2017 11:41:27 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-circuit/providers/Microsoft.Network/expressRouteCircuits/invalidBandwidthName?api-version=2017-08-01', '*')
  .reply(400, "{\r\n  \"error\": {\r\n    \"code\": \"ExpressRouteCircuitServiceProviderDoesNotExist\",\r\n    \"message\": \"The Service Provider Equinix specified for Express Route Circuit /subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-circuit/providers/Microsoft.Network/expressRouteCircuits/invalidBandwidthName does not exist.\",\r\n    \"details\": []\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '361',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '422cdf02-cc71-4691-9cd1-8c136ded0ff7',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1196',
  'x-ms-correlation-request-id': '305305b3-aeee-4e43-bdb5-4cb46fdec082',
  'x-ms-routing-request-id': 'WESTEUROPE:20170901T114127Z:305305b3-aeee-4e43-bdb5-4cb46fdec082',
  date: 'Fri, 01 Sep 2017 11:41:27 GMT',
  connection: 'close' });
 return result; }]];