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
  .reply(200, "{\"id\":\"\\/subscriptions\\/947d47b4-7883-4bb9-9d85-c5e8e2f572ce\\/resourceGroups\\/xplat-test-dns-zone-record-set5135\\/providers\\/Microsoft.Network\\/dnszones\\/exampledns.com\",\"name\":\"exampledns.com\",\"type\":\"Microsoft.Network\\/dnszones\",\"etag\":\"00000002-0000-0000-df38-1e9b2452d301\",\"location\":\"global\",\"tags\":{\"tag1\":\"aaa\",\"tag2\":\"bbb\"},\"properties\":{\"maxNumberOfRecordSets\":5000,\"nameServers\":[\"ns1-01.ppe.azure-dns.com.\",\"ns2-01.ppe.azure-dns.net.\",\"ns3-01.ppe.azure-dns.org.\",\"ns4-01.ppe.azure-dns.info.\"],\"numberOfRecordSets\":3}}", { 'cache-control': 'private',
  'content-length': '528',
  'content-type': 'application/json; charset=utf-8',
  etag: '00000002-0000-0000-df38-1e9b2452d301',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': '55392443-553b-4531-9288-fb9a3feb3815',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11998',
  'x-ms-correlation-request-id': 'd9a45ee2-4308-4606-9da6-e962345ee5bc',
  'x-ms-routing-request-id': 'WESTEUROPE:20171031T084558Z:d9a45ee2-4308-4606-9da6-e962345ee5bc',
  date: 'Tue, 31 Oct 2017 08:45:58 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-dns-zone-record-set5135/providers/Microsoft.Network/dnsZones/exampledns.com?api-version=2017-09-01')
  .reply(200, "{\"id\":\"\\/subscriptions\\/947d47b4-7883-4bb9-9d85-c5e8e2f572ce\\/resourceGroups\\/xplat-test-dns-zone-record-set5135\\/providers\\/Microsoft.Network\\/dnszones\\/exampledns.com\",\"name\":\"exampledns.com\",\"type\":\"Microsoft.Network\\/dnszones\",\"etag\":\"00000002-0000-0000-df38-1e9b2452d301\",\"location\":\"global\",\"tags\":{\"tag1\":\"aaa\",\"tag2\":\"bbb\"},\"properties\":{\"maxNumberOfRecordSets\":5000,\"nameServers\":[\"ns1-01.ppe.azure-dns.com.\",\"ns2-01.ppe.azure-dns.net.\",\"ns3-01.ppe.azure-dns.org.\",\"ns4-01.ppe.azure-dns.info.\"],\"numberOfRecordSets\":3}}", { 'cache-control': 'private',
  'content-length': '528',
  'content-type': 'application/json; charset=utf-8',
  etag: '00000002-0000-0000-df38-1e9b2452d301',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': '55392443-553b-4531-9288-fb9a3feb3815',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11998',
  'x-ms-correlation-request-id': 'd9a45ee2-4308-4606-9da6-e962345ee5bc',
  'x-ms-routing-request-id': 'WESTEUROPE:20171031T084558Z:d9a45ee2-4308-4606-9da6-e962345ee5bc',
  date: 'Tue, 31 Oct 2017 08:45:58 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-dns-zone-record-set5135/providers/Microsoft.Network/dnsZones/exampledns.com/AAAA/set-aaaa?api-version=2017-09-01')
  .reply(200, "{\"id\":\"\\/subscriptions\\/947d47b4-7883-4bb9-9d85-c5e8e2f572ce\\/resourceGroups\\/xplat-test-dns-zone-record-set5135\\/providers\\/Microsoft.Network\\/dnszones\\/exampledns.com\\/AAAA\\/set-aaaa\",\"name\":\"set-aaaa\",\"type\":\"Microsoft.Network\\/dnszones\\/AAAA\",\"etag\":\"51f43c7c-0ffe-468b-abcb-947baa8f6914\",\"properties\":{\"metadata\":{\"tag1\":\"aaa\",\"tag2\":\"bbb\"},\"fqdn\":\"set-aaaa.exampledns.com.\",\"TTL\":3600,\"AAAARecords\":[{\"ipv6Address\":\"2001:cafe:130::100\"}]}}", { 'cache-control': 'private',
  'content-length': '445',
  'content-type': 'application/json; charset=utf-8',
  etag: '51f43c7c-0ffe-468b-abcb-947baa8f6914',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': '6e59ab0e-97ea-4e20-b6c2-fb970079cac5',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11999',
  'x-ms-correlation-request-id': '75700c90-b764-4529-908b-fad4ba0056ef',
  'x-ms-routing-request-id': 'WESTEUROPE:20171031T084559Z:75700c90-b764-4529-908b-fad4ba0056ef',
  date: 'Tue, 31 Oct 2017 08:45:59 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-dns-zone-record-set5135/providers/Microsoft.Network/dnsZones/exampledns.com/AAAA/set-aaaa?api-version=2017-09-01')
  .reply(200, "{\"id\":\"\\/subscriptions\\/947d47b4-7883-4bb9-9d85-c5e8e2f572ce\\/resourceGroups\\/xplat-test-dns-zone-record-set5135\\/providers\\/Microsoft.Network\\/dnszones\\/exampledns.com\\/AAAA\\/set-aaaa\",\"name\":\"set-aaaa\",\"type\":\"Microsoft.Network\\/dnszones\\/AAAA\",\"etag\":\"51f43c7c-0ffe-468b-abcb-947baa8f6914\",\"properties\":{\"metadata\":{\"tag1\":\"aaa\",\"tag2\":\"bbb\"},\"fqdn\":\"set-aaaa.exampledns.com.\",\"TTL\":3600,\"AAAARecords\":[{\"ipv6Address\":\"2001:cafe:130::100\"}]}}", { 'cache-control': 'private',
  'content-length': '445',
  'content-type': 'application/json; charset=utf-8',
  etag: '51f43c7c-0ffe-468b-abcb-947baa8f6914',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': '6e59ab0e-97ea-4e20-b6c2-fb970079cac5',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11999',
  'x-ms-correlation-request-id': '75700c90-b764-4529-908b-fad4ba0056ef',
  'x-ms-routing-request-id': 'WESTEUROPE:20171031T084559Z:75700c90-b764-4529-908b-fad4ba0056ef',
  date: 'Tue, 31 Oct 2017 08:45:59 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-dns-zone-record-set5135/providers/Microsoft.Network/dnsZones/exampledns.com/AAAA/set-aaaa?api-version=2017-09-01', '*')
  .reply(200, "{\"id\":\"\\/subscriptions\\/947d47b4-7883-4bb9-9d85-c5e8e2f572ce\\/resourceGroups\\/xplat-test-dns-zone-record-set5135\\/providers\\/Microsoft.Network\\/dnszones\\/exampledns.com\\/AAAA\\/set-aaaa\",\"name\":\"set-aaaa\",\"type\":\"Microsoft.Network\\/dnszones\\/AAAA\",\"etag\":\"995b5555-d308-430a-9845-73d65e43fd68\",\"properties\":{\"metadata\":{\"tag1\":\"aaa\",\"tag2\":\"bbb\"},\"fqdn\":\"set-aaaa.exampledns.com.\",\"TTL\":3600,\"AAAARecords\":[]}}", { 'cache-control': 'private',
  'content-length': '409',
  'content-type': 'application/json; charset=utf-8',
  etag: '995b5555-d308-430a-9845-73d65e43fd68',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': 'd323e534-7074-4aa3-8a85-ae1325df5ca9',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11999',
  'x-ms-correlation-request-id': '569d8c28-8840-4de1-a937-83ea5f275e5d',
  'x-ms-routing-request-id': 'WESTEUROPE:20171031T084600Z:569d8c28-8840-4de1-a937-83ea5f275e5d',
  date: 'Tue, 31 Oct 2017 08:46:00 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-dns-zone-record-set5135/providers/Microsoft.Network/dnsZones/exampledns.com/AAAA/set-aaaa?api-version=2017-09-01', '*')
  .reply(200, "{\"id\":\"\\/subscriptions\\/947d47b4-7883-4bb9-9d85-c5e8e2f572ce\\/resourceGroups\\/xplat-test-dns-zone-record-set5135\\/providers\\/Microsoft.Network\\/dnszones\\/exampledns.com\\/AAAA\\/set-aaaa\",\"name\":\"set-aaaa\",\"type\":\"Microsoft.Network\\/dnszones\\/AAAA\",\"etag\":\"995b5555-d308-430a-9845-73d65e43fd68\",\"properties\":{\"metadata\":{\"tag1\":\"aaa\",\"tag2\":\"bbb\"},\"fqdn\":\"set-aaaa.exampledns.com.\",\"TTL\":3600,\"AAAARecords\":[]}}", { 'cache-control': 'private',
  'content-length': '409',
  'content-type': 'application/json; charset=utf-8',
  etag: '995b5555-d308-430a-9845-73d65e43fd68',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': 'd323e534-7074-4aa3-8a85-ae1325df5ca9',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11999',
  'x-ms-correlation-request-id': '569d8c28-8840-4de1-a937-83ea5f275e5d',
  'x-ms-routing-request-id': 'WESTEUROPE:20171031T084600Z:569d8c28-8840-4de1-a937-83ea5f275e5d',
  date: 'Tue, 31 Oct 2017 08:46:00 GMT',
  connection: 'close' });
 return result; }]];