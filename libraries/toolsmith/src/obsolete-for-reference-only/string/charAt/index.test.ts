import { assert, assertEquals } from "jsr:@std/assert"
import * as fc from "npm:fast-check"

import charAt from "./index.ts"

Deno.test("charAt - returns character at valid index", () => {
	const result = charAt(0)!("A")

	assertEquals(result, "A")
})

Deno.test("charAt - works with different indices", async (t) => {
	await t.step("first character", () => {
		const result = charAt(0)!("hello")

		assertEquals(result, "h")
	})

	await t.step("middle character", () => {
		const result = charAt(2)!("hello")

		assertEquals(result, "l")
	})

	await t.step("last character", () => {
		const result = charAt(4)!("hello")

		assertEquals(result, "o")
	})
})

Deno.test("charAt - handles Unicode characters", async (t) => {
	await t.step("Greek alpha", () => {
		const result = charAt(0)!("α")

		assertEquals(result, "α")
	})

	await t.step("emoji returns first code unit", () => {
		const result = charAt(0)!("😀")

		// Note: charAt returns first UTF-16 code unit for multi-byte chars
		assert(typeof result === "string")
		assert(result.length === 1)
	})
})

Deno.test("charAt - returns null for out of bounds index", async (t) => {
	await t.step("negative index", () => {
		const fn = charAt(-1)

		assertEquals(fn, null)
	})

	await t.step("index equals length", () => {
		const result = charAt(5)!("hello")

		assertEquals(result, null)
	})

	await t.step("index greater than length", () => {
		const result = charAt(100)!("hello")

		assertEquals(result, null)
	})
})

Deno.test("charAt - handles empty string", () => {
	const result = charAt(0)!("")

	assertEquals(result, null)
})

Deno.test("charAt - property: valid indices return strings", () => {
	fc.assert(
		fc.property(
			fc.string({ minLength: 1 }),
			(str) => {
				const index = Math.floor(Math.random() * str.length)
				const result = charAt(index)!(str)

				assert(typeof result === "string")
				assertEquals(result.length, 1)
			},
		),
	)
})

Deno.test("charAt - property: currying works", () => {
	fc.assert(
		fc.property(
			fc.string({ minLength: 1 }),
			(str) => {
				const getFirstChar = charAt(0)!
				const result = getFirstChar(str)

				assert(typeof result === "string")
			},
		),
	)
})

Deno.test("charAt - returns null for invalid first arg", async (t) => {
	await t.step("non-integer index", () => {
		const result = charAt(1.5)

		assertEquals(result, null)
	})

	await t.step("negative index returns null immediately", () => {
		const result = charAt(-5)

		assertEquals(result, null)
	})
})
