module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "func-names": 0,
        "linebreak-style": 0,
        "quotes": ["error", "backtick"],
        "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
        "no-restricted-syntax": 0,
        "no-underscore-dangle": 0,
        "no-await-in-loop": 0
    }
};