const environments = {};

environments.staging = {
    port: 8080,
    envName: 'staging',
    secretKey:'edqweqwe'
};

environments.production = {
    port: 5000,
    envName: 'production',
     secretKey:'wwwwwwwhh'
};

const currentEnvironment = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

const environmentToExport = typeof environments[currentEnvironment] === 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;