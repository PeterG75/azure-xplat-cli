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
  .get('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-dns-zone-record-set5135/providers/Microsoft.Network/dnsZones/exampledns.com?api-version=2017-09-01')
  .reply(200, "{\"id\":\"\\/subscriptions\\/947d47b4-7883-4bb9-9d85-c5e8e2f572ce\\/resourceGroups\\/xplat-test-dns-zone-record-set5135\\/providers\\/Microsoft.Network\\/dnszones\\/exampledns.com\",\"name\":\"exampledns.com\",\"type\":\"Microsoft.Network\\/dnszones\",\"etag\":\"00000002-0000-0000-df38-1e9b2452d301\",\"location\":\"global\",\"tags\":{\"tag1\":\"aaa\",\"tag2\":\"bbb\"},\"properties\":{\"maxNumberOfRecordSets\":5000,\"nameServers\":[\"ns1-01.ppe.azure-dns.com.\",\"ns2-01.ppe.azure-dns.net.\",\"ns3-01.ppe.azure-dns.org.\",\"ns4-01.ppe.azure-dns.info.\"],\"numberOfRecordSets\":4}}", { 'cache-control': 'private',
  'content-length': '528',
  'content-type': 'application/json; charset=utf-8',
  etag: '00000002-0000-0000-df38-1e9b2452d301',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': '7a38a64e-e7c0-472b-b83a-96bdae7937ae',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11998',
  'x-ms-correlation-request-id': 'b8056308-4a7e-4b47-91b4-5de0a83948c8',
  'x-ms-routing-request-id': 'WESTEUROPE:20171031T084642Z:b8056308-4a7e-4b47-91b4-5de0a83948c8',
  date: 'Tue, 31 Oct 2017 08:46:42 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-dns-zone-record-set5135/providers/Microsoft.Network/dnsZones/exampledns.com?api-version=2017-09-01')
  .reply(200, "{\"id\":\"\\/subscriptions\\/947d47b4-7883-4bb9-9d85-c5e8e2f572ce\\/resourceGroups\\/xplat-test-dns-zone-record-set5135\\/providers\\/Microsoft.Network\\/dnszones\\/exampledns.com\",\"name\":\"exampledns.com\",\"type\":\"Microsoft.Network\\/dnszones\",\"etag\":\"00000002-0000-0000-df38-1e9b2452d301\",\"location\":\"global\",\"tags\":{\"tag1\":\"aaa\",\"tag2\":\"bbb\"},\"properties\":{\"maxNumberOfRecordSets\":5000,\"nameServers\":[\"ns1-01.ppe.azure-dns.com.\",\"ns2-01.ppe.azure-dns.net.\",\"ns3-01.ppe.azure-dns.org.\",\"ns4-01.ppe.azure-dns.info.\"],\"numberOfRecordSets\":4}}", { 'cache-control': 'private',
  'content-length': '528',
  'content-type': 'application/json; charset=utf-8',
  etag: '00000002-0000-0000-df38-1e9b2452d301',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': '7a38a64e-e7c0-472b-b83a-96bdae7937ae',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11998',
  'x-ms-correlation-request-id': 'b8056308-4a7e-4b47-91b4-5de0a83948c8',
  'x-ms-routing-request-id': 'WESTEUROPE:20171031T084642Z:b8056308-4a7e-4b47-91b4-5de0a83948c8',
  date: 'Tue, 31 Oct 2017 08:46:42 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-dns-zone-record-set5135/providers/Microsoft.Network/dnsZones/exampledns.com/SRV/set-srv?api-version=2017-09-01')
  .reply(200, "{\"id\":\"\\/subscriptions\\/947d47b4-7883-4bb9-9d85-c5e8e2f572ce\\/resourceGroups\\/xplat-test-dns-zone-record-set5135\\/providers\\/Microsoft.Network\\/dnszones\\/exampledns.com\\/SRV\\/set-srv\",\"name\":\"set-srv\",\"type\":\"Microsoft.Network\\/dnszones\\/SRV\",\"etag\":\"4ca93567-1a95-48cb-946f-684d2f764b40\",\"properties\":{\"metadata\":{\"tag1\":\"aaa\",\"tag2\":\"bbb\"},\"fqdn\":\"set-srv.exampledns.com.\",\"TTL\":3600,\"SRVRecords\":[{\"port\":3,\"priority\":1,\"target\":\"target.com\",\"weight\":2}]}}", { 'cache-control': 'private',
  'content-length': '459',
  'content-type': 'application/json; charset=utf-8',
  etag: '4ca93567-1a95-48cb-946f-684d2f764b40',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': 'f5710d8c-06f6-4378-93ef-d8c3b385b3d3',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11999',
  'x-ms-correlation-request-id': '0693f9b2-a398-4192-aa49-c9a4e1b4bc72',
  'x-ms-routing-request-id': 'WESTEUROPE:20171031T084643Z:0693f9b2-a398-4192-aa49-c9a4e1b4bc72',
  date: 'Tue, 31 Oct 2017 08:46:42 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-dns-zone-record-set5135/providers/Microsoft.Network/dnsZones/exampledns.com/SRV/set-srv?api-version=2017-09-01')
  .reply(200, "{\"id\":\"\\/subscriptions\\/947d47b4-7883-4bb9-9d85-c5e8e2f572ce\\/resourceGroups\\/xplat-test-dns-zone-record-set5135\\/providers\\/Microsoft.Network\\/dnszones\\/exampledns.com\\/SRV\\/set-srv\",\"name\":\"set-srv\",\"type\":\"Microsoft.Network\\/dnszones\\/SRV\",\"etag\":\"4ca93567-1a95-48cb-946f-684d2f764b40\",\"properties\":{\"metadata\":{\"tag1\":\"aaa\",\"tag2\":\"bbb\"},\"fqdn\":\"set-srv.exampledns.com.\",\"TTL\":3600,\"SRVRecords\":[{\"port\":3,\"priority\":1,\"target\":\"target.com\",\"weight\":2}]}}", { 'cache-control': 'private',
  'content-length': '459',
  'content-type': 'application/json; charset=utf-8',
  etag: '4ca93567-1a95-48cb-946f-684d2f764b40',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': 'f5710d8c-06f6-4378-93ef-d8c3b385b3d3',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11999',
  'x-ms-correlation-request-id': '0693f9b2-a398-4192-aa49-c9a4e1b4bc72',
  'x-ms-routing-request-id': 'WESTEUROPE:20171031T084643Z:0693f9b2-a398-4192-aa49-c9a4e1b4bc72',
  date: 'Tue, 31 Oct 2017 08:46:42 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-dns-zone-record-set5135/providers/Microsoft.Network/dnsZones/exampledns.com/SRV/set-srv?api-version=2017-09-01', '*')
  .reply(200, "{\"id\":\"\\/subscriptions\\/947d47b4-7883-4bb9-9d85-c5e8e2f572ce\\/resourceGroups\\/xplat-test-dns-zone-record-set5135\\/providers\\/Microsoft.Network\\/dnszones\\/exampledns.com\\/SRV\\/set-srv\",\"name\":\"set-srv\",\"type\":\"Microsoft.Network\\/dnszones\\/SRV\",\"etag\":\"abca4da1-c715-4b0b-84e3-d7503ab14044\",\"properties\":{\"metadata\":{\"tag1\":\"aaa\",\"tag2\":\"bbb\"},\"fqdn\":\"set-srv.exampledns.com.\",\"TTL\":3600,\"SRVRecords\":[]}}", { 'cache-control': 'private',
  'content-length': '403',
  'content-type': 'application/json; charset=utf-8',
  etag: 'abca4da1-c715-4b0b-84e3-d7503ab14044',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': 'a16cacec-dc3b-44d5-a9dc-5ccc6d57969d',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11999',
  'x-ms-correlation-request-id': '42358876-4c54-4dfc-9ecb-c3097ea6b073',
  'x-ms-routing-request-id': 'WESTEUROPE:20171031T084644Z:42358876-4c54-4dfc-9ecb-c3097ea6b073',
  date: 'Tue, 31 Oct 2017 08:46:43 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-dns-zone-record-set5135/providers/Microsoft.Network/dnsZones/exampledns.com/SRV/set-srv?api-version=2017-09-01', '*')
  .reply(200, "{\"id\":\"\\/subscriptions\\/947d47b4-7883-4bb9-9d85-c5e8e2f572ce\\/resourceGroups\\/xplat-test-dns-zone-record-set5135\\/providers\\/Microsoft.Network\\/dnszones\\/exampledns.com\\/SRV\\/set-srv\",\"name\":\"set-srv\",\"type\":\"Microsoft.Network\\/dnszones\\/SRV\",\"etag\":\"abca4da1-c715-4b0b-84e3-d7503ab14044\",\"properties\":{\"metadata\":{\"tag1\":\"aaa\",\"tag2\":\"bbb\"},\"fqdn\":\"set-srv.exampledns.com.\",\"TTL\":3600,\"SRVRecords\":[]}}", { 'cache-control': 'private',
  'content-length': '403',
  'content-type': 'application/json; charset=utf-8',
  etag: 'abca4da1-c715-4b0b-84e3-d7503ab14044',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': 'a16cacec-dc3b-44d5-a9dc-5ccc6d57969d',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11999',
  'x-ms-correlation-request-id': '42358876-4c54-4dfc-9ecb-c3097ea6b073',
  'x-ms-routing-request-id': 'WESTEUROPE:20171031T084644Z:42358876-4c54-4dfc-9ecb-c3097ea6b073',
  date: 'Tue, 31 Oct 2017 08:46:43 GMT',
  connection: 'close' });
 return result; }]];