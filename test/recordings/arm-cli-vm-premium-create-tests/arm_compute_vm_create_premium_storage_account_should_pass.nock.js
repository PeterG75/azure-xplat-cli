// This file has been autogenerated.

var profile = require('../../../lib/util/profile');

exports.getMockedProfile = function () {
  var newProfile = new profile.Profile();

  newProfile.addSubscription(new profile.Subscription({
    id: 'e33f361b-53c2-4cc7-b829-78906708387b',
    name: 'Microsoft Azure Internal Consumption',
    user: {
      name: 'user@domain.example',
      type: 'servicePrincipal'
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
  process.env['SSHCERT'] = 'test/myCert.pem';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/resourcegroups/xplatTestZVMCreate3752?api-version=2016-09-01')
  .reply(404, "{\"error\":{\"code\":\"ResourceGroupNotFound\",\"message\":\"Resource group 'xplatTestZVMCreate3752' could not be found.\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-failure-cause': 'gateway',
  'x-ms-ratelimit-remaining-subscription-reads': '14993',
  'x-ms-request-id': 'fb8e32a0-9127-49d9-abd5-3edb6f7509aa',
  'x-ms-correlation-request-id': 'fb8e32a0-9127-49d9-abd5-3edb6f7509aa',
  'x-ms-routing-request-id': 'WESTUS:20170602T172223Z:fb8e32a0-9127-49d9-abd5-3edb6f7509aa',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Fri, 02 Jun 2017 17:22:22 GMT',
  connection: 'close',
  'content-length': '114' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/resourcegroups/xplatTestZVMCreate3752?api-version=2016-09-01')
  .reply(404, "{\"error\":{\"code\":\"ResourceGroupNotFound\",\"message\":\"Resource group 'xplatTestZVMCreate3752' could not be found.\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-failure-cause': 'gateway',
  'x-ms-ratelimit-remaining-subscription-reads': '14993',
  'x-ms-request-id': 'fb8e32a0-9127-49d9-abd5-3edb6f7509aa',
  'x-ms-correlation-request-id': 'fb8e32a0-9127-49d9-abd5-3edb6f7509aa',
  'x-ms-routing-request-id': 'WESTUS:20170602T172223Z:fb8e32a0-9127-49d9-abd5-3edb6f7509aa',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Fri, 02 Jun 2017 17:22:22 GMT',
  connection: 'close',
  'content-length': '114' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/resourcegroups/xplatTestZVMCreate3752?api-version=2016-09-01', '*')
  .reply(201, "{\"id\":\"/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/resourceGroups/xplatTestZVMCreate3752\",\"name\":\"xplatTestZVMCreate3752\",\"location\":\"southeastasia\",\"tags\":{\"arm-cli-vm-premium-create-tests\":\"2017-06-02T17:22:22.403Z\"},\"properties\":{\"provisioningState\":\"Succeeded\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '274',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-ratelimit-remaining-subscription-writes': '1197',
  'x-ms-request-id': 'd01e202a-13b1-4a5e-93ac-fd58e4549751',
  'x-ms-correlation-request-id': 'd01e202a-13b1-4a5e-93ac-fd58e4549751',
  'x-ms-routing-request-id': 'WESTUS:20170602T172225Z:d01e202a-13b1-4a5e-93ac-fd58e4549751',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Fri, 02 Jun 2017 17:22:24 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/resourcegroups/xplatTestZVMCreate3752?api-version=2016-09-01', '*')
  .reply(201, "{\"id\":\"/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/resourceGroups/xplatTestZVMCreate3752\",\"name\":\"xplatTestZVMCreate3752\",\"location\":\"southeastasia\",\"tags\":{\"arm-cli-vm-premium-create-tests\":\"2017-06-02T17:22:22.403Z\"},\"properties\":{\"provisioningState\":\"Succeeded\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '274',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-ratelimit-remaining-subscription-writes': '1197',
  'x-ms-request-id': 'd01e202a-13b1-4a5e-93ac-fd58e4549751',
  'x-ms-correlation-request-id': 'd01e202a-13b1-4a5e-93ac-fd58e4549751',
  'x-ms-routing-request-id': 'WESTUS:20170602T172225Z:d01e202a-13b1-4a5e-93ac-fd58e4549751',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Fri, 02 Jun 2017 17:22:24 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Storage/checkNameAvailability?api-version=2016-12-01', '*')
  .reply(200, "{\"nameAvailable\":true}\n", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '23',
  'content-type': 'application/json',
  expires: '-1',
  'x-ms-request-id': '6d33aee2-e7c9-4120-9454-ee8fb7ee0c45',
  server: 'Microsoft-Azure-Storage-Resource-Provider/1.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14992',
  'x-ms-correlation-request-id': '6d33aee2-e7c9-4120-9454-ee8fb7ee0c45',
  'x-ms-routing-request-id': 'WESTUS:20170602T172226Z:6d33aee2-e7c9-4120-9454-ee8fb7ee0c45',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Fri, 02 Jun 2017 17:22:25 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Storage/checkNameAvailability?api-version=2016-12-01', '*')
  .reply(200, "{\"nameAvailable\":true}\n", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '23',
  'content-type': 'application/json',
  expires: '-1',
  'x-ms-request-id': '6d33aee2-e7c9-4120-9454-ee8fb7ee0c45',
  server: 'Microsoft-Azure-Storage-Resource-Provider/1.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14992',
  'x-ms-correlation-request-id': '6d33aee2-e7c9-4120-9454-ee8fb7ee0c45',
  'x-ms-routing-request-id': 'WESTUS:20170602T172226Z:6d33aee2-e7c9-4120-9454-ee8fb7ee0c45',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Fri, 02 Jun 2017 17:22:25 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/resourceGroups/xplatTestZVMCreate3752/providers/Microsoft.Storage/storageAccounts/xplatteststorage11328?api-version=2016-12-01', '*')
  .reply(202, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '0',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Storage/operations/10740544-bc4f-4370-992d-842edb454323?monitor=true&api-version=2016-12-01',
  'retry-after': '17',
  'x-ms-ratelimit-remaining-subscription-writes': '1195',
  'x-ms-request-id': '391186cf-e61e-4e6a-94ea-d2d22780a1f8',
  server: 'Microsoft-Azure-Storage-Resource-Provider/1.0',
  'x-ms-correlation-request-id': '391186cf-e61e-4e6a-94ea-d2d22780a1f8',
  'x-ms-routing-request-id': 'WESTUS:20170602T172229Z:391186cf-e61e-4e6a-94ea-d2d22780a1f8',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Fri, 02 Jun 2017 17:22:28 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/resourceGroups/xplatTestZVMCreate3752/providers/Microsoft.Storage/storageAccounts/xplatteststorage11328?api-version=2016-12-01', '*')
  .reply(202, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '0',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Storage/operations/10740544-bc4f-4370-992d-842edb454323?monitor=true&api-version=2016-12-01',
  'retry-after': '17',
  'x-ms-ratelimit-remaining-subscription-writes': '1195',
  'x-ms-request-id': '391186cf-e61e-4e6a-94ea-d2d22780a1f8',
  server: 'Microsoft-Azure-Storage-Resource-Provider/1.0',
  'x-ms-correlation-request-id': '391186cf-e61e-4e6a-94ea-d2d22780a1f8',
  'x-ms-routing-request-id': 'WESTUS:20170602T172229Z:391186cf-e61e-4e6a-94ea-d2d22780a1f8',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Fri, 02 Jun 2017 17:22:28 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Storage/operations/10740544-bc4f-4370-992d-842edb454323?monitor=true&api-version=2016-12-01')
  .reply(200, "{\"id\":\"/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/resourceGroups/xplattestzvmcreate3752/providers/Microsoft.Storage/storageAccounts/xplatteststorage11328\",\"kind\":\"Storage\",\"location\":\"southeastasia\",\"name\":\"xplatteststorage11328\",\"properties\":{\"creationTime\":\"2017-06-02T17:22:28.6619306Z\",\"primaryEndpoints\":{\"blob\":\"https://xplatteststorage11328.blob.core.windows.net/\"},\"primaryLocation\":\"southeastasia\",\"provisioningState\":\"Succeeded\",\"statusOfPrimary\":\"available\",\"supportsHttpsTrafficOnly\":false},\"sku\":{\"name\":\"Premium_LRS\",\"tier\":\"Premium\"},\"tags\":{},\"type\":\"Microsoft.Storage/storageAccounts\"}\n", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '612',
  'content-type': 'application/json',
  expires: '-1',
  'x-ms-request-id': '35e1361d-4f5c-4e43-87ba-6d574a8d39a7',
  server: 'Microsoft-Azure-Storage-Resource-Provider/1.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14983',
  'x-ms-correlation-request-id': '35e1361d-4f5c-4e43-87ba-6d574a8d39a7',
  'x-ms-routing-request-id': 'WESTUS2:20170602T172259Z:35e1361d-4f5c-4e43-87ba-6d574a8d39a7',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Fri, 02 Jun 2017 17:22:59 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Storage/operations/10740544-bc4f-4370-992d-842edb454323?monitor=true&api-version=2016-12-01')
  .reply(200, "{\"id\":\"/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/resourceGroups/xplattestzvmcreate3752/providers/Microsoft.Storage/storageAccounts/xplatteststorage11328\",\"kind\":\"Storage\",\"location\":\"southeastasia\",\"name\":\"xplatteststorage11328\",\"properties\":{\"creationTime\":\"2017-06-02T17:22:28.6619306Z\",\"primaryEndpoints\":{\"blob\":\"https://xplatteststorage11328.blob.core.windows.net/\"},\"primaryLocation\":\"southeastasia\",\"provisioningState\":\"Succeeded\",\"statusOfPrimary\":\"available\",\"supportsHttpsTrafficOnly\":false},\"sku\":{\"name\":\"Premium_LRS\",\"tier\":\"Premium\"},\"tags\":{},\"type\":\"Microsoft.Storage/storageAccounts\"}\n", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '612',
  'content-type': 'application/json',
  expires: '-1',
  'x-ms-request-id': '35e1361d-4f5c-4e43-87ba-6d574a8d39a7',
  server: 'Microsoft-Azure-Storage-Resource-Provider/1.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14983',
  'x-ms-correlation-request-id': '35e1361d-4f5c-4e43-87ba-6d574a8d39a7',
  'x-ms-routing-request-id': 'WESTUS2:20170602T172259Z:35e1361d-4f5c-4e43-87ba-6d574a8d39a7',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Fri, 02 Jun 2017 17:22:59 GMT',
  connection: 'close' });
 return result; }]];
