module.exports = {
  extends: ["@nordcloud/eslint-config-pat/stylelint.config.js", "stylelint-config-standard-scss"],
  rules: {
    // Your overrides
    "selector-id-pattern": ".*",
    "selector-class-pattern": ".*"
  },
  "ignoreFiles": ["**/*.*", "!**/*.scss"]
};