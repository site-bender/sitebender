import { assertEquals, assertExists } from "https://deno.land/std/assert/mod.ts"

import type { Seed } from "../../types/index.ts"

import advanceSeed from "./index.ts"

Deno.test("advanceSeed - advances seed deterministically", () => {
	const seed: Seed = { value: 12345, path: [] }
	const nextSeed = advanceSeed(seed)

	assertExists(nextSeed)
	// Should produce a different value
	assertEquals(nextSeed.value !== seed.value, true)
	// Should preserve the path
	assertEquals(nextSeed.path, seed.path)
})

Deno.test("advanceSeed - same seed produces same next value", () => {
	const seed: Seed = { value: 99999, path: [] }
	const next1 = advanceSeed(seed)
	const next2 = advanceSeed(seed)

	// Deterministic: same input, same output
	assertEquals(next1.value, next2.value)
	assertEquals(next1.path, next2.path)
})

Deno.test("advanceSeed - creates different sequences for different seeds", () => {
	const seed1: Seed = { value: 100, path: [] }
	const seed2: Seed = { value: 200, path: [] }

	const next1 = advanceSeed(seed1)
	const next2 = advanceSeed(seed2)

	// Different seeds should produce different sequences
	assertEquals(next1.value !== next2.value, true)
})

Deno.test("advanceSeed - maintains path through advancement", () => {
	const seed: Seed = { value: 5555, path: [1, 2, 3] }
	const nextSeed = advanceSeed(seed)

	// Path should be preserved unchanged
	assertEquals(nextSeed.path, [1, 2, 3])
	assertEquals(nextSeed.path, seed.path)
})

Deno.test("advanceSeed - produces valid 32-bit unsigned integers", () => {
	const seed: Seed = { value: 42, path: [] }
	const nextSeed = advanceSeed(seed)

	// Should be a positive integer
	assertEquals(nextSeed.value >= 0, true)
	assertEquals(Number.isInteger(nextSeed.value), true)
	// Should be within 32-bit unsigned range
	assertEquals(nextSeed.value <= 0xFFFFFFFF, true)
})

Deno.test("advanceSeed - handles edge case of zero seed", () => {
	const seed: Seed = { value: 0, path: [] }
	const nextSeed = advanceSeed(seed)

	// Should still produce a valid next value
	assertExists(nextSeed)
	assertEquals(nextSeed.value >= 0, true)
})

Deno.test("advanceSeed - handles maximum 32-bit value", () => {
	const seed: Seed = { value: 0xFFFFFFFF, path: [] }
	const nextSeed = advanceSeed(seed)

	// Should wrap around properly
	assertExists(nextSeed)
	assertEquals(nextSeed.value >= 0, true)
	assertEquals(nextSeed.value <= 0xFFFFFFFF, true)
})

Deno.test("advanceSeed - produces good distribution (basic check)", () => {
	let seed: Seed = { value: 12345, path: [] }
	const values = new Set<number>()

	// Generate 100 values
	for (let i = 0; i < 100; i++) {
		seed = advanceSeed(seed)
		values.add(seed.value)
	}

	// Should produce 100 unique values (no short cycles)
	assertEquals(values.size, 100)
})

Deno.test("advanceSeed - sequence is repeatable", () => {
	let seed1: Seed = { value: 777, path: [] }
	let seed2: Seed = { value: 777, path: [] }

	const sequence1: number[] = []
	const sequence2: number[] = []

	// Generate sequence from first seed
	for (let i = 0; i < 10; i++) {
		seed1 = advanceSeed(seed1)
		sequence1.push(seed1.value)
	}

	// Generate sequence from second identical seed
	for (let i = 0; i < 10; i++) {
		seed2 = advanceSeed(seed2)
		sequence2.push(seed2.value)
	}

	// Sequences should be identical
	assertEquals(sequence1, sequence2)
})

Deno.test("advanceSeed - does not mutate original seed", () => {
	const originalSeed: Seed = { value: 8888, path: [4, 5, 6] }
	const seedCopy = { ...originalSeed, path: [...originalSeed.path] }

	advanceSeed(originalSeed)

	// Original should be unchanged
	assertEquals(originalSeed.value, seedCopy.value)
	assertEquals(originalSeed.path, seedCopy.path)
})
