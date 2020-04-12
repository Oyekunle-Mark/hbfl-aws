// Imports
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

// Declare local variables
const ec2 = new AWS.EC2();

createImage('i-061e1e4c178ac79fd', 'hamsterImage').then(() =>
  console.log('Complete'),
);

function createImage(seedInstanceId, imageName) {
  const params = {
    InstanceId: seedInstanceId,
    Name: imageName,
  };

  return new Promise((resolve, reject) => {
    ec2.createImage(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
