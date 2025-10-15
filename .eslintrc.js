module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
  },
  overrides: [
    {
      files: ['apps/web/**/*'],
      extends: [
        'eslint:recommended',
        '@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
      ],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      plugins: ['vue', '@typescript-eslint'],
      rules: {
        'vue/multi-word-component-names': 'off',
        'vue/no-v-html': 'warn',
      },
    },
    {
      files: ['apps/api/**/*'],
      rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
      },
    },
  ],
};
