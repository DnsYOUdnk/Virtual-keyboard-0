module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb-base/legacy",
        "eslint:recommended",
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "linebreak-style": ["off", "unix"],
        "eol-last": ["off", "always"],
    }
}
