import { assertEquals } from "https://deno.land/std@0.213.0/assert/mod.ts"
import * as fc from "https://esm.sh/fast-check@3.15.0"

import createSeed from "../../../random/createSeed/index.ts"
import integer from "./index.ts"

Deno.test("integer generator", async (t) => {
	await t.step("generates integer in default range [-2^31, 2^31-1]", () => {
		const seedResult = createSeed(42)
		if (seedResult._tag === "Ok") {
			const gen = integer()
			const result = gen.next(seedResult.value)
			assertEquals(Number.isInteger(result.value), true)
			assertEquals(result.value >= -(2 ** 31), true)
			assertEquals(result.value <= 2 ** 31 - 1, true)
		}
	})

	await t.step("generates integer in custom range", () => {
		const seedResult = createSeed(42)
		if (seedResult._tag === "Ok") {
			const gen = integer(10, 20)
			const result = gen.next(seedResult.value)
			assertEquals(Number.isInteger(result.value), true)
			assertEquals(result.value >= 10, true)
			assertEquals(result.value <= 20, true)
		}
	})

	await t.step("handles single value range", () => {
		const seedResult = createSeed(42)
		if (seedResult._tag === "Ok") {
			const gen = integer(5, 5)
			const result = gen.next(seedResult.value)
			assertEquals(result.value, 5)
		}
	})

	await t.step("size affects range bias", () => {
		const seedResult = createSeed(42)
		if (seedResult._tag === "Ok") {
			const gen = integer(-1000, 1000)
			// Smaller size should bias towards 0
			const result1 = gen.next(seedResult.value)
			// Size 1 is minimum, should give small values
			assertEquals(result1.size, 1)
		}
	})

	await t.step("shrinks towards zero within bounds", () => {
		const gen = integer(-10, 10)

		// Positive value shrinks towards 0
		const tree1 = gen.shrink(8)
		assertEquals(tree1.value, 8)
		const children1 = tree1.children()
		assertEquals(children1.length > 0, true)
		assertEquals(children1[0].value, 0)

		// Negative value shrinks towards 0
		const tree2 = gen.shrink(-8)
		assertEquals(tree2.value, -8)
		const children2 = tree2.children()
		assertEquals(children2.length > 0, true)
		assertEquals(children2[0].value, 0)

		// Zero doesn't shrink
		const tree3 = gen.shrink(0)
		assertEquals(tree3.value, 0)
		assertEquals(tree3.children().length, 0)
	})

	await t.step("shrinks towards lower bound when zero is out of range", () => {
		const gen = integer(10, 20)
		const tree = gen.shrink(15)
		assertEquals(tree.value, 15)
		const children = tree.children()
		assertEquals(children.length > 0, true)
		// Should shrink towards 10 (lower bound)
		assertEquals(children[0].value, 10)
	})

	await t.step("parses valid integers", () => {
		const gen = integer(-10, 10)
		if (gen.parse) {
			const result = gen.parse(5)
			assertEquals(result._tag, "Ok")
			if (result._tag === "Ok") {
				assertEquals(result.value, 5)
			}
		}
	})

	await t.step("rejects integers outside bounds", () => {
		const gen = integer(0, 10)
		if (gen.parse) {
			const result = gen.parse(-1)
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.type, "ValidationFailed")
			}
		}
	})

	await t.step("rejects non-integers", () => {
		const gen = integer()
		if (gen.parse) {
			const result1 = gen.parse(3.14)
			assertEquals(result1._tag, "Error")

			const result2 = gen.parse("5")
			assertEquals(result2._tag, "Error")

			const result3 = gen.parse(null)
			assertEquals(result3._tag, "Error")
		}
	})

	await t.step("property: always generates within bounds", () => {
		fc.assert(
			fc.property(
				fc.integer(),
				fc.integer({ min: -1000, max: 1000 }),
				fc.integer({ min: -1000, max: 1000 }),
				(seedValue, min, max) => {
					const seedResult = createSeed(seedValue)
					if (seedResult._tag === "Ok") {
						const actualMin = Math.min(min, max)
						const actualMax = Math.max(min, max)
						const gen = integer(actualMin, actualMax)
						const result = gen.next(seedResult.value)
						return result.value >= actualMin && result.value <= actualMax
					}
					return true
				},
			),
		)
	})

	await t.step("property: deterministic generation", () => {
		fc.assert(
			fc.property(
				fc.integer(),
				fc.integer({ min: -1000, max: 1000 }),
				fc.integer({ min: -1000, max: 1000 }),
				(seedValue, min, max) => {
					const seedResult = createSeed(seedValue)
					if (seedResult._tag === "Ok") {
						const actualMin = Math.min(min, max)
						const actualMax = Math.max(min, max)
						const gen = integer(actualMin, actualMax)
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

	await t.step(
		"property: shrinking always produces smaller or equal values",
		() => {
			fc.assert(
				fc.property(
					fc.integer({ min: -100, max: 100 }),
					fc.integer({ min: -100, max: 100 }),
					fc.integer(),
					(min, max, value) => {
						const actualMin = Math.min(min, max)
						const actualMax = Math.max(min, max)
						const gen = integer(actualMin, actualMax)

						// Clamp value to bounds
						const clampedValue = Math.max(actualMin, Math.min(actualMax, value))
						const tree = gen.shrink(clampedValue)
						const children = tree.children()

						// All children should be closer to the shrink target
						const target = actualMin <= 0 && actualMax >= 0 ? 0 : actualMin
						const distance = Math.abs(clampedValue - target)

						return children.every((child) => {
							const childDistance = Math.abs(child.value - target)
							return childDistance <= distance &&
								child.value >= actualMin &&
								child.value <= actualMax
						})
					},
				),
			)
		},
	)
})
