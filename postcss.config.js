/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: [
        require('autoprefixer'),
        require('postcss-nesting'),
        require('postcss-custom-media'),
        require('postcss-jit-props'),
    ]
}

module.exports = config
