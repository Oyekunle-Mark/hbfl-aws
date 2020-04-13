// Imports
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

// Declare local variables
const apiG = new AWS.APIGateway();
const apiName = 'hamster-api';

let apiData;

createRestApi(apiName)
  .then((data) => {
    apiData = data;
    return getRootResource(apiData);
  })
  .then((rootResourceId) => createResource(rootResourceId, 'hbfl', apiData))
  .then((hbflResourceId) =>
    createResourceMethod(hbflResourceId, 'GET', apiData),
  )
  .then((hbflResourceId) =>
    createMethodIntegration(hbflResourceId, 'GET', apiData),
  )
  .then((hbflResourceId) => createResource(hbflResourceId, '{proxy+}', apiData))
  .then((proxyResourceId) =>
    createResourceMethod(proxyResourceId, 'ANY', apiData, 'proxy'),
  )
  .then((proxyResourceId) =>
    createMethodIntegration(proxyResourceId, 'ANY', apiData, 'proxy'),
  )
  .then((data) => console.log(data));

function createRestApi(apiName) {
  const params = {
    name: apiName,
  };

  return new Promise((resolve, reject) => {
    apiG.createRestApi(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function getRootResource(api) {
  const params = {
    restApiId: api.id,
  };

  return new Promise((resolve, reject) => {
    apiG.getRootResources(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const rootResource = data.Items.find((r) => r.path === '/');
        resolve(rootResource.id);
      }
    });
  });
}

function createResource(parentResourceId, resourcePath, api) {
  const params = {
    parentId: parentResourceId,
    pathPath: resourcePath,
    restApiId: api.id,
  };

  return new Promise((resolve, reject) => {
    apiG.createResource(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.id);
      }
    });
  });
}

function createResourceMethod(resourceId, method, api, path) {
  const params = {
    authorizationType: 'NONE',
    httpMethod: method,
    resourceId: resourceId,
    restApiId: api.id,
  };

  return new Promise((resolve, reject) => {
    apiG.putMethod(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(resourceId);
      }
    });
  });
}

function createMethodIntegration(resourceId, method, api, path) {
  // TODO: Create params const

  return new Promise((resolve, reject) => {
    // TODO: Put the integration and return the resourceId argument
  });
}
