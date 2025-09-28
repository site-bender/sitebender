import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import integer from "../../../primitives/integer/index.ts"
import boolean from "../../../primitives/boolean/index.ts"
import _parseElements from "./index.ts"

Deno.test("_parseElements: parses empty array", () => {
	const gen = integer(0, 100)
	const result = _parseElements(gen)([])

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, [])
	}
})

Deno.test("_parseElements: parses valid integer array", () => {
	const gen = integer(0, 100)
	const result = _parseElements(gen)([1, 2, 3])

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, [1, 2, 3])
	}
})

Deno.test("_parseElements: rejects invalid elements", () => {
	const gen = integer(0, 100)
	const result = _parseElements(gen)([1, "not a number", 3])

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.type, "ValidationFailed")
		assertEquals(result.error.reason, "Element at index 1 failed validation")
	}
})

Deno.test("_parseElements: rejects out of range integers", () => {
	const gen = integer(0, 10)
	const result = _parseElements(gen)([5, 15, 3])

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.type, "ValidationFailed")
		assertEquals(result.error.reason, "Element at index 1 failed validation")
	}
})

Deno.test("_parseElements: parses boolean array", () => {
	const gen = boolean
	const result = _parseElements(gen)([true, false, true])

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, [true, false, true])
	}
})

Deno.test("_parseElements: handles generator without parse function", () => {
	const gen = {
		next: () => ({ value: 42, nextSeed: null as any, size: 1 }),
		shrink: (v: number) => ({ value: v, children: () => [] }),
		// No parse function
	}

	const result = _parseElements(gen)(["anything", 123, null])

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, ["anything", 123, null])
	}
})

Deno.test("_parseElements: preserves element order", () => {
	const gen = integer(0, 100)
	const input = [10, 20, 30, 40, 50]
	const result = _parseElements(gen)(input)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, input)
	}
})

Deno.test("_parseElements: fails fast on first invalid element", () => {
	const gen = integer(0, 10)
	const result = _parseElements(gen)([5, 50, 500])

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		// Should fail at index 1, not continue to index 2
		assertEquals(result.error.reason, "Element at index 1 failed validation")
	}
})
