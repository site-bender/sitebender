import { assertEquals } from "https://deno.land/std@0.213.0/assert/mod.ts"
import * as fc from "https://esm.sh/fast-check@3.15.0"

import createSeed from "../../../random/createSeed/index.ts"
import string from "./index.ts"

Deno.test("string generator", async (t) => {
	await t.step("generates string with default options", () => {
		const seedResult = createSeed(42)
		if (seedResult._tag === "Ok") {
			const gen = string()
			const result = gen.next(seedResult.value)
			assertEquals(typeof result.value, "string")
			// Default should generate reasonable length strings
			assertEquals(result.value.length >= 0, true)
			assertEquals(result.value.length <= 100, true)
		}
	})

	await t.step("generates string with custom length range", () => {
		const seedResult = createSeed(42)
		if (seedResult._tag === "Ok") {
			const gen = string({ minLength: 5, maxLength: 10 })
			const result = gen.next(seedResult.value)
			assertEquals(typeof result.value, "string")
			assertEquals(result.value.length >= 5, true)
			assertEquals(result.value.length <= 10, true)
		}
	})

	await t.step("generates string with custom charset", () => {
		const seedResult = createSeed(42)
		if (seedResult._tag === "Ok") {
			const gen = string({ charset: "abc" })
			const result = gen.next(seedResult.value)
			assertEquals(typeof result.value, "string")
			// All chars should be from charset
			for (const char of result.value) {
				assertEquals("abc".includes(char), true)
			}
		}
	})

	await t.step("handles empty string generation", () => {
		const seedResult = createSeed(42)
		if (seedResult._tag === "Ok") {
			const gen = string({ minLength: 0, maxLength: 0 })
			const result = gen.next(seedResult.value)
			assertEquals(result.value, "")
		}
	})

	await t.step("shrinks by removing characters", () => {
		const gen = string()
		const tree = gen.shrink("hello")
		assertEquals(tree.value, "hello")
		const children = tree.children()

		// Should have shrinks
		assertEquals(children.length > 0, true)
		// First shrink should be empty string
		assertEquals(children[0].value, "")
		// Should also have intermediate shrinks
		const hasIntermediateShrink = children.some(
			(child) => child.value.length > 0 && child.value.length < 5,
		)
		assertEquals(hasIntermediateShrink, true)
	})

	await t.step("empty string does not shrink", () => {
		const gen = string()
		const tree = gen.shrink("")
		assertEquals(tree.value, "")
		assertEquals(tree.children().length, 0)
	})

	await t.step("parses valid strings", () => {
		const gen = string({ minLength: 2, maxLength: 5 })
		if (gen.parse) {
			const result = gen.parse("abc")
			assertEquals(result._tag, "Ok")
			if (result._tag === "Ok") {
				assertEquals(result.value, "abc")
			}
		}
	})

	await t.step("rejects strings outside length bounds", () => {
		const gen = string({ minLength: 2, maxLength: 5 })
		if (gen.parse) {
			const result1 = gen.parse("a") // Too short
			assertEquals(result1._tag, "Error")

			const result2 = gen.parse("toolong") // Too long
			assertEquals(result2._tag, "Error")
		}
	})

	await t.step("rejects non-strings", () => {
		const gen = string()
		if (gen.parse) {
			const result1 = gen.parse(123)
			assertEquals(result1._tag, "Error")

			const result2 = gen.parse(null)
			assertEquals(result2._tag, "Error")

			const result3 = gen.parse(undefined)
			assertEquals(result3._tag, "Error")
		}
	})

	await t.step(
		"property: always generates strings within length bounds",
		() => {
			fc.assert(
				fc.property(
					fc.integer(),
					fc.integer({ min: 0, max: 20 }),
					fc.integer({ min: 0, max: 20 }),
					(seedValue, min, max) => {
						const seedResult = createSeed(seedValue)
						if (seedResult._tag === "Ok") {
							const actualMin = Math.min(min, max)
							const actualMax = Math.max(min, max)
							const gen = string({ minLength: actualMin, maxLength: actualMax })
							const result = gen.next(seedResult.value)
							return result.value.length >= actualMin &&
								result.value.length <= actualMax
						}
						return true
					},
				),
			)
		},
	)

	await t.step("property: deterministic generation", () => {
		fc.assert(
			fc.property(
				fc.integer(),
				(seedValue) => {
					const seedResult = createSeed(seedValue)
					if (seedResult._tag === "Ok") {
						const gen = string({ minLength: 0, maxLength: 10 })
						const result1 = gen.next(seedResult.value)
						const result2 = gen.next(seedResult.value)
						return result1.value === result2.value &&
							result1.nextSeed.state === result2.nextSeed.state
					}
					return true
				},
			),
		)
	})

	await t.step("property: shrinking always produces shorter strings", () => {
		fc.assert(
			fc.property(
				fc.string({ minLength: 0, maxLength: 20 }),
				(str) => {
					const gen = string()
					const tree = gen.shrink(str)
					const children = tree.children()

					return children.every((child) => child.value.length <= str.length)
				},
			),
		)
	})
})
