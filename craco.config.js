const CracoLessPlugin = require('craco-less');
const WorkerLoaderPlugin = require('craco-worker-loader');

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
    {
      plugin: WorkerLoaderPlugin,
    },
  ],
  babel: {
    plugins: ['@babel/plugin-proposal-nullish-coalescing-operator'],
  },
};
