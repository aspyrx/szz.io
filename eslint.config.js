import pluginJs from '@eslint/js';
import pluginStylistic from '@stylistic/eslint-plugin';
import pluginJsdoc from 'eslint-plugin-jsdoc';
import pluginReact from '@eslint-react/eslint-plugin';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    pluginJs.configs.recommended,
    pluginJsdoc.configs['flat/recommended-error'],
    pluginStylistic.configs.customize({
        indent: 4,
        semi: true,
        arrowParens: true,
        braceStyle: '1tbs',
    }),
    {
        files: ['*.js', 'lib/**'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    }, {
        files: ['src/**', 'lib/**'],
        extends: [
            pluginReact.configs.recommended,
        ],
        languageOptions: {
            globals: {
                ...globals.browser,
                __webpack_public_path__: 'readonly',
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
    },
]);
