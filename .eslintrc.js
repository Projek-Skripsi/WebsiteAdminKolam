module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/jsx-key': 0,
    'react/prop-types': 0,
    'react/no-unknown-property': 0,
    'react/no-unescaped-entities': 0,
    'no-unused-vars': 0,
    'no-unneeded-ternary': 0
  }
}
