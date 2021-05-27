module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect'
  ],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  moduleDirectories: ['node_modules', 'src']
}