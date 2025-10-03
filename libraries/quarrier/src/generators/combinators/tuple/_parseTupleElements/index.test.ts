import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import boolean from "../../../primitives/boolean/index.ts"
import integer from "../../../primitives/integer/index.ts"
import _parseTupleElements from "./index.ts"

Deno.test("_parseTupleElements: parses empty tuple", () => {
	const generators: any[] = []
	const result = _parseTupleElements(generators)([])

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, [])
	}
})

Deno.test("_parseTupleElements: parses valid tuple", () => {
	const generators = [
		integer(0, 100),
		boolean,
		integer(0, 10),
	]

	const result = _parseTupleElements(generators)([42, true, 5])

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, [42, true, 5])
	}
})

Deno.test("_parseTupleElements: rejects invalid element at any position", () => {
	const generators = [
		integer(0, 100),
		boolean,
		integer(0, 10),
	]

	// Invalid at position 1
	const result1 = _parseTupleElements(generators)([42, "not a boolean", 5])
	assertEquals(result1._tag, "Error")
	if (result1._tag === "Error") {
		assertEquals(result1.error.type, "ValidationFailed")
		assertEquals(result1.error.reason, "Element at index 1 failed validation")
	}

	// Invalid at position 2
	const result2 = _parseTupleElements(generators)([42, true, 100])
	assertEquals(result2._tag, "Error")
	if (result2._tag === "Error") {
		assertEquals(result2.error.reason, "Element at index 2 failed validation")
	}
})

Deno.test("_parseTupleElements: handles generators without parse", () => {
	const generators = [
		{
			next: () => ({ value: 42, nextSeed: null as any, size: 1 }),
			shrink: (v: number) => ({ value: v, children: () => [] }),
			// No parse function
		},
		boolean,
	]

	const result = _parseTupleElements(generators)(["anything", true])

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, ["anything", true])
	}
})

Deno.test("_parseTupleElements: preserves element order and types", () => {
	const generators = [
		integer(0, 100),
		integer(0, 100),
		integer(0, 100),
	]

	const input = [10, 20, 30]
	const result = _parseTupleElements(generators)(input)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, input)
		assertEquals(result.value[0], 10)
		assertEquals(result.value[1], 20)
		assertEquals(result.value[2], 30)
	}
})

Deno.test("_parseTupleElements: fails fast on first invalid", () => {
	const generators = [
		integer(0, 10),
		integer(0, 10),
		integer(0, 10),
	]

	const result = _parseTupleElements(generators)([5, 50, 500])

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		// Should fail at index 1, not continue to index 2
		assertEquals(result.error.reason, "Element at index 1 failed validation")
	}
})

Deno.test("_parseTupleElements: handles single element tuple", () => {
	const generators = [boolean]

	const result = _parseTupleElements(generators)([true])

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.length, 1)
		assertEquals(result.value[0], true)
	}
})
