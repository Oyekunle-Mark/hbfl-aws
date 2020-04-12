// Imports
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

// Declare local variables
const ec2 = new AWS.EC2();

function listInstances() {
  return new Promise((resolve, reject) => {
    ec2.describeInstances({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function terminateInstance(instanceId) {
  // TODO: Terminate an instance with a given instanceId
}

listInstances().then((data) => console.log(data));
// terminateInstance()
// .then(data => console.log(data))
