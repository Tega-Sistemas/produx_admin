module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/setupTests.js'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  }
};