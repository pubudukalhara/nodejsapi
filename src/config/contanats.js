const devConfig = {
  MONGO_URL: 'mongodb://localhost/ocr-api',
  JWT_SECRET: 'thisisasecret'
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost/ocr-api'
};

const prodConfig = {
  MONGO_URL: 'mongodb://localhost/ocr-api'
};

const defaultConfig = {
  PORT: process.env.PORT || 9000,
  MODE: process.env.NODE_ENV || "development"
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
};

export default {
  ...defaultConfig,
  ...envConfig(defaultConfig.MODE)
};
