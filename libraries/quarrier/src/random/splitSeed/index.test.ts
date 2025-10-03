import {
	assertEquals,
	assertNotEquals,
} from "https://deno.land/std@0.213.0/assert/mod.ts"
import * as fc from "https://esm.sh/fast-check@3.15.0"

import _nextUint32 from "../_nextUint32/index.ts"
import createSeed from "../createSeed/index.ts"
import splitSeed from "./index.ts"

Deno.test("splitSeed", async (t) => {
	await t.step("produces two different seeds", () => {
		const seed = createSeed(42)
		if (seed._tag === "Ok") {
			const { left, right } = splitSeed(seed.value)
			assertNotEquals(left.state, right.state)
			assertNotEquals(left.stream, right.stream)
		}
	})

	await t.step("produces seeds with odd streams", () => {
		const seed = createSeed(12345)
		if (seed._tag === "Ok") {
			const { left, right } = splitSeed(seed.value)
			assertEquals(left.stream % 2, 1)
			assertEquals(right.stream % 2, 1)
		}
	})

	await t.step("produces seeds with non-zero states", () => {
		const seed = createSeed(0)
		if (seed._tag === "Ok") {
			const { left, right } = splitSeed(seed.value)
			assertEquals(left.state > 0, true)
			assertEquals(right.state > 0, true)
		}
	})

	await t.step(
		"property: deterministic - same seed produces same splits",
		() => {
			fc.assert(
				fc.property(fc.integer(), (state) => {
					const seed = createSeed(state)
					if (seed._tag === "Ok") {
						const split1 = splitSeed(seed.value)
						const split2 = splitSeed(seed.value)
						return split1.left.state === split2.left.state &&
							split1.left.stream === split2.left.stream &&
							split1.right.state === split2.right.state &&
							split1.right.stream === split2.right.stream
					}
					return true
				}),
			)
		},
	)

	await t.step("property: different seeds produce different splits", () => {
		fc.assert(
			fc.property(fc.integer(), fc.integer(), (state1, state2) => {
				// Only test when states are different
				if (state1 === state2) return true

				const seed1 = createSeed(state1)
				const seed2 = createSeed(state2)
				if (seed1._tag === "Ok" && seed2._tag === "Ok") {
					const split1 = splitSeed(seed1.value)
					const split2 = splitSeed(seed2.value)
					// At least one of the split seeds should be different
					return split1.left.state !== split2.left.state ||
						split1.left.stream !== split2.left.stream ||
						split1.right.state !== split2.right.state ||
						split1.right.stream !== split2.right.stream
				}
				return true
			}),
		)
	})

	await t.step("left and right generate independent sequences", () => {
		const seed = createSeed(42)
		if (seed._tag === "Ok") {
			const { left, right } = splitSeed(seed.value)

			// Generate 100 values from each
			const leftValues = []
			const rightValues = []
			let leftSeed = left
			let rightSeed = right

			for (let i = 0; i < 100; i++) {
				const leftResult = _nextUint32(leftSeed)
				const rightResult = _nextUint32(rightSeed)
				leftValues.push(leftResult.value)
				rightValues.push(rightResult.value)
				leftSeed = leftResult.nextSeed
				rightSeed = rightResult.nextSeed
			}

			// Check that sequences are different
			let differences = 0
			for (let i = 0; i < 100; i++) {
				if (leftValues[i] !== rightValues[i]) {
					differences++
				}
			}

			// Should have many differences (at least 90%)
			assertEquals(differences > 90, true)
		}
	})

	await t.step("property: split seeds have valid structure", () => {
		fc.assert(
			fc.property(fc.integer(), (state) => {
				const seed = createSeed(state)
				if (seed._tag === "Ok") {
					const { left, right } = splitSeed(seed.value)
					return left.state > 0 && left.state <= 0xFFFFFFFF &&
						right.state > 0 && right.state <= 0xFFFFFFFF &&
						left.stream % 2 === 1 &&
						right.stream % 2 === 1
				}
				return true
			}),
		)
	})
})
