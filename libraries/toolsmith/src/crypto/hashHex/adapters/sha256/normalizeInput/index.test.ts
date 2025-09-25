import {
	assertEquals,
	assertThrows,
} from "https://deno.land/std@0.208.0/assert/mod.ts"

import normalizeInput from "./index.ts"

//++ Tests for normalizeInput function

Deno.test("normalizeInput", async (t) => {
	await t.step("converts string to Uint8Array", () => {
		const result = normalizeInput("hello")

		assertEquals(result instanceof Uint8Array, true)
		assertEquals(Array.from(result), [104, 101, 108, 108, 111])
	})

	await t.step("converts ArrayBuffer to Uint8Array", () => {
		const buffer = new ArrayBuffer(3)
		const view = new Uint8Array(buffer)

		view[0] = 1
		view[1] = 2
		view[2] = 3

		const result = normalizeInput(buffer)

		assertEquals(result instanceof Uint8Array, true)
		assertEquals(Array.from(result), [1, 2, 3])
	})

	await t.step("returns Uint8Array unchanged", () => {
		const input = new Uint8Array([1, 2, 3])
		const result = normalizeInput(input)

		assertEquals(result, input)
	})

	await t.step("throws for invalid input types", () => {
		const invalidInput = 123 as unknown as Uint8Array

		assertThrows(
			() => normalizeInput(invalidInput),
			Error,
			"Invalid input type for hashing: number",
		)
	})
})
