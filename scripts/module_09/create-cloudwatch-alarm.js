// Imports
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

// Declare local variables
const cw = new AWS.CloudWatch();
const alarmName = 'hamster-elb-alarm';
const topicArn = 'arn:aws:sns:us-east-1:188714396569:hamster-topic';
const tg = 'targetgroup/hamsterTG/5c854a8a6e5ab2e7';
const lb = 'app/hamsterELB/61bec14f4457bfb1';

createCloudWatchAlarm(alarmName, topicArn, tg, lb).then((data) =>
  console.log(data),
);

function createCloudWatchAlarm(alarmName, topicArn, tg, lb) {
  const params = {
    AlarmName: alarmName,
    ComparisonOperator: 'LessThanThreshold',
    EvaluationPeriods: 1,
    MetricName: 'HealthyHostCount',
    Namespace: 'AWS/Application/ELB',
    Period: 60,
    Threshold: 1,
    AlarmActions: [topicArn],
    Dimensions: [
      { Name: 'TargetGroup', Value: tg },
      { Name: 'LoadBalancer', Value: lb },
    ],
    Statistic: 'Average',
    TreatMissingData: 'breaching',
  };

  return new Promise((resolve, reject) => {
    cw.putMetricAlarm(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
