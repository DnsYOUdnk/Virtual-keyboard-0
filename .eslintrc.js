module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    'airbnb-base/legacy',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'object-curly-spacing': ['error', 'always'],
    'no-plusplus': 'off',
    'no-console': 'warn',
    'max-len': ['warn', { code: 202 }],
    'no-unused-vars': 'warn',
    'func-names': 'off',
    'no-process-exit': 'off',
    'object-shorthand': 'off',
    'class-methods-use-this': 'off',
    'linebreak-style': ['error', 'windows']
  }
};
