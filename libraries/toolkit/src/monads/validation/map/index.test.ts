import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"

import type ValidationError from "../../../types/ValidationError/index.ts"

import map from "./index.ts"
import valid from "../valid/index.ts"
import invalid from "../invalid/index.ts"
import isValid from "../isValid/index.ts"
import isInvalid from "../isInvalid/index.ts"

Deno.test("map - transforms valid values", async (t) => {
	await t.step("should map over valid number", () => {
		const double = (x: number) => x * 2
		const result = map(double)(valid<ValidationError, number>(21))
		
		assertEquals(isValid(result), true)
		if (isValid(result)) {
			assertEquals(result.value, 42)
		}
	})

	await t.step("should map over valid string", () => {
		const toLength = (s: string) => s.length
		const result = map(toLength)(valid<ValidationError, string>("hello"))
		
		assertEquals(isValid(result), true)
		if (isValid(result)) {
			assertEquals(result.value, 5)
		}
	})

	await t.step("should preserve invalid state", () => {
		const errors = [{ field: "test", messages: ["error"] }]
		const double = (x: number) => x * 2
		const result = map(double)(invalid<ValidationError, number>(errors))
		
		assertEquals(isInvalid(result), true)
		if (isInvalid(result)) {
			assertEquals(result.errors, errors)
		}
	})

	await t.step("should chain multiple maps", () => {
		const double = (x: number) => x * 2
		const toString = (x: number) => x.toString()
		
		const step1 = valid<ValidationError, number>(10)
		const step2 = map(double)(step1)
		const step3 = map(toString)(step2)
		
		assertEquals(isValid(step3), true)
		if (isValid(step3)) {
			assertEquals(step3.value, "20")
		}
	})

	await t.step("should transform complex types", () => {
		const user = { id: 1, name: "Alice", age: 30 }
		const getName = (u: typeof user) => u.name
		const result = map(getName)(valid<ValidationError, typeof user>(user))
		
		assertEquals(isValid(result), true)
		if (isValid(result)) {
			assertEquals(result.value, "Alice")
		}
	})
})