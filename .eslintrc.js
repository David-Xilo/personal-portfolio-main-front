module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
    'react/react-in-jsx-scope': 'off', // Not needed for React 17+
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-console': 'warn',
    'no-debugger': 'warn',
    'react/prop-types': 'off',
    'react/display-name': 'off', // Disable the rule causing the error
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
