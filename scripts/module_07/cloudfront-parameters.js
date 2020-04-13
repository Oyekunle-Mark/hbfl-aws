function origins(bucketName) {
  return {
    Quantity: 1,
    Items: [
      {
        Domain: `${bucketName}.s3.amazonaws.com`,
        Id: `${bucketName}_origin`,
        S3OriginConfig: {
          OriginAccessIdentity: '',
        },
      },
    ],
  };
}
function defaultCacheBehavior(bucketName) {
  return {
    // TODO: Add properties for DefaultCacheBehavior
  };
}

module.exports = {
  origins,
  defaultCacheBehavior,
};
