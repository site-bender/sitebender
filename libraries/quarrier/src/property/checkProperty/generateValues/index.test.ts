import err from "@sitebender/toolsmith/monads/result/err/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import { assertEquals, assertExists } from "https://deno.land/std/assert/mod.ts"

import type { Arbitrary } from "../../../types/index.ts"

import generateValues from "./index.ts"

Deno.test("generateValues - generates values from multiple arbitraries", () => {
	const seed = { value: 12345, path: [] }

	const arbitraries: ReadonlyArray<Arbitrary<number>> = [
		{ generator: (s) => ok(s.value % 10) },
		{ generator: (s) => ok(s.value % 100) },
		{ generator: (s) => ok(s.value % 1000) },
	]

	const result = generateValues(arbitraries, seed, 42)

	assertExists(result)
	assertEquals(result.error, null)
	assertEquals(result.values.length, 3)
	// First value: 12345 % 10 = 5
	assertEquals(result.values[0], 5)
})

Deno.test("generateValues - returns empty values for empty arbitraries", () => {
	const seed = { value: 12345, path: [] }
	const arbitraries: ReadonlyArray<Arbitrary<number>> = []

	const result = generateValues(arbitraries, seed, 42)

	assertExists(result)
	assertEquals(result.error, null)
	assertEquals(result.values.length, 0)
})

Deno.test("generateValues - stops on first generator failure", () => {
	const seed = { value: 12345, path: [] }

	const arbitraries: ReadonlyArray<Arbitrary<number>> = [
		{ generator: (s) => ok(s.value % 10) },
		{
			generator: (_s) =>
				err({ type: "GenerationFailed", reason: "Test error" }),
		},
		{ generator: (s) => ok(s.value % 1000) }, // Should not be called
	]

	const result = generateValues(arbitraries, seed, 42)

	assertExists(result)
	assertExists(result.error)
	assertEquals(isError(result.error), true)
	// Should only have the first value
	assertEquals(result.values.length, 1)
	assertEquals(result.values[0], 5)
})

Deno.test("generateValues - uses different seeds for each generator", () => {
	const seed = { value: 100, path: [] }

	// Generators that expose their seed values
	const arbitraries: ReadonlyArray<Arbitrary<number>> = [
		{ generator: (s) => ok(s.value) },
		{ generator: (s) => ok(s.value) },
		{ generator: (s) => ok(s.value) },
	]

	const result = generateValues(arbitraries, seed, 42)

	assertExists(result)
	assertEquals(result.error, null)
	assertEquals(result.values.length, 3)

	// Each value should be different (different seeds)
	const [v1, v2, v3] = result.values
	assertEquals(v1 !== v2, true)
	assertEquals(v2 !== v3, true)
	assertEquals(v1 !== v3, true)
})

Deno.test("generateValues - preserves seed path", () => {
	const seed = { value: 12345, path: [1, 2, 3] }

	const arbitraries: ReadonlyArray<Arbitrary<number>> = [
		{ generator: (s) => ok(s.path.length) },
	]

	const result = generateValues(arbitraries, seed, 42)

	assertExists(result)
	assertEquals(result.error, null)
	assertEquals(result.values[0], 3) // Path length is preserved
})
