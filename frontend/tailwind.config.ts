import type { Config } from 'tailwindcss'

export default {
    content: [
        './src/**/*.html',

        './src/**/*.js',
        './src/**/*.jsx',

        './src/**/*.ts',
        './src/**/*.tsx',
    ],
    darkMode: 'selector',
    theme: {
        extend: {
            fontFamily: {
                sans: 'JetBrains Mono',
            },

            boxShadow: {
                shadow: '0px 8px 8px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.03), inset 0px 1px 0px rgba(255, 255, 255, 0.03)',
            },
        },
    },
    plugins: [],
} satisfies Config;

