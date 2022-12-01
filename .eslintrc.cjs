module.exports = {
  plugins: ['prettier', 'i18n', 'jest'],
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  extends: ['standard', 'prettier', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
    curly: ['error', 'all'],
    'import/no-webpack-loader-syntax': 'off',
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: true,
        allowBlockStart: true,
        allowObjectStart: true,
        allowArrayStart: true,
      },
    ],
    'comma-dangle': ['error', 'always-multiline'],
    'max-len': ['error', { code: 120, ignoreUrls: true, ignoreComments: true }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-mixed-operators': 'error',
    'no-unexpected-multiline': 'error',
    'no-var': 'error',
    'no-unsafe-optional-chaining': 'error',
    'i18n/no-russian-character': 'error',
    'no-debugger': 'error',
    'no-nested-ternary': 'error',
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true,
      },
    },
  ],
};
