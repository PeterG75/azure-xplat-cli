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
  process.env['AZURE_VM_TEST_LOCATION'] = 'westus';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-peering/providers/Microsoft.Network/virtualNetworks/virtualNetworkName/virtualNetworkPeerings/virtualNetworkPeeringName?api-version=2017-08-01')
  .reply(200, "{\r\n  \"name\": \"virtualNetworkPeeringName\",\r\n  \"id\": \"/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-peering/providers/Microsoft.Network/virtualNetworks/virtualNetworkName/virtualNetworkPeerings/virtualNetworkPeeringName\",\r\n  \"etag\": \"W/\\\"abe7e0ad-ae3d-4501-bd01-b5d7c89df3af\\\"\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"peeringState\": \"Initiated\",\r\n    \"remoteVirtualNetwork\": {\r\n      \"id\": \"/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-peering/providers/Microsoft.Network/virtualNetworks/remoteNetworkName\"\r\n    },\r\n    \"allowVirtualNetworkAccess\": true,\r\n    \"allowForwardedTraffic\": true,\r\n    \"allowGatewayTransit\": true,\r\n    \"useRemoteGateways\": false,\r\n    \"remoteAddressSpace\": {\r\n      \"addressPrefixes\": [\r\n        \"11.0.0.0/8\"\r\n      ]\r\n    }\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '848',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  etag: 'W/"abe7e0ad-ae3d-4501-bd01-b5d7c89df3af"',
  'x-ms-request-id': '967f2cbd-9759-4688-bf92-4fa10422bdb4',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14996',
  'x-ms-correlation-request-id': '28f156d3-4e21-4945-8534-0d5e19ff7dc3',
  'x-ms-routing-request-id': 'WESTEUROPE:20170901T130032Z:28f156d3-4e21-4945-8534-0d5e19ff7dc3',
  date: 'Fri, 01 Sep 2017 13:00:31 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-peering/providers/Microsoft.Network/virtualNetworks/virtualNetworkName/virtualNetworkPeerings/virtualNetworkPeeringName?api-version=2017-08-01')
  .reply(200, "{\r\n  \"name\": \"virtualNetworkPeeringName\",\r\n  \"id\": \"/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-peering/providers/Microsoft.Network/virtualNetworks/virtualNetworkName/virtualNetworkPeerings/virtualNetworkPeeringName\",\r\n  \"etag\": \"W/\\\"abe7e0ad-ae3d-4501-bd01-b5d7c89df3af\\\"\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"peeringState\": \"Initiated\",\r\n    \"remoteVirtualNetwork\": {\r\n      \"id\": \"/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-peering/providers/Microsoft.Network/virtualNetworks/remoteNetworkName\"\r\n    },\r\n    \"allowVirtualNetworkAccess\": true,\r\n    \"allowForwardedTraffic\": true,\r\n    \"allowGatewayTransit\": true,\r\n    \"useRemoteGateways\": false,\r\n    \"remoteAddressSpace\": {\r\n      \"addressPrefixes\": [\r\n        \"11.0.0.0/8\"\r\n      ]\r\n    }\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '848',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  etag: 'W/"abe7e0ad-ae3d-4501-bd01-b5d7c89df3af"',
  'x-ms-request-id': '967f2cbd-9759-4688-bf92-4fa10422bdb4',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14996',
  'x-ms-correlation-request-id': '28f156d3-4e21-4945-8534-0d5e19ff7dc3',
  'x-ms-routing-request-id': 'WESTEUROPE:20170901T130032Z:28f156d3-4e21-4945-8534-0d5e19ff7dc3',
  date: 'Fri, 01 Sep 2017 13:00:31 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-peering/providers/Microsoft.Network/virtualNetworks/virtualNetworkName/virtualNetworkPeerings/virtualNetworkPeeringName?api-version=2017-08-01', '*')
  .reply(200, "{\r\n  \"name\": \"virtualNetworkPeeringName\",\r\n  \"id\": \"/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-peering/providers/Microsoft.Network/virtualNetworks/virtualNetworkName/virtualNetworkPeerings/virtualNetworkPeeringName\",\r\n  \"etag\": \"W/\\\"c24e7318-ce7a-4554-8d1d-58b6d07392d8\\\"\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Updating\",\r\n    \"peeringState\": \"Initiated\",\r\n    \"remoteVirtualNetwork\": {\r\n      \"id\": \"/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-peering/providers/Microsoft.Network/virtualNetworks/remoteNetworkName\"\r\n    },\r\n    \"allowVirtualNetworkAccess\": false,\r\n    \"allowForwardedTraffic\": false,\r\n    \"allowGatewayTransit\": false,\r\n    \"useRemoteGateways\": false,\r\n    \"remoteAddressSpace\": {\r\n      \"addressPrefixes\": [\r\n        \"11.0.0.0/8\"\r\n      ]\r\n    }\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '850',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'retry-after': '10',
  'x-ms-request-id': '88fe58f0-d6c5-4324-9d1b-f456da60341e',
  'azure-asyncoperation': 'https://management.azure.com/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/providers/Microsoft.Network/locations/westus.validation/operations/88fe58f0-d6c5-4324-9d1b-f456da60341e?api-version=2017-08-01',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1199',
  'x-ms-correlation-request-id': '9cca4bee-3c72-4da8-bebf-7a1518d57860',
  'x-ms-routing-request-id': 'WESTEUROPE:20170901T130034Z:9cca4bee-3c72-4da8-bebf-7a1518d57860',
  date: 'Fri, 01 Sep 2017 13:00:34 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-peering/providers/Microsoft.Network/virtualNetworks/virtualNetworkName/virtualNetworkPeerings/virtualNetworkPeeringName?api-version=2017-08-01', '*')
  .reply(200, "{\r\n  \"name\": \"virtualNetworkPeeringName\",\r\n  \"id\": \"/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-peering/providers/Microsoft.Network/virtualNetworks/virtualNetworkName/virtualNetworkPeerings/virtualNetworkPeeringName\",\r\n  \"etag\": \"W/\\\"c24e7318-ce7a-4554-8d1d-58b6d07392d8\\\"\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Updating\",\r\n    \"peeringState\": \"Initiated\",\r\n    \"remoteVirtualNetwork\": {\r\n      \"id\": \"/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-peering/providers/Microsoft.Network/virtualNetworks/remoteNetworkName\"\r\n    },\r\n    \"allowVirtualNetworkAccess\": false,\r\n    \"allowForwardedTraffic\": false,\r\n    \"allowGatewayTransit\": false,\r\n    \"useRemoteGateways\": false,\r\n    \"remoteAddressSpace\": {\r\n      \"addressPrefixes\": [\r\n        \"11.0.0.0/8\"\r\n      ]\r\n    }\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '850',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'retry-after': '10',
  'x-ms-request-id': '88fe58f0-d6c5-4324-9d1b-f456da60341e',
  'azure-asyncoperation': 'https://management.azure.com/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/providers/Microsoft.Network/locations/westus.validation/operations/88fe58f0-d6c5-4324-9d1b-f456da60341e?api-version=2017-08-01',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1199',
  'x-ms-correlation-request-id': '9cca4bee-3c72-4da8-bebf-7a1518d57860',
  'x-ms-routing-request-id': 'WESTEUROPE:20170901T130034Z:9cca4bee-3c72-4da8-bebf-7a1518d57860',
  date: 'Fri, 01 Sep 2017 13:00:34 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/providers/Microsoft.Network/locations/westus.validation/operations/88fe58f0-d6c5-4324-9d1b-f456da60341e?api-version=2017-08-01')
  .reply(200, "{\r\n  \"status\": \"Succeeded\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '29',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '734d4d00-4971-4ce2-8d6c-7a075b0c7022',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14999',
  'x-ms-correlation-request-id': '933fbac0-337d-4733-b2ff-bd619ed357eb',
  'x-ms-routing-request-id': 'WESTEUROPE:20170901T130106Z:933fbac0-337d-4733-b2ff-bd619ed357eb',
  date: 'Fri, 01 Sep 2017 13:01:05 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/providers/Microsoft.Network/locations/westus.validation/operations/88fe58f0-d6c5-4324-9d1b-f456da60341e?api-version=2017-08-01')
  .reply(200, "{\r\n  \"status\": \"Succeeded\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '29',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '734d4d00-4971-4ce2-8d6c-7a075b0c7022',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14999',
  'x-ms-correlation-request-id': '933fbac0-337d-4733-b2ff-bd619ed357eb',
  'x-ms-routing-request-id': 'WESTEUROPE:20170901T130106Z:933fbac0-337d-4733-b2ff-bd619ed357eb',
  date: 'Fri, 01 Sep 2017 13:01:05 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-peering/providers/Microsoft.Network/virtualNetworks/virtualNetworkName/virtualNetworkPeerings/virtualNetworkPeeringName?api-version=2017-08-01')
  .reply(200, "{\r\n  \"name\": \"virtualNetworkPeeringName\",\r\n  \"id\": \"/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-peering/providers/Microsoft.Network/virtualNetworks/virtualNetworkName/virtualNetworkPeerings/virtualNetworkPeeringName\",\r\n  \"etag\": \"W/\\\"4fcef45c-cd33-4e66-a1da-99da45291238\\\"\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"peeringState\": \"Initiated\",\r\n    \"remoteVirtualNetwork\": {\r\n      \"id\": \"/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-peering/providers/Microsoft.Network/virtualNetworks/remoteNetworkName\"\r\n    },\r\n    \"allowVirtualNetworkAccess\": false,\r\n    \"allowForwardedTraffic\": false,\r\n    \"allowGatewayTransit\": false,\r\n    \"useRemoteGateways\": false,\r\n    \"remoteAddressSpace\": {\r\n      \"addressPrefixes\": [\r\n        \"11.0.0.0/8\"\r\n      ]\r\n    }\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '851',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  etag: 'W/"4fcef45c-cd33-4e66-a1da-99da45291238"',
  'x-ms-request-id': 'a0e7fe5c-cf7b-45cf-880c-0adf7f9fef1a',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14999',
  'x-ms-correlation-request-id': '8cd4234a-6570-4b2c-b603-04c3cc4467e0',
  'x-ms-routing-request-id': 'WESTEUROPE:20170901T130108Z:8cd4234a-6570-4b2c-b603-04c3cc4467e0',
  date: 'Fri, 01 Sep 2017 13:01:08 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-peering/providers/Microsoft.Network/virtualNetworks/virtualNetworkName/virtualNetworkPeerings/virtualNetworkPeeringName?api-version=2017-08-01')
  .reply(200, "{\r\n  \"name\": \"virtualNetworkPeeringName\",\r\n  \"id\": \"/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-peering/providers/Microsoft.Network/virtualNetworks/virtualNetworkName/virtualNetworkPeerings/virtualNetworkPeeringName\",\r\n  \"etag\": \"W/\\\"4fcef45c-cd33-4e66-a1da-99da45291238\\\"\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"peeringState\": \"Initiated\",\r\n    \"remoteVirtualNetwork\": {\r\n      \"id\": \"/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-peering/providers/Microsoft.Network/virtualNetworks/remoteNetworkName\"\r\n    },\r\n    \"allowVirtualNetworkAccess\": false,\r\n    \"allowForwardedTraffic\": false,\r\n    \"allowGatewayTransit\": false,\r\n    \"useRemoteGateways\": false,\r\n    \"remoteAddressSpace\": {\r\n      \"addressPrefixes\": [\r\n        \"11.0.0.0/8\"\r\n      ]\r\n    }\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '851',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  etag: 'W/"4fcef45c-cd33-4e66-a1da-99da45291238"',
  'x-ms-request-id': 'a0e7fe5c-cf7b-45cf-880c-0adf7f9fef1a',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14999',
  'x-ms-correlation-request-id': '8cd4234a-6570-4b2c-b603-04c3cc4467e0',
  'x-ms-routing-request-id': 'WESTEUROPE:20170901T130108Z:8cd4234a-6570-4b2c-b603-04c3cc4467e0',
  date: 'Fri, 01 Sep 2017 13:01:08 GMT',
  connection: 'close' });
 return result; }]];