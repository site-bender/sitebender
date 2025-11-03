import { assert, assertEquals } from "jsr:@std/assert"
import * as fc from "npm:fast-check"

import lookup from "./index.ts"

Deno.test("lookup - returns value for existing key", () => {
	const obj = { a: 1, b: 2, c: 3 }
	const result = lookup("a")!(obj)

	assertEquals(result, 1)
})

Deno.test("lookup - works with different value types", async (t) => {
	await t.step("string values", () => {
		const obj = { name: "Alice", city: "NYC" }
		const result = lookup("name")!(obj)

		assertEquals(result, "Alice")
	})

	await t.step("boolean values", () => {
		const obj = { active: true, verified: false }
		const result = lookup("active")!(obj)

		assertEquals(result, true)
	})

	await t.step("object values", () => {
		const obj = { user: { id: 1, name: "Bob" } }
		const result = lookup("user")!(obj)

		assertEquals(result, { id: 1, name: "Bob" })
	})

	await t.step("array values", () => {
		const obj = { items: [1, 2, 3] }
		const result = lookup("items")!(obj)

		assertEquals(result, [1, 2, 3])
	})
})

Deno.test("lookup - returns null for missing key", () => {
	const obj = { a: 1, b: 2 }
	const result = lookup("c")!(obj)

	assertEquals(result, null)
})

Deno.test("lookup - handles number keys", () => {
	const obj = { 0: "zero", 1: "one", 2: "two" }
	const result = lookup(1)!(obj)

	assertEquals(result, "one")
})

Deno.test("lookup - handles symbol keys", () => {
	const sym = Symbol("test")
	const obj = { [sym]: "symbol value" }
	const result = lookup(sym)!(obj)

	assertEquals(result, "symbol value")
})

Deno.test("lookup - returns null for null/undefined values", async (t) => {
	await t.step("null value in object", () => {
		const obj = { a: null }
		const result = lookup("a")!(obj)

		assertEquals(result, null)
	})

	await t.step("undefined value in object", () => {
		const obj = { a: undefined }
		const result = lookup("a")!(obj)

		assertEquals(result, null)
	})
})

Deno.test("lookup - property: currying works", () => {
	fc.assert(
		fc.property(
			fc.string(),
			fc.integer(),
			(key, value) => {
				const obj = { [key]: value }
				const lookupKey = lookup(key)!
				const result = lookupKey(obj)

				assertEquals(result, value)
			},
		),
	)
})

Deno.test("lookup - handles empty object", () => {
	const obj = {}
	const result = lookup("anything")!(obj)

	assertEquals(result, null)
})
