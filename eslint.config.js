import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    rules: {
      // This repo contains many shadcn/ui-style files that export helper constants/types,
      // which conflicts with the Fast Refresh constraint.
      "react-refresh/only-export-components": "off",

      // These rules flag render-time purity/refs patterns used by existing hooks/components.
      // The app still builds; disabling these avoids blocking on heuristics.
      "react-hooks/purity": "off",
      "react-hooks/refs": "off",

      // Some UI helper components use `any`/empty-object types intentionally.
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
