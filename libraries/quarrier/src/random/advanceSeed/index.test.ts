import {
	assertEquals,
	assertNotEquals,
} from "https://deno.land/std@0.213.0/assert/mod.ts"
import * as fc from "https://esm.sh/fast-check@3.15.0"

import _nextUint32 from "../_nextUint32/index.ts"
import createSeed from "../createSeed/index.ts"
import advanceSeed from "./index.ts"

Deno.test("advanceSeed", async (t) => {
	await t.step("advances seed to next state", () => {
		const seed = createSeed(42)
		if (seed._tag === "Ok") {
			const advanced = advanceSeed(seed.value)
			assertNotEquals(advanced.state, seed.value.state)
			assertEquals(advanced.stream, seed.value.stream) // Stream unchanged
		}
	})

	await t.step("preserves stream value", () => {
		const seed = createSeed(12345, 999)
		if (seed._tag === "Ok") {
			const advanced = advanceSeed(seed.value)
			assertEquals(advanced.stream, seed.value.stream)
		}
	})

	await t.step("produces same result as nextUint32 nextSeed", () => {
		const seed = createSeed(42)
		if (seed._tag === "Ok") {
			const advanced = advanceSeed(seed.value)
			const { nextSeed } = _nextUint32(seed.value)
			assertEquals(advanced.state, nextSeed.state)
			assertEquals(advanced.stream, nextSeed.stream)
		}
	})

	await t.step("can be chained multiple times", () => {
		const seed = createSeed(100)
		if (seed._tag === "Ok") {
			const seed1 = advanceSeed(seed.value)
			const seed2 = advanceSeed(seed1)
			const seed3 = advanceSeed(seed2)

			assertNotEquals(seed1.state, seed.value.state)
			assertNotEquals(seed2.state, seed1.state)
			assertNotEquals(seed3.state, seed2.state)

			// All should have same stream
			assertEquals(seed1.stream, seed.value.stream)
			assertEquals(seed2.stream, seed.value.stream)
			assertEquals(seed3.stream, seed.value.stream)
		}
	})

	await t.step(
		"property: deterministic - same seed advances to same state",
		() => {
			fc.assert(
				fc.property(fc.integer(), fc.integer(), (state, stream) => {
					const seed = createSeed(state, stream)
					if (seed._tag === "Ok") {
						const advanced1 = advanceSeed(seed.value)
						const advanced2 = advanceSeed(seed.value)
						return advanced1.state === advanced2.state &&
							advanced1.stream === advanced2.stream
					}
					return true
				}),
			)
		},
	)

	await t.step("property: always produces non-zero state", () => {
		fc.assert(
			fc.property(fc.integer(), (state) => {
				const seed = createSeed(state)
				if (seed._tag === "Ok") {
					const advanced = advanceSeed(seed.value)
					return advanced.state > 0
				}
				return true
			}),
		)
	})

	await t.step(
		"property: advancing n times equals n calls to nextUint32",
		() => {
			fc.assert(
				fc.property(fc.integer(), fc.nat({ max: 10 }), (state, n) => {
					const seed = createSeed(state)
					if (seed._tag === "Ok") {
						// Advance using advanceSeed
						let currentSeed = seed.value
						for (let i = 0; i < n; i++) {
							currentSeed = advanceSeed(currentSeed)
						}

						// Advance using nextUint32
						let nextSeed = seed.value
						for (let i = 0; i < n; i++) {
							const result = _nextUint32(nextSeed)
							nextSeed = result.nextSeed
						}

						return currentSeed.state === nextSeed.state &&
							currentSeed.stream === nextSeed.stream
					}
					return true
				}),
			)
		},
	)

	await t.step("creates different sequence than original", () => {
		const seed = createSeed(42)
		if (seed._tag === "Ok") {
			const values1 = []
			const values2 = []

			let current1 = seed.value
			let current2 = advanceSeed(seed.value) // Start from advanced seed

			for (let i = 0; i < 10; i++) {
				const result1 = _nextUint32(current1)
				const result2 = _nextUint32(current2)
				values1.push(result1.value)
				values2.push(result2.value)
				current1 = result1.nextSeed
				current2 = result2.nextSeed
			}

			// Sequences should be offset by one
			for (let i = 0; i < 9; i++) {
				assertEquals(values1[i + 1], values2[i])
			}
		}
	})
})
