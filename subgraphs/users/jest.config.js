// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  testEnvironment: 'node',
  roots: ['src'],
  testRegex: '/__tests__/.*.test.js$',
  verbose: true,
};

module.exports = config;