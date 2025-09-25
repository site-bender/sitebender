import { assertEquals } from "@std/assert"

import type { Validation } from "../../../types/Validation/index.ts"

import err from "../../../monads/result/err/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import invalid from "../../../monads/validation/invalid/index.ts"
import valid from "../../../monads/validation/valid/index.ts"
import map from "./index.ts"

//++ Tests for lifted map function supporting both Result and Validation monads

Deno.test("map with Result monad - all success", () => {
	const fn = (x: number) => x > 0 ? ok(x * 2) : err(`${x} is not positive`)
	const result = map(fn)([1, 2, 3, 4, 5])

	assertEquals(result, ok([2, 4, 6, 8, 10]))
})

Deno.test("map with Result monad - fail fast on first error", () => {
	const fn = (x: number) => x > 0 ? ok(x * 2) : err(`${x} is not positive`)
	const result = map(fn)([1, -2, 3, -4, 5])

	// Should fail on first negative number (-2) and not process further
	assertEquals(result, err("-2 is not positive"))
})

Deno.test("map with Validation monad - all success", () => {
	const fn = (x: number) =>
		x > 0 ? valid(x * 2) : invalid([`${x} is not positive`])
	const result = map(fn)([1, 2, 3, 4, 5])

	assertEquals(result, valid([2, 4, 6, 8, 10]))
})

Deno.test("map with Validation monad - accumulate all errors", () => {
	const fn = (x: number) =>
		x > 0 ? valid(x * 2) : invalid([`${x} is not positive`])
	const result = map(fn)([1, -2, 3, -4, 5])

	// Should accumulate ALL errors, not just the first
	assertEquals(result, invalid(["-2 is not positive", "-4 is not positive"]))
})

Deno.test("map with empty array - Result", () => {
	const fn = (x: number) => ok(x * 2)
	const result = map(fn)([])

	assertEquals(result, ok([]))
})

Deno.test("map with empty array - Validation", () => {
	const fn = (x: number) => valid(x * 2)
	const result = map(fn)([])

	// Empty array returns ok([]) regardless of intended monad type
	// This is a limitation of type detection with empty arrays
	assertEquals(result._tag, "Right")
})

Deno.test("map with complex validation errors", () => {
	interface User {
		name: string
		age: number
	}

	const validateUser = (
		input: { name?: string; age?: number },
	): Validation<string, User> => {
		const errors: Array<string> = []

		if (!input.name) errors.push("Name is required")
		if (!input.age) errors.push("Age is required")
		if (input.age && input.age < 0) errors.push("Age must be positive")

		if (errors.length > 0) {
			return invalid(errors as [string, ...Array<string>])
		}

		return valid({ name: input.name!, age: input.age! })
	}

	const inputs = [
		{ name: "Alice", age: 25 },
		{ name: "", age: -5 },
		{ age: 30 },
		{ name: "Bob", age: 35 },
	]

	const result = map(validateUser)(inputs)

	// Should accumulate all validation errors
	assertEquals(result._tag, "Invalid")
	if (result._tag === "Invalid") {
		// Should have errors for the invalid entries
		assertEquals(result.errors.length > 0, true)
	}
})
