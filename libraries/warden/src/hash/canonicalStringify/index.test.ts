import { assertEquals } from "jsr:@std/assert@1.0.14"
import canonicalStringify from "./index.ts"

Deno.test("canonicalStringify - sorts object keys alphabetically", function testObjectKeySorting() {
	const unsorted = { z: 1, a: 2, m: 3 }
	const result = canonicalStringify(unsorted)
	const expected = JSON.stringify({ a: 2, m: 3, z: 1 }, null, 2)

	assertEquals(result, expected)
})

Deno.test("canonicalStringify - produces deterministic output for same input", function testDeterministicOutput() {
	const data = { b: 2, a: 1, c: 3 }
	const result1 = canonicalStringify(data)
	const result2 = canonicalStringify(data)

	assertEquals(result1, result2)
})

Deno.test("canonicalStringify - same output regardless of key order", function testKeyOrderIndependence() {
	const obj1 = { z: 1, a: 2, m: 3 }
	const obj2 = { a: 2, m: 3, z: 1 }
	const result1 = canonicalStringify(obj1)
	const result2 = canonicalStringify(obj2)

	assertEquals(result1, result2)
})

Deno.test("canonicalStringify - handles nested objects with sorted keys", function testNestedObjects() {
	const nested = {
		z: { y: 1, x: 2 },
		a: { c: 3, b: 4 },
	}
	const result = canonicalStringify(nested)
	const expected = JSON.stringify(
		{
			a: { b: 4, c: 3 },
			z: { x: 2, y: 1 },
		},
		null,
		2,
	)

	assertEquals(result, expected)
})

Deno.test("canonicalStringify - preserves array order", function testArrayOrder() {
	const data = { items: [3, 1, 2] }
	const result = canonicalStringify(data)
	const expected = JSON.stringify({ items: [3, 1, 2] }, null, 2)

	assertEquals(result, expected)
})

Deno.test("canonicalStringify - handles arrays of objects with sorted keys", function testArrayOfObjects() {
	const data = {
		items: [
			{ z: 1, a: 2 },
			{ b: 3, a: 4 },
		],
	}
	const result = canonicalStringify(data)
	const expected = JSON.stringify(
		{
			items: [
				{ a: 2, z: 1 },
				{ a: 4, b: 3 },
			],
		},
		null,
		2,
	)

	assertEquals(result, expected)
})

Deno.test("canonicalStringify - handles primitive types", function testPrimitives() {
	assertEquals(canonicalStringify("hello"), '"hello"')
	assertEquals(canonicalStringify(42), "42")
	assertEquals(canonicalStringify(true), "true")
	assertEquals(canonicalStringify(false), "false")
	assertEquals(canonicalStringify(null), "null")
})

Deno.test("canonicalStringify - handles empty objects", function testEmptyObject() {
	const result = canonicalStringify({})
	assertEquals(result, "{}")
})

Deno.test("canonicalStringify - handles empty arrays", function testEmptyArray() {
	const result = canonicalStringify([])
	assertEquals(result, "[]")
})

Deno.test("canonicalStringify - handles undefined", function testUndefined() {
	const result = canonicalStringify(undefined)
	assertEquals(result, undefined as unknown as string)
})

Deno.test("canonicalStringify - handles deeply nested structures", function testDeeplyNested() {
	const deep = {
		level1: {
			z: "last",
			a: {
				level3: {
					z: 3,
					a: 1,
					m: 2,
				},
			},
		},
	}
	const result = canonicalStringify(deep)
	const expected = JSON.stringify(
		{
			level1: {
				a: {
					level3: {
						a: 1,
						m: 2,
						z: 3,
					},
				},
				z: "last",
			},
		},
		null,
		2,
	)

	assertEquals(result, expected)
})

Deno.test("canonicalStringify - handles mixed types in nested structure", function testMixedTypes() {
	const mixed = {
		string: "value",
		number: 42,
		boolean: true,
		nullValue: null,
		array: [1, 2, 3],
		object: { b: 2, a: 1 },
	}
	const result = canonicalStringify(mixed)
	const parsed = JSON.parse(result)

	assertEquals(parsed.string, "value")
	assertEquals(parsed.number, 42)
	assertEquals(parsed.boolean, true)
	assertEquals(parsed.nullValue, null)
	assertEquals(parsed.array, [1, 2, 3])
	assertEquals(parsed.object, { a: 1, b: 2 })
})
