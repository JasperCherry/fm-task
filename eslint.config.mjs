import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
    {
        files: ['**/*.js'],
        languageOptions: {
            sourceType: 'commonjs',
            globals: {
                ...globals.node,
                ...globals.jest,
            },
        },
    },
    pluginJs.configs.recommended,
    {
        rules: {
            semi: ['error', 'always'],
            indent: ['error', 4],
            'no-multiple-empty-lines': ['error', { max: 2 }],
            quotes: ['error', 'single', { avoidEscape: true }],
        },
    },
];
