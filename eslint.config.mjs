import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/*/*'],
              message:
                'Import a feature only through its public API: "@/features/<name>".',
            },
            {
              group: ['@supabase/*'],
              message:
                'Supabase is reachable only from src/lib/supabase and feature api/ or transports/ folders.',
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      'src/lib/supabase/**',
      'src/features/*/api/**',
      'src/features/*/transports/**',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/*/*'],
              message:
                'Import a feature only through its public API: "@/features/<name>".',
            },
          ],
        },
      ],
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
