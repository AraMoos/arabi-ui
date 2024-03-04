module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
  ],
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/no-dupe-keys": ["error", {
      "groups": ['Input']
    }],
    "vue/no-mutating-props": ["error", {
      "shallowOnly": false
    }],
    "vue/no-reserved-props": ["error", {
      "vueVersion": 3, // or 2
    }],
    "vue/no-unused-vars": ["error", {
      "ignorePattern": "^_"
    }],
    "vue/html-quotes": ["error", "double", { "avoidEscape": false }],
    "vue/no-multi-spaces": ["error", {
      "ignoreProperties": false
    }],
    "vue/no-spaces-around-equal-signs-in-attribute": ["error"],
    "vue/prop-name-casing": ["error", "camelCase"],
    "vue/v-on-event-hyphenation": ["error"],
    "vue/block-order": ["error", {
      "order": [["script", "template"], "style"]
    }],
    "vue/first-attribute-linebreak": ["error", {
      "singleline": "ignore",
      "multiline": "ignore"
    }],
    "vue/html-closing-bracket-spacing": ["error", {
      "startTag": "never",
      "endTag": "never",
      "selfClosingTag": "always"
    }],
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 6
      }
    }],
    "object-curly-spacing": ["error", "always", {
      "objectsInObjects": false,
      "arraysInObjects": false
    }],
    "vue/block-tag-newline": ["error", {
      "singleline": "always",
      "multiline": "always",
    }],
    "comma-spacing": ["error", { "before": false, "after": true }],
    '@typescript-eslint/semi': ['error', 'always'],
    "vue/require-default-prop":"off"
  }
};