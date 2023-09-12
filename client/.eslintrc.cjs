module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "./client/tsconfig.json"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "array-bracket-spacing": "off",
        'space-before-function-paren': 'off',
        "indent": "off",
        "@typescript-eslint/indent": "off",
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off"
    }
}
