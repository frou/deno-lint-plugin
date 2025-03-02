import { assertEquals } from "jsr:@std/assert@1"
import linterPlugin from "./plugin.ts"

Deno.test("no-useless-undefined-initializer", function() {
  const diagnostics = Deno.lint.runPlugin(
    linterPlugin,
    "foo.ts", // Dummy file name
    "let x = undefined"
  )

  assertEquals(diagnostics.length, 1)
  const d = diagnostics[0]
  assertEquals(d.id, "duncan-lint/no-useless-undefined-initializer")
  assertEquals(
    d.message,
    "`let` declarations are initialized to `undefined` by default; there's no need to provide `undefined` as an initializer"
  )
  // @todo Work out how to test that the fix works
  // @→    d.fix is not a function, as implied in https://docs.deno.com/runtime/reference/lint_plugins/#testing-plugins
})
