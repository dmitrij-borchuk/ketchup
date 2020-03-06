const rewireHotLoader = require('react-app-rewire-hot-loader')
const { useBabelRc, override } = require('customize-cra')

module.exports = override(
  useBabelRc(),
  (config, env) => {
    const newConfig = rewireHotLoader(config, env);

    newConfig.resolve.alias = {
      ...newConfig.resolve.alias,
      'react-dom': '@hot-loader/react-dom',
    }

    return config;
  },
);
