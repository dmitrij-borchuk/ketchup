module.exports = {
  setupTestFrameworkScriptFile: './client/testsSetup.js',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/client/**.{js,jsx}',
    '!**/.storybook/**',
    '!**/client/stories/**',
    '!**/client/index.jsx',
  ],
  moduleNameMapper: {
    '\\.(css|png|webmanifest|svg|mp3)$': 'identity-obj-proxy',
  },
};
