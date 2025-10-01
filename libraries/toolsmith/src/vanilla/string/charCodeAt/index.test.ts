import { assert, assertEquals } from "jsr:@std/assert"
import * as fc from "npm:fast-check"

import charCodeAt from "./index.ts"

Deno.test("charCodeAt - returns character code at valid index", () => {
	const result = charCodeAt(0)!("A")

	assertEquals(result, 65)
})

Deno.test("charCodeAt - works with different indices", async (t) => {
	await t.step("first character", () => {
		const result = charCodeAt(0)!("hello")

		assertEquals(result, 104) // 'h'
	})

	await t.step("middle character", () => {
		const result = charCodeAt(2)!("hello")

		assertEquals(result, 108) // 'l'
	})

	await t.step("last character", () => {
		const result = charCodeAt(4)!("hello")

		assertEquals(result, 111) // 'o'
	})
})

Deno.test("charCodeAt - handles Unicode characters", async (t) => {
	await t.step("Greek alpha", () => {
		const result = charCodeAt(0)!("α")

		assertEquals(result, 945)
	})

	await t.step("emoji", () => {
		const result = charCodeAt(0)!("😀")

		assertEquals(result, 55357)
	})
})

Deno.test("charCodeAt - returns null for out of bounds index", async (t) => {
	await t.step("negative index", () => {
		const fn = charCodeAt(-1)

		assertEquals(fn, null)
	})

	await t.step("index equals length", () => {
		const result = charCodeAt(5)!("hello")

		assertEquals(result, null)
	})

	await t.step("index greater than length", () => {
		const result = charCodeAt(100)!("hello")

		assertEquals(result, null)
	})
})

Deno.test("charCodeAt - handles empty string", () => {
	const result = charCodeAt(0)!("")

	assertEquals(result, null)
})

Deno.test("charCodeAt - property: valid indices return numbers", () => {
	fc.assert(
		fc.property(
			fc.string({ minLength: 1 }),
			(str) => {
				const index = Math.floor(Math.random() * str.length)
				const result = charCodeAt(index)!(str)

				assert(typeof result === "number")
				assert(result >= 0)
				assert(result <= 1114111) // Max Unicode code point
			},
		),
	)
})

Deno.test("charCodeAt - property: currying works", () => {
	fc.assert(
		fc.property(
			fc.string({ minLength: 1 }),
			(str) => {
				const getFirstChar = charCodeAt(0)!
				const result = getFirstChar(str)

				assert(typeof result === "number")
			},
		),
	)
})

Deno.test("charCodeAt - returns null for invalid first arg", async (t) => {
	await t.step("non-integer index", () => {
		const result = charCodeAt(1.5)

		assertEquals(result, null)
	})

	await t.step("negative index returns null immediately", () => {
		const result = charCodeAt(-5)

		assertEquals(result, null)
	})
})
