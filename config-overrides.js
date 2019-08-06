module.exports = function override(config, env) {
  const { rules } = config.module;
  rules.push({
    test: /\.(webmanifest|mp3)$/i,
    use: {
      loader: 'file-loader',
    },
  });

  return config;
}
