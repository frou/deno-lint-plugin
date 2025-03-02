This repository contains a plugin to provide additional rules for [Deno's linter](https://docs.deno.com/runtime/fundamentals/configuration/#linting).

To use it, add it to the `"lint"` section in your own project's `deno.json` or `deno.jsonc` configuration file:

```json
{
  "lint": {
    "plugins": ["jsr:@duncan/lint"]
  }
}
```

# Rules

## no-useless-undefined-initializer

Because `let` declarations are initialized to `undefined` by default, it's unnecessary to provide `undefined` as an initializer.[^1]&nbsp;[^2]

This rule warns about such initializers, e.g.

```ts
// Bad
let x = undefined;
let y: string | undefined = undefined;

// Good
let x;
let y: string | undefined;
```

...and an automated Quick-Fix is offered via LSP:

![Screenshot](https://raw.githubusercontent.com/frou/deno-lint-plugin/master/lsp-nuui.png)

[^1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#valuen
[^2]: https://tc39.es/ecma262/#sec-declarations-and-the-variable-statement

<!-- ## Another lint rule -->
