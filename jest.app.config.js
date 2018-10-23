module.exports = {
	preset: 'jest-preset-angular',
	setupTestFrameworkScriptFile: '<rootDir>/setup-jest.ts',
	testMatch: ['<rootDir>/src/**/*.spec.(ts|tsx|js)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageDirectory: '<rootDir>/app-coverage'
};
