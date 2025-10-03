import {
	assertEquals,
	assertNotEquals,
} from "https://deno.land/std@0.213.0/assert/mod.ts"
import * as fc from "https://esm.sh/fast-check@3.15.0"

import createSeed from "../createSeed/index.ts"
import _nextUint32 from "./index.ts"

Deno.test("_nextUint32", async (t) => {
	await t.step("generates a 32-bit unsigned integer", () => {
		const seed = createSeed(12345)
		if (seed._tag === "Ok") {
			const result = _nextUint32(seed.value)
			assertEquals(typeof result.value, "number")
			assertEquals(result.value >= 0, true)
			assertEquals(result.value <= 0xFFFFFFFF, true)
			assertEquals(Math.floor(result.value), result.value)
		}
	})

	await t.step("returns a different seed", () => {
		const seed = createSeed(12345)
		if (seed._tag === "Ok") {
			const result = _nextUint32(seed.value)
			assertNotEquals(result.nextSeed.state, seed.value.state)
			assertEquals(result.nextSeed.stream, seed.value.stream) // Stream unchanged
		}
	})

	await t.step("produces different values for different seeds", () => {
		const seed1 = createSeed(12345)
		const seed2 = createSeed(54321)
		if (seed1._tag === "Ok" && seed2._tag === "Ok") {
			const result1 = _nextUint32(seed1.value)
			const result2 = _nextUint32(seed2.value)
			assertNotEquals(result1.value, result2.value)
		}
	})

	await t.step("produces a sequence of different values", () => {
		const seed = createSeed(42)
		if (seed._tag === "Ok") {
			const values = new Set<number>()
			let currentSeed = seed.value

			for (let i = 0; i < 100; i++) {
				const result = _nextUint32(currentSeed)
				values.add(result.value)
				currentSeed = result.nextSeed
			}

			// Should have 100 unique values (no immediate cycles)
			assertEquals(values.size, 100)
		}
	})

	await t.step(
		"property: deterministic - same seed produces same value",
		() => {
			fc.assert(
				fc.property(fc.integer(), fc.integer(), (state, stream) => {
					const seed = createSeed(state, stream)
					if (seed._tag === "Ok") {
						const result1 = _nextUint32(seed.value)
						const result2 = _nextUint32(seed.value)
						return result1.value === result2.value &&
							result1.nextSeed.state === result2.nextSeed.state &&
							result1.nextSeed.stream === result2.nextSeed.stream
					}
					return true
				}),
			)
		},
	)

	await t.step(
		"property: always produces valid 32-bit unsigned integers",
		() => {
			fc.assert(
				fc.property(fc.integer(), (state) => {
					const seed = createSeed(state)
					if (seed._tag === "Ok") {
						const result = _nextUint32(seed.value)
						return result.value >= 0 &&
							result.value <= 0xFFFFFFFF &&
							Math.floor(result.value) === result.value
					}
					return true
				}),
			)
		},
	)

	await t.step("property: nextSeed always has non-zero state", () => {
		fc.assert(
			fc.property(fc.integer(), (state) => {
				const seed = createSeed(state)
				if (seed._tag === "Ok") {
					const result = _nextUint32(seed.value)
					return result.nextSeed.state > 0
				}
				return true
			}),
		)
	})

	await t.step("property: produces good distribution", () => {
		const seed = createSeed(42)
		if (seed._tag === "Ok") {
			const buckets = new Array(10).fill(0)
			let currentSeed = seed.value
			const iterations = 10000

			for (let i = 0; i < iterations; i++) {
				const result = _nextUint32(currentSeed)
				const bucket = Math.floor((result.value / 0x100000000) * 10)
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
})
