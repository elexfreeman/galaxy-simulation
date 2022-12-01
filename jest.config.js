export default {
  testEnvironment: 'jest-environment-jsdom',
  clearMocks: true,
  // setupFilesAfterEnv: ['<rootDir>/tests/unit/testSetup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/tests/e2e/'],
  transform: {},
  globals: {},
  moduleNameMapper: {
    '@/(.*?)(|\\?raw)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: ['src/**', '!src/.*'],
};
