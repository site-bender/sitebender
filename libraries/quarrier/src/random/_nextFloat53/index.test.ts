import { assertEquals } from "https://deno.land/std@0.213.0/assert/mod.ts"
import * as fc from "https://esm.sh/fast-check@3.15.0"

import _nextFloat53 from "./index.ts"
import createSeed from "../createSeed/index.ts"
import _nextUint32 from "../_nextUint32/index.ts"

Deno.test("_nextFloat53", async (t) => {
	await t.step("generates float in range [0, 1)", () => {
		const seed = createSeed(42)
		if (seed._tag === "Ok") {
			const result = _nextFloat53(seed.value)
			assertEquals(result.value >= 0, true)
			assertEquals(result.value < 1, true)
		}
	})

	await t.step("generates different values for different seeds", () => {
		const seed1 = createSeed(12345)
		const seed2 = createSeed(54321)
		if (seed1._tag === "Ok" && seed2._tag === "Ok") {
			const result1 = _nextFloat53(seed1.value)
			const result2 = _nextFloat53(seed2.value)
			assertEquals(result1.value !== result2.value, true)
		}
	})

	await t.step("advances seed twice (uses two uint32 calls)", () => {
		const seed = createSeed(42)
		if (seed._tag === "Ok") {
			const floatResult = _nextFloat53(seed.value)

			// Manually advance twice with uint32
			const uint1 = _nextUint32(seed.value)
			const uint2 = _nextUint32(uint1.nextSeed)

			// Should have same final seed
			assertEquals(floatResult.nextSeed.state, uint2.nextSeed.state)
			assertEquals(floatResult.nextSeed.stream, uint2.nextSeed.stream)
		}
	})

	await t.step("property: always in range [0, 1)", () => {
		fc.assert(
			fc.property(fc.integer(), (state) => {
				const seed = createSeed(state)
				if (seed._tag === "Ok") {
					const result = _nextFloat53(seed.value)
					return result.value >= 0 && result.value < 1
				}
				return true
			}),
		)
	})

	await t.step(
		"property: deterministic - same seed produces same float",
		() => {
			fc.assert(
				fc.property(fc.integer(), fc.integer(), (state, stream) => {
					const seed = createSeed(state, stream)
					if (seed._tag === "Ok") {
						const result1 = _nextFloat53(seed.value)
						const result2 = _nextFloat53(seed.value)
						return result1.value === result2.value &&
							result1.nextSeed.state === result2.nextSeed.state &&
							result1.nextSeed.stream === result2.nextSeed.stream
					}
					return true
				}),
			)
		},
	)

	await t.step("property: good distribution", () => {
		const seed = createSeed(42)
		if (seed._tag === "Ok") {
			const buckets = new Array(10).fill(0)
			let currentSeed = seed.value
			const iterations = 10000

			for (let i = 0; i < iterations; i++) {
				const result = _nextFloat53(currentSeed)
				const bucket = Math.floor(result.value * 10)
				buckets[bucket]++
				currentSeed = result.nextSeed
			}

			// Each bucket should have roughly 1000 values (±20%)
			const expected = iterations / 10
			for (const count of buckets) {
				assertEquals(count > expected * 0.8, true)
				assertEquals(count < expected * 1.2, true)
			}
		}
	})

	await t.step("property: never exactly 0 or 1", () => {
		fc.assert(
			fc.property(fc.integer(), (state) => {
				const seed = createSeed(state)
				if (seed._tag === "Ok") {
					let currentSeed = seed.value
					// Test many values from this seed
					for (let i = 0; i < 100; i++) {
						const result = _nextFloat53(currentSeed)
						if (result.value === 0 || result.value === 1) {
							return false
						}
						currentSeed = result.nextSeed
					}
					return true
				}
				return true
			}),
		)
	})

	await t.step("can generate very small values near 0", () => {
		let foundSmall = false
		const seed = createSeed(42)
		if (seed._tag === "Ok") {
			let currentSeed = seed.value
			for (let i = 0; i < 10000; i++) {
				const result = _nextFloat53(currentSeed)
				if (result.value < 0.001) {
					foundSmall = true
					break
				}
				currentSeed = result.nextSeed
			}
			assertEquals(foundSmall, true)
		}
	})

	await t.step("can generate values very close to 1", () => {
		let foundLarge = false
		const seed = createSeed(42)
		if (seed._tag === "Ok") {
			let currentSeed = seed.value
			for (let i = 0; i < 10000; i++) {
				const result = _nextFloat53(currentSeed)
				if (result.value > 0.999) {
					foundLarge = true
					break
				}
				currentSeed = result.nextSeed
			}
			assertEquals(foundLarge, true)
		}
	})
})
