import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],

  moduleNameMapper: {
    "^@repositories$": "<rootDir>/src/modules/tasks/repositories/index.ts",
    "^@interfaces$": "<rootDir>/src/modules/tasks/repositories/interfaces/index.ts",
    "^@controllers$": "<rootDir>/src/modules/tasks/controllers/index.ts",
    "^@use-cases$": "<rootDir>/src/modules/tasks/use-cases/index.ts",
    "^@entities$": "<rootDir>/src/modules/tasks/entities/index.ts",
    "^@types$": "<rootDir>/src/types/index.ts",
    "^@schemas$": "<rootDir>/src/modules/tasks/schemas/index.ts",
    "^@presenters$": "<rootDir>/src/modules/tasks/presenters/index.ts",
    "^@errors$": "<rootDir>/src/errors/index.ts",
    "^@middlewares$": "<rootDir>/src/middlewares/index.ts",
    "^@lib$": "<rootDir>/src/lib/index.ts",
    "^@prisma$": "<rootDir>/src/lib/prisma.ts"
  }
};

export default config;
