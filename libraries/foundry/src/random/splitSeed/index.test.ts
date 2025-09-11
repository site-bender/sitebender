import {
	assertEquals,
	assertExists,
	assertNotEquals,
} from "https://deno.land/std/assert/mod.ts"

import type { Seed } from "../../types/index.ts"

import advanceSeed from "../advanceSeed/index.ts"
import splitSeed from "./index.ts"

Deno.test("splitSeed - creates two different seeds from one", () => {
	const seed: Seed = { value: 12345, path: [] }
	const [left, right] = splitSeed(seed)

	assertExists(left)
	assertExists(right)

	// Seeds should be different from each other
	assertNotEquals(left.value, right.value)

	// Seeds should be different from parent
	assertNotEquals(left.value, seed.value)
	assertNotEquals(right.value, seed.value)
})

Deno.test("splitSeed - appends to path for tracking", () => {
	const seed: Seed = { value: 99999, path: [] }
	const [left, right] = splitSeed(seed)

	// Left branch gets 0 appended to path
	assertEquals(left.path, [0])

	// Right branch gets 1 appended to path
	assertEquals(right.path, [1])
})

Deno.test("splitSeed - preserves existing path", () => {
	const seed: Seed = { value: 777, path: [2, 3] }
	const [left, right] = splitSeed(seed)

	// Paths should extend the parent path
	assertEquals(left.path, [2, 3, 0])
	assertEquals(right.path, [2, 3, 1])
})

Deno.test("splitSeed - deterministic splitting", () => {
	const seed: Seed = { value: 42, path: [] }

	const [left1, right1] = splitSeed(seed)
	const [left2, right2] = splitSeed(seed)

	// Same seed should always produce same splits
	assertEquals(left1.value, left2.value)
	assertEquals(right1.value, right2.value)
	assertEquals(left1.path, left2.path)
	assertEquals(right1.path, right2.path)
})

Deno.test("splitSeed - independent branches don't interfere", () => {
	const seed: Seed = { value: 1000, path: [] }
	const [left, right] = splitSeed(seed)

	// Advance left branch
	const left1 = advanceSeed(left)
	const left2 = advanceSeed(left1)

	// Advance right branch
	const right1 = advanceSeed(right)
	const right2 = advanceSeed(right1)

	// Sequences should be completely independent
	assertNotEquals(left1.value, right1.value)
	assertNotEquals(left2.value, right2.value)
})

Deno.test("splitSeed - can split recursively", () => {
	const seed: Seed = { value: 5555, path: [] }

	// First split
	const [left, right] = splitSeed(seed)

	// Split the left branch
	const [leftLeft, leftRight] = splitSeed(left)

	// Split the right branch
	const [rightLeft, rightRight] = splitSeed(right)

	// All four seeds should be different
	const values = new Set([
		leftLeft.value,
		leftRight.value,
		rightLeft.value,
		rightRight.value,
	])
	assertEquals(values.size, 4)

	// Paths should reflect the tree structure
	assertEquals(leftLeft.path, [0, 0])
	assertEquals(leftRight.path, [0, 1])
	assertEquals(rightLeft.path, [1, 0])
	assertEquals(rightRight.path, [1, 1])
})

Deno.test("splitSeed - handles edge case of zero seed", () => {
	const seed: Seed = { value: 0, path: [] }
	const [left, right] = splitSeed(seed)

	// Should still produce valid different seeds
	assertExists(left)
	assertExists(right)
	assertNotEquals(left.value, right.value)
	assertEquals(left.value > 0, true)
	assertEquals(right.value > 0, true)
})

Deno.test("splitSeed - does not mutate original seed", () => {
	const originalSeed: Seed = { value: 8888, path: [4, 5] }
	const seedCopy = { ...originalSeed, path: [...originalSeed.path] }

	splitSeed(originalSeed)

	// Original should be unchanged
	assertEquals(originalSeed.value, seedCopy.value)
	assertEquals(originalSeed.path, seedCopy.path)
})

Deno.test("splitSeed - produces good distribution", () => {
	// Test that splits don't cluster
	const seeds = [1, 100, 1000, 10000, 100000]
	const allSplitValues = new Set<number>()

	for (const value of seeds) {
		const [left, right] = splitSeed({ value, path: [] })
		allSplitValues.add(left.value)
		allSplitValues.add(right.value)
	}

	// All splits should be unique (no collisions)
	assertEquals(allSplitValues.size, seeds.length * 2)
})
