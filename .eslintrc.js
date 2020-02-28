module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-vars': 'off',
    'linebreak-style': ['error', 'windows'],
    'max-len': ['error', { code: 120, tabWidth: 2 }],
    'object-curly-newline': 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'only-multiline',
        objects: 'only-multiline',
        imports: 'only-multiline',
        exports: 'only-multiline',
        functions: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
  },
};
