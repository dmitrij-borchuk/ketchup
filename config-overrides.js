const rewireHotLoader = require('react-app-rewire-hot-loader')
const { useBabelRc, override, enableEslintTypescript } = require('customize-cra')

const addHotReload = (config, env) => {
  const newConfig = rewireHotLoader(config, env);

  newConfig.resolve.alias = {
    ...newConfig.resolve.alias,
    'react-dom': '@hot-loader/react-dom',
  }

  return config;
}

module.exports = override(
  useBabelRc(),
  addHotReload,
  enableEslintTypescript(),
);
