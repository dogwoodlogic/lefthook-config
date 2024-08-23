// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  extends: [
    'digitalbazaar',
    'digitalbazaar/jsdoc'
  ],
  env: {
    node: true
  },
  ignorePatterns: ['node_modules/', 'bin/'],
  rules: {
    'unicorn/prefer-node-protocol': 'error'
  },
  plugins: [
    'unicorn'
  ],
};

