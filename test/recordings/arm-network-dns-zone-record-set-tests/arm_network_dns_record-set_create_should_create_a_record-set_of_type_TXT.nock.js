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
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-dns-zone-record-set5135/providers/Microsoft.Network/dnsZones/exampledns.com/TXT/set-txt?api-version=2017-09-01', '*')
  .reply(201, "{\"id\":\"\\/subscriptions\\/947d47b4-7883-4bb9-9d85-c5e8e2f572ce\\/resourceGroups\\/xplat-test-dns-zone-record-set5135\\/providers\\/Microsoft.Network\\/dnszones\\/exampledns.com\\/TXT\\/set-txt\",\"name\":\"set-txt\",\"type\":\"Microsoft.Network\\/dnszones\\/TXT\",\"etag\":\"02bd884c-9562-4b6d-b10b-76aa78851eae\",\"properties\":{\"metadata\":{\"tag1\":\"aaa\",\"tag2\":\"bbb\"},\"fqdn\":\"set-txt.exampledns.com.\",\"TTL\":3600,\"TXTRecords\":[]}}", { 'cache-control': 'private',
  'content-length': '403',
  'content-type': 'application/json; charset=utf-8',
  etag: '02bd884c-9562-4b6d-b10b-76aa78851eae',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': 'd940feb1-fb30-4994-aca7-6a3a73061b90',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11999',
  'x-ms-correlation-request-id': 'a53e3901-878d-4881-98c9-dc750ffb2d28',
  'x-ms-routing-request-id': 'WESTEUROPE:20171031T084702Z:a53e3901-878d-4881-98c9-dc750ffb2d28',
  date: 'Tue, 31 Oct 2017 08:47:01 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/947d47b4-7883-4bb9-9d85-c5e8e2f572ce/resourceGroups/xplat-test-dns-zone-record-set5135/providers/Microsoft.Network/dnsZones/exampledns.com/TXT/set-txt?api-version=2017-09-01', '*')
  .reply(201, "{\"id\":\"\\/subscriptions\\/947d47b4-7883-4bb9-9d85-c5e8e2f572ce\\/resourceGroups\\/xplat-test-dns-zone-record-set5135\\/providers\\/Microsoft.Network\\/dnszones\\/exampledns.com\\/TXT\\/set-txt\",\"name\":\"set-txt\",\"type\":\"Microsoft.Network\\/dnszones\\/TXT\",\"etag\":\"02bd884c-9562-4b6d-b10b-76aa78851eae\",\"properties\":{\"metadata\":{\"tag1\":\"aaa\",\"tag2\":\"bbb\"},\"fqdn\":\"set-txt.exampledns.com.\",\"TTL\":3600,\"TXTRecords\":[]}}", { 'cache-control': 'private',
  'content-length': '403',
  'content-type': 'application/json; charset=utf-8',
  etag: '02bd884c-9562-4b6d-b10b-76aa78851eae',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': 'd940feb1-fb30-4994-aca7-6a3a73061b90',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11999',
  'x-ms-correlation-request-id': 'a53e3901-878d-4881-98c9-dc750ffb2d28',
  'x-ms-routing-request-id': 'WESTEUROPE:20171031T084702Z:a53e3901-878d-4881-98c9-dc750ffb2d28',
  date: 'Tue, 31 Oct 2017 08:47:01 GMT',
  connection: 'close' });
 return result; }]];