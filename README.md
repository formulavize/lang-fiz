# lang-fiz

This package implements fiz language support for the [CodeMirror](https://codemirror.net/6/) code editor.

## Development Notes

### mocha version

`mocha` is pinned to `10.8.2` (the last 10.x release). The test runner (`cm-runtests` from [`@codemirror/buildhelper`](https://github.com/codemirror/buildhelper)) uses a version of [`@marijn/testtool`](https://github.com/marijnh/testtool), which requires `mocha ^10.0.0`. Using mocha 11.x causes a crash at test startup because the test files import `describe`/`it` from a mocha instance that the runner never initializes. Do not upgrade `mocha` until `@codemirror/buildhelper` upgrades to use a version of `@marijn/testtool` adds mocha 11.x support.
