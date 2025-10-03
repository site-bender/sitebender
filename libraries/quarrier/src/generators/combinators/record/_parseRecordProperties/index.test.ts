import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import boolean from "../../../primitives/boolean/index.ts"
import integer from "../../../primitives/integer/index.ts"
import _parseRecordProperties from "./index.ts"

Deno.test("_parseRecordProperties: parses empty record", () => {
	const generators = {}
	const inputObj = {}
	const keys: string[] = []

	const result = _parseRecordProperties(generators)(inputObj)(keys)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, {})
	}
})

Deno.test("_parseRecordProperties: parses valid record", () => {
	const generators = {
		x: integer(0, 100),
		y: boolean,
		z: integer(0, 10),
	}
	const inputObj = { x: 42, y: true, z: 5 }
	const keys = ["x", "y", "z"]

	const result = _parseRecordProperties(generators)(inputObj)(keys)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, { x: 42, y: true, z: 5 })
	}
})

Deno.test("_parseRecordProperties: rejects invalid property value", () => {
	const generators = {
		a: integer(0, 100),
		b: boolean,
		c: integer(0, 10),
	}
	const keys = ["a", "b", "c"]

	// Invalid at property "b"
	const result1 = _parseRecordProperties(generators)({
		a: 42,
		b: "not a boolean",
		c: 5,
	})(keys)
	assertEquals(result1._tag, "Error")
	if (result1._tag === "Error") {
		assertEquals(result1.error.type, "ValidationFailed")
		assertEquals(result1.error.reason, "Property 'b' failed validation")
	}

	// Invalid at property "c"
	const result2 = _parseRecordProperties(generators)({
		a: 42,
		b: true,
		c: 100,
	})(keys)
	assertEquals(result2._tag, "Error")
	if (result2._tag === "Error") {
		assertEquals(result2.error.reason, "Property 'c' failed validation")
	}
})

Deno.test("_parseRecordProperties: handles generators without parse", () => {
	const generators = {
		parsed: boolean,
		unparsed: {
			next: () => ({ value: 42, nextSeed: null as any, size: 1 }),
			shrink: (v: number) => ({ value: v, children: () => [] }),
			// No parse function
		},
	}
	const inputObj = { parsed: true, unparsed: "anything" }
	const keys = ["parsed", "unparsed"]

	const result = _parseRecordProperties(generators)(inputObj)(keys)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, { parsed: true, unparsed: "anything" })
	}
})

Deno.test("_parseRecordProperties: preserves property types", () => {
	const generators = {
		num: integer(0, 100),
		bool: boolean,
	}
	const inputObj = { num: 50, bool: false }
	const keys = ["num", "bool"]

	const result = _parseRecordProperties(generators)(inputObj)(keys)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(typeof result.value.num, "number")
		assertEquals(typeof result.value.bool, "boolean")
		assertEquals(result.value.num, 50)
		assertEquals(result.value.bool, false)
	}
})

Deno.test("_parseRecordProperties: fails fast on first invalid", () => {
	const generators = {
		a: integer(0, 10),
		b: integer(0, 10),
		c: integer(0, 10),
	}
	const inputObj = { a: 5, b: 50, c: 500 }
	const keys = ["a", "b", "c"]

	const result = _parseRecordProperties(generators)(inputObj)(keys)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		// Should fail at property "b", not continue to "c"
		assertEquals(result.error.reason, "Property 'b' failed validation")
	}
})

Deno.test("_parseRecordProperties: handles single property", () => {
	const generators = {
		only: boolean,
	}
	const inputObj = { only: true }
	const keys = ["only"]

	const result = _parseRecordProperties(generators)(inputObj)(keys)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(Object.keys(result.value).length, 1)
		assertEquals(result.value.only, true)
	}
})

Deno.test("_parseRecordProperties: processes keys in order", () => {
	const processedKeys: string[] = []

	const generators = {
		a: {
			next: () => ({ value: 1, nextSeed: null as any, size: 1 }),
			shrink: (v: number) => ({ value: v, children: () => [] }),
			parse: (input: unknown) => {
				processedKeys.push("a")
				return { _tag: "Ok" as const, value: input as number }
			},
		},
		b: {
			next: () => ({ value: 2, nextSeed: null as any, size: 1 }),
			shrink: (v: number) => ({ value: v, children: () => [] }),
			parse: (input: unknown) => {
				processedKeys.push("b")
				return { _tag: "Ok" as const, value: input as number }
			},
		},
		c: {
			next: () => ({ value: 3, nextSeed: null as any, size: 1 }),
			shrink: (v: number) => ({ value: v, children: () => [] }),
			parse: (input: unknown) => {
				processedKeys.push("c")
				return { _tag: "Ok" as const, value: input as number }
			},
		},
	}

	const inputObj = { a: 1, b: 2, c: 3 }
	const keys = ["a", "b", "c"]

	_parseRecordProperties(generators)(inputObj)(keys)

	assertEquals(processedKeys, ["a", "b", "c"])
})
