import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.15.0"

import createSeed from "../../../../random/createSeed/index.ts"
import integer from "../../../primitives/integer/index.ts"
import _generateElements from "./index.ts"

Deno.test("_generateElements: generates zero elements when count is 0", () => {
	const gen = integer(0, 100)
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")

	const initialState = {
		seed: seedResult.value,
		elements: [],
		totalSize: 0,
	}

	const result = _generateElements(gen)(0)(initialState)

	assertEquals(result.elements.length, 0)
	assertEquals(result.totalSize, 0)
	assertEquals(result.seed, seedResult.value)
})

Deno.test("_generateElements: generates exact count of elements", () => {
	const gen = integer(0, 100)
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")

	const initialState = {
		seed: seedResult.value,
		elements: [],
		totalSize: 0,
	}

	const result = _generateElements(gen)(5)(initialState)

	assertEquals(result.elements.length, 5)
	assertEquals(result.totalSize, 5) // Each integer has size 1
})

Deno.test("_generateElements: preserves existing elements in state", () => {
	const gen = integer(0, 10)
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")

	const initialState = {
		seed: seedResult.value,
		elements: [99, 98],
		totalSize: 2,
	}

	const result = _generateElements(gen)(3)(initialState)

	assertEquals(result.elements.length, 5)
	assertEquals(result.elements[0], 99)
	assertEquals(result.elements[1], 98)
	assertEquals(result.totalSize, 5)
})

Deno.test("_generateElements: advances seed correctly", () => {
	const gen = integer(0, 100)
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")

	const initialState = {
		seed: seedResult.value,
		elements: [],
		totalSize: 0,
	}

	const result = _generateElements(gen)(3)(initialState)

	// Seed should be different after generation
	assertEquals(result.seed !== seedResult.value, true)
	assertEquals(result.seed.state !== seedResult.value.state, true)
})

Deno.test("_generateElements: property test - generates requested count", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: 0, max: 20 }),
			fc.integer(),
			(count, seedValue) => {
				const gen = integer(0, 100)
				const seedResult = createSeed(seedValue)
				if (seedResult._tag === "Error") return true

				const initialState = {
					seed: seedResult.value,
					elements: [],
					totalSize: 0,
				}

				const result = _generateElements(gen)(count)(initialState)
				return result.elements.length === count
			},
		),
	)
})

Deno.test("_generateElements: deterministic generation", () => {
	const gen = integer(0, 100)
	const seedResult1 = createSeed(12345)
	const seedResult2 = createSeed(12345)
	if (seedResult1._tag === "Error" || seedResult2._tag === "Error") {
		throw new Error("Invalid seed")
	}

	const state1 = _generateElements(gen)(5)({
		seed: seedResult1.value,
		elements: [],
		totalSize: 0,
	})

	const state2 = _generateElements(gen)(5)({
		seed: seedResult2.value,
		elements: [],
		totalSize: 0,
	})

	assertEquals(state1.elements, state2.elements)
	assertEquals(state1.totalSize, state2.totalSize)
})
