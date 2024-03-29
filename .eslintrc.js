module.exports = {
    env: {
        es6: true,
        jquery: true,
        browser: true
    },
    extends: [
        'eslint:recommended'
    ],
    rules: {
        quotes: ["error", "single"]
    },
    parserOptions: {
      ecmaVersion: 8
    }
}
