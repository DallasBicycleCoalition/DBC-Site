import js from '@eslint/js';

const commonGlobals = {
  console: 'readonly',
  process: 'readonly',
  URL: 'readonly',
  URLSearchParams: 'readonly',
};

export default [
  {
    ignores: ['.astro/**', 'dist/**', 'node_modules/**', 'sanity.types.ts', 'schema.json'],
  },
  {
    files: ['**/*.{js,mjs}'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: commonGlobals,
    },
  },
  {
    files: ['**/*.cjs'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...commonGlobals,
        module: 'readonly',
        require: 'readonly',
      },
    },
  },
];
