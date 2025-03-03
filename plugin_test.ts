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
    "`let` declarations are initialized to `undefined` by default; it's unnecessary to provide `undefined` as an initializer"
  )
  assertEquals(
    d.fix,
    [{ range: [5, 17], text: "" }]
  )
})
