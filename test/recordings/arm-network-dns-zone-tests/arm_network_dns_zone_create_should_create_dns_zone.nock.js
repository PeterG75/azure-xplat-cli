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
  process.env['AZURE_VM_TEST_LOCATION'] = 'southeastasia';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourcegroups/xplat-test-dns-zone?api-version=2016-09-01')
  .reply(404, "{\"error\":{\"code\":\"ResourceGroupNotFound\",\"message\":\"Resource group 'xplat-test-dns-zone' could not be found.\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-failure-cause': 'gateway',
  'x-ms-ratelimit-remaining-subscription-reads': '14999',
  'x-ms-request-id': '6509401c-38fe-444f-b468-d5ac6f5d158d',
  'x-ms-correlation-request-id': '6509401c-38fe-444f-b468-d5ac6f5d158d',
  'x-ms-routing-request-id': 'WESTEUROPE:20171031T084231Z:6509401c-38fe-444f-b468-d5ac6f5d158d',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Tue, 31 Oct 2017 08:42:30 GMT',
  connection: 'close',
  'content-length': '111' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourcegroups/xplat-test-dns-zone?api-version=2016-09-01')
  .reply(404, "{\"error\":{\"code\":\"ResourceGroupNotFound\",\"message\":\"Resource group 'xplat-test-dns-zone' could not be found.\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-failure-cause': 'gateway',
  'x-ms-ratelimit-remaining-subscription-reads': '14999',
  'x-ms-request-id': '6509401c-38fe-444f-b468-d5ac6f5d158d',
  'x-ms-correlation-request-id': '6509401c-38fe-444f-b468-d5ac6f5d158d',
  'x-ms-routing-request-id': 'WESTEUROPE:20171031T084231Z:6509401c-38fe-444f-b468-d5ac6f5d158d',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Tue, 31 Oct 2017 08:42:30 GMT',
  connection: 'close',
  'content-length': '111' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourcegroups/xplat-test-dns-zone?api-version=2016-09-01', '*')
  .reply(201, "{\"id\":\"/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-dns-zone\",\"name\":\"xplat-test-dns-zone\",\"location\":\"southeastasia\",\"tags\":{},\"properties\":{\"provisioningState\":\"Succeeded\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '208',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-ratelimit-remaining-subscription-writes': '1199',
  'x-ms-request-id': '4f28e5d0-d792-4ba3-9375-26cb40c66a5f',
  'x-ms-correlation-request-id': '4f28e5d0-d792-4ba3-9375-26cb40c66a5f',
  'x-ms-routing-request-id': 'WESTEUROPE:20171031T084235Z:4f28e5d0-d792-4ba3-9375-26cb40c66a5f',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Tue, 31 Oct 2017 08:42:35 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourcegroups/xplat-test-dns-zone?api-version=2016-09-01', '*')
  .reply(201, "{\"id\":\"/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-dns-zone\",\"name\":\"xplat-test-dns-zone\",\"location\":\"southeastasia\",\"tags\":{},\"properties\":{\"provisioningState\":\"Succeeded\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '208',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-ratelimit-remaining-subscription-writes': '1199',
  'x-ms-request-id': '4f28e5d0-d792-4ba3-9375-26cb40c66a5f',
  'x-ms-correlation-request-id': '4f28e5d0-d792-4ba3-9375-26cb40c66a5f',
  'x-ms-routing-request-id': 'WESTEUROPE:20171031T084235Z:4f28e5d0-d792-4ba3-9375-26cb40c66a5f',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Tue, 31 Oct 2017 08:42:35 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-dns-zone/providers/Microsoft.Network/dnsZones/exampledns.com?api-version=2017-09-01', '*')
  .reply(201, "{\"id\":\"\\/subscriptions\\/947d47b4-7883-4bb9-9d85-c5e8e2f572ce\\/resourceGroups\\/xplat-test-dns-zone\\/providers\\/Microsoft.Network\\/dnszones\\/exampledns.com\",\"name\":\"exampledns.com\",\"type\":\"Microsoft.Network\\/dnszones\",\"etag\":\"00000002-0000-0000-f592-9b352452d301\",\"location\":\"global\",\"tags\":{\"tag1\":\"aaa\",\"tag2\":\"bbb\"},\"properties\":{\"maxNumberOfRecordSets\":5000,\"nameServers\":[\"ns1-04.ppe.azure-dns.com.\",\"ns2-04.ppe.azure-dns.net.\",\"ns3-04.ppe.azure-dns.org.\",\"ns4-04.ppe.azure-dns.info.\"],\"numberOfRecordSets\":2,\"zoneType\":\"Public\"}}", { 'cache-control': 'private',
  'content-length': '533',
  'content-type': 'application/json; charset=utf-8',
  etag: '00000002-0000-0000-f592-9b352452d301',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': '26a8133d-c786-4c0b-aaa8-8e26f23a29e2',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11999',
  'x-ms-correlation-request-id': '39f92d2f-9084-4c0f-aa76-fc3ee6857f80',
  'x-ms-routing-request-id': 'WESTEUROPE:20171031T084241Z:39f92d2f-9084-4c0f-aa76-fc3ee6857f80',
  date: 'Tue, 31 Oct 2017 08:42:41 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-dns-zone/providers/Microsoft.Network/dnsZones/exampledns.com?api-version=2017-09-01', '*')
  .reply(201, "{\"id\":\"\\/subscriptions\\/947d47b4-7883-4bb9-9d85-c5e8e2f572ce\\/resourceGroups\\/xplat-test-dns-zone\\/providers\\/Microsoft.Network\\/dnszones\\/exampledns.com\",\"name\":\"exampledns.com\",\"type\":\"Microsoft.Network\\/dnszones\",\"etag\":\"00000002-0000-0000-f592-9b352452d301\",\"location\":\"global\",\"tags\":{\"tag1\":\"aaa\",\"tag2\":\"bbb\"},\"properties\":{\"maxNumberOfRecordSets\":5000,\"nameServers\":[\"ns1-04.ppe.azure-dns.com.\",\"ns2-04.ppe.azure-dns.net.\",\"ns3-04.ppe.azure-dns.org.\",\"ns4-04.ppe.azure-dns.info.\"],\"numberOfRecordSets\":2,\"zoneType\":\"Public\"}}", { 'cache-control': 'private',
  'content-length': '533',
  'content-type': 'application/json; charset=utf-8',
  etag: '00000002-0000-0000-f592-9b352452d301',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': '26a8133d-c786-4c0b-aaa8-8e26f23a29e2',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11999',
  'x-ms-correlation-request-id': '39f92d2f-9084-4c0f-aa76-fc3ee6857f80',
  'x-ms-routing-request-id': 'WESTEUROPE:20171031T084241Z:39f92d2f-9084-4c0f-aa76-fc3ee6857f80',
  date: 'Tue, 31 Oct 2017 08:42:41 GMT',
  connection: 'close' });
 return result; }]];