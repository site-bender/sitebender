// @ts-nocheck: use local assert helpers and avoid importing std aliases in src tests
function assertEquals(actual: unknown, expected: unknown) {
  const a = JSON.stringify(actual)
  const b = JSON.stringify(expected)
  if (a !== b) throw new Error(`Assertion failed:\nActual: ${a}\nExpected: ${b}`)
}

import type ValidationError from "../../../types/ValidationError/index.ts"
import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"

import mapErrors from "./index.ts"
import valid from "../valid/index.ts"
import invalid from "../invalid/index.ts"

Deno.test("mapErrors - transforms only Invalid branch and preserves NonEmptyArray", async (t) => {
  await t.step("preserves Valid unchanged", () => {
    const v = valid(10)
    const result = mapErrors<ValidationError, { msg: string }>((e) => ({ msg: e.messages.join(",") }))(v)
    assertEquals(result, v)
  })

  await t.step("transforms errors in Invalid", () => {
    const errs: NonEmptyArray<ValidationError> = [
      { field: "name", messages: ["required", "too short"] },
    ]
    const v = invalid<ValidationError, number>(errs)
    const result = mapErrors<ValidationError, string>((e) => `${e.field}:${e.messages.join("|")}`)(v)

    assertEquals(result._tag, "Invalid")
    if (result._tag === "Invalid") {
      assertEquals(Array.isArray(result.errors), true)
      assertEquals(result.errors.length > 0, true)
      assertEquals(result.errors[0], "name:required|too short")
    }
  })
})
