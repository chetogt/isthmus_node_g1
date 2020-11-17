module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'node'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json'
    }
  },
  testMatch: ['**/__tests__/*.+(ts|tsx|js)', '**/__tests__/**/*.+(ts|tsx|js)']
}