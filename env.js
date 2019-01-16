let ENV;

// PRODUCTION CREDENTIALS
// Check for VCAP_SERVICES on the server
if (process.env.VCAP_SERVICES) {
  ENV = JSON.parse(process.env);
}
// LOCAL DEVELOPMENT
// Check for local credentials; log error if it fails
else {
  try {
    ENV = require('./env.json');
  } catch (e) {
    console.error(e);
  }
};

// Export our data-sources for convenience
let DATASOURCES = {
  "db": {
    "url": ENV.VCAP_SERVICES.cloudantNoSQLDB[0].credentials.url,
    "database": "cattown",
    "name": "db",
    "connector": "cloudant"
  },
  "catImage": {
    "name": "catImage",
    "connector": "loopback-component-storage",
    "provider": "amazon",
    "key": ENV.CATTOWNS3KEY,
    "keyId": ENV.CATTOWNS3KEYID
  }
};

module.exports = { ENV, DATASOURCES };
