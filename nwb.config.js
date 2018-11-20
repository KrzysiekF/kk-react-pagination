module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'KKReactPagination',
      externals: {
        react: 'React',
      },
    },
  },
  karma: {
    // browsers: ['Chrome'],
  },
};
