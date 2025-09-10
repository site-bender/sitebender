// @ts-nocheck: use local assert helpers and avoid importing std aliases in src tests
function assertEquals(actual: unknown, expected: unknown) {
  const a = JSON.stringify(actual)
  const b = JSON.stringify(expected)
  if (a !== b) throw new Error(`Assertion failed:\nActual: ${a}\nExpected: ${b}`)
}

import type ValidationError from "../../../types/ValidationError/index.ts"
import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"

import validateAll from "./index.ts"
import accumulateErrors from "./accumulateErrors/index.ts"
import valid from "../valid/index.ts"
import invalid from "../invalid/index.ts"
import reduce from "../../../simple/array/reduce/index.ts"

Deno.test("validateAll - returns Valid when all validators pass; otherwise accumulates errors", async (t) => {
  const isPositive = (n: number) => n > 0
  const isLessThan100 = (n: number) => n < 100

  const posValidator = (n: number) => isPositive(n)
    ? valid(n)
    : invalid<ValidationError, number>([{ field: "number", messages: ["Must be positive"] }])

  const ltValidator = (n: number) => isLessThan100(n)
    ? valid(n)
    : invalid<ValidationError, number>([{ field: "number", messages: ["Must be less than 100"] }])

  await t.step("Valid when all pass", () => {
    const validators: NonEmptyArray<typeof posValidator> = [posValidator, ltValidator]
    const result = validateAll(validators)(50)
    assertEquals(result._tag, "Valid")
    if (result._tag === "Valid") {
      assertEquals(result.value, 50)
    }
  })

  await t.step("Invalid with accumulated errors", () => {
    const validators: NonEmptyArray<typeof posValidator> = [posValidator, ltValidator]
    const result = validateAll(validators)(-10)
    assertEquals(result._tag, "Invalid")
    if (result._tag === "Invalid") {
      // Only positive fails in this case; ensure single error present
      assertEquals(result.errors.length, 1)
      assertEquals(result.errors[0].field, "number")
    }
  })
})

Deno.test("accumulateErrors - reducer collects errors from validators for a fixed value", () => {
  const value = 5
  const validators = [
    (n: number) => valid(n),
    (_n: number) => invalid<ValidationError, number>([{ field: "x", messages: ["bad"] }]),
  ]

  const collected = reduce(accumulateErrors(value))([])(validators)
  assertEquals(collected, [{ field: "x", messages: ["bad"] }])
})
