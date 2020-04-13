// Imports
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

// Declare local variables
const sns = new AWS.SNS();
const type = 'sms';
const endpoint = '2348064286205';
const topicArn = 'arn:aws:sns:us-east-1:188714396569:hamster-topic';

createSubscription(type, topicArn, endpoint).then((data) => console.log(data));

function createSubscription(type, topicArn, endpoint) {
  const params = {
    Protocol: type,
    TopicArn: topicArn,
    Endpoint: endpoint,
  };

  return new Promise((resolve, reject) => {
    sns.subscribe(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
