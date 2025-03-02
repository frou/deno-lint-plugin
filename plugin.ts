const noUselessUndefinedInitializer: Deno.lint.Rule = {
  create(context) {
    return {
      'VariableDeclaration[kind="let"] VariableDeclarator'(decl: Deno.lint.VariableDeclarator) {
        const initializer = decl.init
        if (initializer == null) {
          return
        }

        const needle = "undefined"
        if (initializer.type == "Identifier" && initializer.name == needle) {
          context.report({
            node: decl,

            message: "`let` declarations are initialized to `" + needle +
              "` by default; there's no need to provide `" + needle + "` as an initializer",

            fix(fixer) {
              // Remove the initializer and the ` = ` syntax that precedes it.
              const [_identStart, identEnd] = decl.id.range
              const [_initStart, initEnd] = initializer.range
              return fixer.removeRange([identEnd, initEnd])
            },
          })
        }
      },
    }
  },
}

export default {
  name: "duncan-lint",
  rules: {
    "no-useless-undefined-initializer": noUselessUndefinedInitializer,
  },
} satisfies Deno.lint.Plugin

/* References

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#valuen
- https://tc39.es/ecma262/#sec-declarations-and-the-variable-statement

- https://docs.deno.com/runtime/fundamentals/configuration/#linting
    - https://docs.deno.com/runtime/reference/lint_plugins/
    - https://docs.deno.com/lint/
    - https://docs.deno.com/api/deno/linter
    - https://deno.com/blog/lint-rules-contest

- https://eslint.org/docs/latest/extend/selectors#what-syntax-can-selectors-have
  - https://github.com/estools/esquery?tab=readme-ov-file#readme
  - https://typescript-eslint.io/packages/typescript-estree/
    - https://typescript-eslint.io/packages/typescript-estree/ast-spec/
    - https://typescript-eslint.io/play/
*/
