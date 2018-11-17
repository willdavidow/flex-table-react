module.exports = {
    parser: "babel-eslint",
    // extends: ['prettier', 'prettier/react'],
    plugins: ["import", "react"], // alternative: https://github.com/prettier/prettier-eslint
    env: {
        browser: true,
        es6: true,
        jest: true,
        mocha: true,
        node: false
    },
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            defaultParams: true,
            spread: true
        },
        sourceType: "module"
    },
    globals: {
        afterAll: true,
        afterEach: true,
        beforeAll: true,
        beforeEach: true,
        context: true,
        describe: true,
        expect: true,
        global: true,
        it: true,
        jest: true,
        module: true,
        test: true,
        window: true
    },
    rules: {
        // Base eslint settings
        allowAllPropertiesOnSameLine: false,
        "array-bracket-newline": [
            2,
            {
                multiline: true,
                minItems: 2
            }
        ],
        "array-bracket-spacing": ["error", "never"],
        "array-element-newline": [
            2,
            {
                multiline: false,
                minItems: 2
            }
        ],
        "brace-style": "error",
        "class-methods-use-this": "off",
        "comma-dangle": [
            "error",
            {
                arrays: "always-multiline",
                exports: "only-multiline",
                functions: "never",
                imports: "only-multiline",
                objects: "always-multiline"
            }
        ],
        indent: ["error", 4, { 'SwitchCase': 1 }],
        "lines-between-class-members": "error",
        "newline-per-chained-call": [
            "error",
            {
                ignoreChainWithDepth: 2
            }
        ],
        "no-unused-expressions": "off",
        "object-curly-newline": [
            "error",
            {
                ExportDeclaration: {
                    multiline: true,
                    minProperties: 1
                },
                ImportDeclaration: {
                    multiline: true,
                    minProperties: 1
                },
                ObjectExpression: {
                    multiline: true,
                    minProperties: 1
                },
                ObjectPattern: {
                    multiline: true,
                    minProperties: 1
                }
            }
        ],
        "object-curly-spacing": ["error", "always"],
        "object-property-newline": "error",
        "operator-linebreak": ["error", "before"],
        "padded-blocks": ["error", "always"],
        "space-before-blocks": "error",
        "space-before-function-paren": ["error", "never"],
        "space-in-parens": ["error", "never"],
        "switch-colon-spacing": "error",
        yoda: "error",

        // eslint plugins
        "import/no-extraneous-dependencies": "off",
        "import/no-unresolved": "off",
        "import/extensions": "off",
        "import/prefer-default-export": 0,

        // React-specific
        "jsx-quotes": ["error", "prefer-double"],
        "react/jsx-curly-brace-presence": 0,
        "react/jsx-filename-extension": 0,
    },
    overrides: [
        {
            files: ["src/**/*.test.js"],
            rules: {
                "no-console": 0,
                "global-require": 0
            }
        }
    ]
};
