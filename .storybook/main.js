/** @format */

module.exports = {
    stories: ['../stories/**/*.story.tsx'],
    addons: [
        '@storybook/addon-notes/register',
        '@storybook/addon-knobs/register',
        '@storybook/addon-actions/register',
        '@storybook/addon-options/register'
    ],

    typescript: {
        check: false,
        checkOptions: {},
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: prop =>
                prop.parent ? !/node_modules/.test(prop.parent.fileName) : true
        }
    },

    webpackFinal: async config => {
        // do mutation to the config
        config.module.rules.push({
            test: /\.md?$/,
            loader: 'markdown-loader'
        });

        config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx', '.md'];
        config.resolve.enforceExtension = false;

        config.performance.hints = false;

        return config;
    }
};
