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
  process.env['AZURE_VM_TEST_LOCATION'] = 'westus';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-local-gateway/providers/Microsoft.Network/localNetworkGateways/localNetworkGatewayName?api-version=2017-06-01')
  .reply(200, "{\r\n  \"name\": \"localNetworkGatewayName\",\r\n  \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-local-gateway/providers/Microsoft.Network/localNetworkGateways/localNetworkGatewayName\",\r\n  \"etag\": \"W/\\\"f0f76530-ac0a-4163-8215-cbb28edc5df4\\\"\",\r\n  \"type\": \"Microsoft.Network/localNetworkGateways\",\r\n  \"location\": \"westus\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"resourceGuid\": \"ed99d34e-0a34-4c8b-8e6b-423f495a748a\",\r\n    \"localNetworkAddressSpace\": {\r\n      \"addressPrefixes\": [\r\n        \"10.0.0.0/8\"\r\n      ]\r\n    },\r\n    \"gatewayIpAddress\": \"10.0.0.42\",\r\n    \"bgpSettings\": {\r\n      \"asn\": 125,\r\n      \"bgpPeeringAddress\": \"11.0.0.11\",\r\n      \"peerWeight\": 15\r\n    }\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '731',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  etag: 'W/"f0f76530-ac0a-4163-8215-cbb28edc5df4"',
  'x-ms-request-id': '2b7f82c5-7e87-4c4b-8748-0a0dcd85c5b6',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14871',
  'x-ms-correlation-request-id': 'cc7a9cb3-32ba-4680-954b-93a0f53e17df',
  'x-ms-routing-request-id': 'WESTEUROPE:20170602T144111Z:cc7a9cb3-32ba-4680-954b-93a0f53e17df',
  date: 'Fri, 02 Jun 2017 14:41:10 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-local-gateway/providers/Microsoft.Network/localNetworkGateways/localNetworkGatewayName?api-version=2017-06-01')
  .reply(200, "{\r\n  \"name\": \"localNetworkGatewayName\",\r\n  \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-local-gateway/providers/Microsoft.Network/localNetworkGateways/localNetworkGatewayName\",\r\n  \"etag\": \"W/\\\"f0f76530-ac0a-4163-8215-cbb28edc5df4\\\"\",\r\n  \"type\": \"Microsoft.Network/localNetworkGateways\",\r\n  \"location\": \"westus\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"resourceGuid\": \"ed99d34e-0a34-4c8b-8e6b-423f495a748a\",\r\n    \"localNetworkAddressSpace\": {\r\n      \"addressPrefixes\": [\r\n        \"10.0.0.0/8\"\r\n      ]\r\n    },\r\n    \"gatewayIpAddress\": \"10.0.0.42\",\r\n    \"bgpSettings\": {\r\n      \"asn\": 125,\r\n      \"bgpPeeringAddress\": \"11.0.0.11\",\r\n      \"peerWeight\": 15\r\n    }\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '731',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  etag: 'W/"f0f76530-ac0a-4163-8215-cbb28edc5df4"',
  'x-ms-request-id': '2b7f82c5-7e87-4c4b-8748-0a0dcd85c5b6',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14871',
  'x-ms-correlation-request-id': 'cc7a9cb3-32ba-4680-954b-93a0f53e17df',
  'x-ms-routing-request-id': 'WESTEUROPE:20170602T144111Z:cc7a9cb3-32ba-4680-954b-93a0f53e17df',
  date: 'Fri, 02 Jun 2017 14:41:10 GMT',
  connection: 'close' });
 return result; }]];
