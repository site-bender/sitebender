// @ts-nocheck: use local assert helpers and avoid importing std aliases in src tests
// Minimal local assert helpers
function assertEquals(actual: unknown, expected: unknown) {
  const a = JSON.stringify(actual)
  const b = JSON.stringify(expected)
  if (a !== b) throw new Error(`Assertion failed:\nActual: ${a}\nExpected: ${b}`)
}
function assert(cond: boolean, msg = "Assertion failed") {
  if (!cond) throw new Error(msg)
}

import type ValidationError from "../../../types/ValidationError/index.ts"
import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"

import orElse from "./index.ts"
import valid from "../valid/index.ts"
import invalid from "../invalid/index.ts"

Deno.test("orElse - returns original when Valid and calls alternative only when Invalid", async (t) => {
  await t.step("returns original Valid", () => {
    const original = valid(42)
    let called = 0
    const alternative = () => { called++; return valid(0) }

    const result = orElse<number, number>(alternative)(original)

    assertEquals(result, original)
    assert(called === 0, "alternative should not be called for Valid")
  })

  await t.step("returns alternative for Invalid", () => {
    const errs: NonEmptyArray<ValidationError> = [
      { field: "x", messages: ["bad"] },
    ]
    const original = invalid<ValidationError, number>(errs)
    let called = 0
    const alternative = () => { called++; return valid(99) }

    const result = orElse<ValidationError, number>(alternative)(original)

    assertEquals(result, valid(99))
    assert(called === 1, "alternative should be called once for Invalid")
  })
})
