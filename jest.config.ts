import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    "^@repositories$": "<rootDir>/src/repositories/index.ts",
    "^@interfaces$": "<rootDir>/src/repositories/interfaces/index.ts",
    "^@controllers$": "<rootDir>/src/controllers/index.ts",
    "^@use-cases$": "<rootDir>/src/use-cases/index.ts",
    "^@entities$": "<rootDir>/src/entities/index.ts",
    "^@types$": "<rootDir>/src/types/index.ts",
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};

export default config;