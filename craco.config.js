const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#3F51B5' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  babel: {
    plugins: ['@babel/plugin-proposal-nullish-coalescing-operator'],
  },
};
