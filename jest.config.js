const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/__tests__/testUtils.ts",
    "<rootDir>/__tests__/mockAutoSizer",
  ],
};

module.exports = createJestConfig(customJestConfig);
