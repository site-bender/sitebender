import { assertEquals } from "https://deno.land/std@0.213.0/assert/mod.ts"
import * as fc from "https://esm.sh/fast-check@3.15.0"

import createSeed from "../../../random/createSeed/index.ts"
import boolean from "./index.ts"

Deno.test("boolean generator", async (t) => {
	await t.step("generates a boolean value", () => {
		const seedResult = createSeed(42)
		if (seedResult._tag === "Ok") {
			const result = boolean.next(seedResult.value)
			assertEquals(typeof result.value, "boolean")
			assertEquals(result.value === true || result.value === false, true)
		}
	})

	await t.step("advances the seed", () => {
		const seedResult = createSeed(42)
		if (seedResult._tag === "Ok") {
			const result1 = boolean.next(seedResult.value)
			const result2 = boolean.next(result1.nextSeed)
			// Seeds should be different
			assertEquals(
				result1.nextSeed.state !== seedResult.value.state ||
					result1.nextSeed.stream !== seedResult.value.stream,
				true,
			)
			// Values might be different (50/50 chance)
			assertEquals(typeof result2.value, "boolean")
		}
	})

	await t.step("shrinks to false", () => {
		const tree = boolean.shrink(true)
		// First shrink should be false
		assertEquals(tree.value, true)
		const children = tree.children()
		assertEquals(children.length, 1)
		assertEquals(children[0].value, false)
		// False has no shrinks
		assertEquals(children[0].children().length, 0)
	})

	await t.step("false does not shrink", () => {
		const tree = boolean.shrink(false)
		assertEquals(tree.value, false)
		assertEquals(tree.children().length, 0)
	})

	await t.step("parses boolean values", () => {
		if (boolean.parse) {
			const trueResult = boolean.parse(true)
			assertEquals(trueResult._tag, "Ok")
			if (trueResult._tag === "Ok") {
				assertEquals(trueResult.value, true)
			}

			const falseResult = boolean.parse(false)
			assertEquals(falseResult._tag, "Ok")
			if (falseResult._tag === "Ok") {
				assertEquals(falseResult.value, false)
			}
		}
	})

	await t.step("rejects non-boolean values", () => {
		if (boolean.parse) {
			const stringResult = boolean.parse("true")
			assertEquals(stringResult._tag, "Error")

			const numberResult = boolean.parse(1)
			assertEquals(numberResult._tag, "Error")

			const nullResult = boolean.parse(null)
			assertEquals(nullResult._tag, "Error")
		}
	})

	await t.step("property: generates approximately 50/50 distribution", () => {
		const seedResult = createSeed(12345)
		if (seedResult._tag === "Ok") {
			let trueCount = 0
			let seed = seedResult.value

			const iterations = 10000
			for (let i = 0; i < iterations; i++) {
				const result = boolean.next(seed)
				if (result.value) trueCount++
				seed = result.nextSeed
			}

			const ratio = trueCount / iterations
			// Should be roughly 50/50 (allow 45-55% range)
			assertEquals(ratio > 0.45 && ratio < 0.55, true)
		}
	})

	await t.step("property: deterministic generation", () => {
		fc.assert(
			fc.property(fc.integer(), (seedValue) => {
				const seedResult = createSeed(seedValue)
				if (seedResult._tag === "Ok") {
					const result1 = boolean.next(seedResult.value)
					const result2 = boolean.next(seedResult.value)
					return result1.value === result2.value &&
						result1.nextSeed.state === result2.nextSeed.state
				}
				return true
			}),
		)
	})
})
