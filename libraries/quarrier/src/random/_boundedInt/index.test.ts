import { assertEquals } from "https://deno.land/std@0.213.0/assert/mod.ts"
import * as fc from "https://esm.sh/fast-check@3.15.0"

import createSeed from "../createSeed/index.ts"
import _boundedInt from "./index.ts"

Deno.test("_boundedInt", async (t) => {
	await t.step("generates integer in specified range", () => {
		const seed = createSeed(42)
		if (seed._tag === "Ok") {
			const result = _boundedInt(seed.value, 1, 10)
			assertEquals(result._tag, "Ok")
			if (result._tag === "Ok") {
				assertEquals(result.value.value >= 1, true)
				assertEquals(result.value.value <= 10, true)
				assertEquals(Math.floor(result.value.value), result.value.value)
			}
		}
	})

	await t.step("handles single value range", () => {
		const seed = createSeed(42)
		if (seed._tag === "Ok") {
			const result = _boundedInt(seed.value, 5, 5)
			assertEquals(result._tag, "Ok")
			if (result._tag === "Ok") {
				assertEquals(result.value.value, 5)
				// Seed should be unchanged for single value
				assertEquals(result.value.nextSeed.state, seed.value.state)
				assertEquals(result.value.nextSeed.stream, seed.value.stream)
			}
		}
	})

	await t.step("rejects non-integer min", () => {
		const seed = createSeed(42)
		if (seed._tag === "Ok") {
			const result = _boundedInt(seed.value, 3.14, 10)
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.type, "InvalidBounds")
				if (result.error.type === "InvalidBounds") {
					assertEquals(result.error.reason, "Bounds must be integers")
				}
			}
		}
	})

	await t.step("rejects non-integer max", () => {
		const seed = createSeed(42)
		if (seed._tag === "Ok") {
			const result = _boundedInt(seed.value, 1, 10.5)
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.type, "InvalidBounds")
				if (result.error.type === "InvalidBounds") {
					assertEquals(result.error.reason, "Bounds must be integers")
				}
			}
		}
	})

	await t.step("rejects min > max", () => {
		const seed = createSeed(42)
		if (seed._tag === "Ok") {
			const result = _boundedInt(seed.value, 10, 1)
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.type, "InvalidBounds")
				if (result.error.type === "InvalidBounds") {
					assertEquals(
						result.error.reason,
						"Min must be less than or equal to max",
					)
				}
			}
		}
	})

	await t.step("handles negative ranges", () => {
		const seed = createSeed(42)
		if (seed._tag === "Ok") {
			const result = _boundedInt(seed.value, -10, -1)
			assertEquals(result._tag, "Ok")
			if (result._tag === "Ok") {
				assertEquals(result.value.value >= -10, true)
				assertEquals(result.value.value <= -1, true)
			}
		}
	})

	await t.step("handles ranges crossing zero", () => {
		const seed = createSeed(42)
		if (seed._tag === "Ok") {
			const result = _boundedInt(seed.value, -5, 5)
			assertEquals(result._tag, "Ok")
			if (result._tag === "Ok") {
				assertEquals(result.value.value >= -5, true)
				assertEquals(result.value.value <= 5, true)
			}
		}
	})

	await t.step("property: always in range", () => {
		fc.assert(
			fc.property(
				fc.integer(),
				fc.integer({ min: -1000000, max: 1000000 }),
				fc.integer({ min: -1000000, max: 1000000 }),
				(state, a, b) => {
					const min = Math.min(a, b)
					const max = Math.max(a, b)
					const seed = createSeed(state)
					if (seed._tag === "Ok") {
						const result = _boundedInt(seed.value, min, max)
						if (result._tag === "Ok") {
							return result.value.value >= min && result.value.value <= max
						}
					}
					return true
				},
			),
		)
	})

	await t.step("property: deterministic", () => {
		fc.assert(
			fc.property(
				fc.integer(),
				fc.integer({ min: -100, max: 100 }),
				fc.integer({ min: -100, max: 100 }),
				(state, a, b) => {
					const min = Math.min(a, b)
					const max = Math.max(a, b)
					const seed = createSeed(state)
					if (seed._tag === "Ok") {
						const result1 = _boundedInt(seed.value, min, max)
						const result2 = _boundedInt(seed.value, min, max)
						if (result1._tag === "Ok" && result2._tag === "Ok") {
							return result1.value.value === result2.value.value &&
								result1.value.nextSeed.state === result2.value.nextSeed.state
						}
					}
					return true
				},
			),
		)
	})

	await t.step("property: good distribution for small ranges", () => {
		const seed = createSeed(42)
		if (seed._tag === "Ok") {
			const min = 1
			const max = 6 // Dice roll
			const counts = new Map<number, number>()

			let currentSeed = seed.value
			const iterations = 6000

			for (let i = 0; i < iterations; i++) {
				const result = _boundedInt(currentSeed, min, max)
				if (result._tag === "Ok") {
					const value = result.value.value
					counts.set(value, (counts.get(value) || 0) + 1)
					currentSeed = result.value.nextSeed
				}
			}

			// Each value should appear roughly 1000 times (±20%)
			const expected = iterations / 6
			for (let i = min; i <= max; i++) {
				const count = counts.get(i) || 0
				assertEquals(count > expected * 0.8, true)
				assertEquals(count < expected * 1.2, true)
			}
		}
	})

	await t.step("property: unbiased for power-of-2 ranges", () => {
		const seed = createSeed(42)
		if (seed._tag === "Ok") {
			const min = 0
			const max = 15 // 16 values (power of 2)
			const counts = new Map<number, number>()

			let currentSeed = seed.value
			const iterations = 16000

			for (let i = 0; i < iterations; i++) {
				const result = _boundedInt(currentSeed, min, max)
				if (result._tag === "Ok") {
					const value = result.value.value
					counts.set(value, (counts.get(value) || 0) + 1)
					currentSeed = result.value.nextSeed
				}
			}

			// Each value should appear roughly 1000 times (±10% for power of 2)
			const expected = iterations / 16
			for (let i = min; i <= max; i++) {
				const count = counts.get(i) || 0
				assertEquals(count > expected * 0.9, true)
				assertEquals(count < expected * 1.1, true)
			}
		}
	})

	await t.step("handles large ranges", () => {
		const seed = createSeed(42)
		if (seed._tag === "Ok") {
			const result = _boundedInt(seed.value, 0, 1000000000)
			assertEquals(result._tag, "Ok")
			if (result._tag === "Ok") {
				assertEquals(result.value.value >= 0, true)
				assertEquals(result.value.value <= 1000000000, true)
			}
		}
	})
})
