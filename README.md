This repository contains a plugin to provide additional rules for [`Deno lint`](https://docs.deno.com/runtime/fundamentals/configuration/#linting).

Use it by adding to the `"lint"` section in the `deno.json` or `deno.jsonc` config file in your own project.

```json
{
  "lint": {
    "plugins": ["jsr:@duncan/lint"]
  }
}
```

# Rules

## no-useless-undefined-initializer

`let` declarations are initialized to `undefined` by default; there's no need to provide `undefined` as an initializer.[^1][^2]

```ts
// Bad
let x = undefined
let y: string | undefined = undefined

// Good
let x
let y: string | undefined
```

This rule also offers an automated quick-fix via LSP:

![Screenshot](https://raw.githubusercontent.com/frou/deno-lint-plugin/master/lsp-nuui.png)

[^1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#valuen
[^2]: https://tc39.es/ecma262/#sec-declarations-and-the-variable-statement

<!-- ## Another lint rule -->
