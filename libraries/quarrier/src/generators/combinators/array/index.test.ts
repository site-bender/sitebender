import {
	assertEquals,
	assertExists,
} from "https://deno.land/std@0.224.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.15.0"

import type { ShrinkTree } from "../../../types/index.ts"

import createSeed from "../../../random/createSeed/index.ts"
import boolean from "../../primitives/boolean/index.ts"
import integer from "../../primitives/integer/index.ts"
import array from "./index.ts"

Deno.test("array: generates empty array with minSize 0", () => {
	const gen = array(integer(1, 10), { minSize: 0, maxSize: 0 })
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")
	const seed = seedResult.value
	const result = gen.next(seed)

	assertEquals(result.value.length, 0)
	assertEquals(result.size, 0)
	assertExists(result.nextSeed)
})

Deno.test("array: generates array within specified size bounds", () => {
	fc.assert(
		fc.property(fc.integer(), (seedValue) => {
			const gen = array(integer(0, 100), { minSize: 2, maxSize: 5 })
			const seedResult = createSeed(seedValue)
			if (seedResult._tag === "Error") return true // Skip invalid seeds
			const seed = seedResult.value
			const result = gen.next(seed)

			return result.value.length >= 2 && result.value.length <= 5
		}),
	)
})

Deno.test("array: generates arrays with correct element types", () => {
	fc.assert(
		fc.property(fc.integer(), (seedValue) => {
			const gen = array(boolean, { minSize: 1, maxSize: 10 })
			const seedResult = createSeed(seedValue)
			if (seedResult._tag === "Error") return true // Skip invalid seeds
			const seed = seedResult.value
			const result = gen.next(seed)

			return result.value.every((v: boolean) => typeof v === "boolean")
		}),
	)
})

Deno.test("array: uses default bounds when not specified", () => {
	const gen = array(integer(0, 10))
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")
	const seed = seedResult.value
	const result = gen.next(seed)

	// Default should be 0 to 10
	assertEquals(result.value.length >= 0, true)
	assertEquals(result.value.length <= 10, true)
})

Deno.test("array: shrinks to smaller arrays", () => {
	const gen = array(integer(0, 100), { minSize: 0, maxSize: 10 })
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")
	const seed = seedResult.value
	const result = gen.next(seed)

	if (result.value.length > 0) {
		const shrinkTree = gen.shrink(result.value)
		assertEquals(shrinkTree.value, result.value)

		const children = shrinkTree.children()
		// Should have shrinks available
		assertEquals(children.length > 0, true)

		// First shrink should be smaller
		if (children.length > 0) {
			assertEquals(children[0].value.length < result.value.length, true)
		}
	}
})

Deno.test("array: shrinks empty array to no children", () => {
	const gen = array(integer(0, 10))
	const shrinkTree = gen.shrink([])

	assertEquals(shrinkTree.value, [])
	assertEquals(shrinkTree.children().length, 0)
})

Deno.test("array: shrinks elements as well as array size", () => {
	const gen = array(integer(0, 100))
	const original = [50, 75, 100]
	const shrinkTree = gen.shrink(original)

	const children = shrinkTree.children()
	assertEquals(children.length > 0, true)

	// Should include shrinks that reduce array size
	const hasSmallerArray = children.some((
		child: ShrinkTree<readonly number[]>,
	) => child.value.length < original.length)
	assertEquals(hasSmallerArray, true)

	// Should include shrinks that keep size but shrink elements
	const hasShrunkElements = children.some((
		child: ShrinkTree<readonly number[]>,
	) =>
		child.value.length === original.length &&
		child.value.some((v: number, i: number) => v !== original[i])
	)
	assertEquals(hasShrunkElements, true)
})

Deno.test("array: parses valid arrays", () => {
	const gen = array(integer(0, 100))

	const result1 = gen.parse!([1, 2, 3])
	assertEquals(result1._tag, "Ok")
	if (result1._tag === "Ok") {
		assertEquals(result1.value, [1, 2, 3])
	}

	const result2 = gen.parse!([])
	assertEquals(result2._tag, "Ok")
	if (result2._tag === "Ok") {
		assertEquals(result2.value, [])
	}
})

Deno.test("array: rejects non-arrays", () => {
	const gen = array(integer(0, 100))

	const result1 = gen.parse!("not an array")
	assertEquals(result1._tag, "Error")
	if (result1._tag === "Error") {
		assertEquals(result1.error.type, "TypeMismatch")
	}

	const result2 = gen.parse!(123)
	assertEquals(result2._tag, "Error")

	const result3 = gen.parse!(null)
	assertEquals(result3._tag, "Error")
})

Deno.test("array: rejects arrays with invalid elements", () => {
	const gen = array(integer(0, 100))

	const result = gen.parse!([1, "not a number", 3])
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.type, "ValidationFailed")
	}
})

Deno.test("array: size calculation includes element sizes", () => {
	const gen = array(integer(0, 1000), { minSize: 3, maxSize: 3 })
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")
	const seed = seedResult.value
	const result = gen.next(seed)

	// Size should be array length + sum of element sizes
	// For integers, each has size based on magnitude
	assertEquals(result.size > result.value.length, true)
})

Deno.test("array: deterministic generation", () => {
	const gen = array(integer(0, 100), { minSize: 5, maxSize: 5 })
	const seedResult1 = createSeed(12345)
	const seedResult2 = createSeed(12345)
	if (seedResult1._tag === "Error" || seedResult2._tag === "Error") {
		throw new Error("Invalid seed")
	}
	const seed1 = seedResult1.value
	const seed2 = seedResult2.value

	const result1 = gen.next(seed1)
	const result2 = gen.next(seed2)

	assertEquals(result1.value, result2.value)
})
