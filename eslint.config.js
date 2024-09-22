// eslint.config.js

import {FlatCompat} from '@eslint/eslintrc'
import js from '@eslint/js'
import path from 'path'
import {fileURLToPath} from 'url'

// Import ESLint plugins and configurations
import reactPlugin from 'eslint-plugin-react'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create an instance of FlatCompat for compatibility
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended, // Include the recommendedConfig parameter
})

export default [
  // Compatibility layer for extends, plugins, and parserOptions
  ...compat.extends(
    // 'eslint:recommended',
    // Removed 'eslint:recommended' as it's included in recommendedConfig
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ),

  // Custom configurations for TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
    },
  },

  // Custom configurations for JavaScript files
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },

  // Prettier integration
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': ['error', {endOfLine: 'auto'}],
      'no-console': 'warn',
      'no-debugger': 'warn',
    },
  },

  // React version detection
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Ignored files and directories
  {
    ignores: ['node_modules', 'dist'],
  },
]
