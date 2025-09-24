import err from "@sitebender/toolsmith/monads/result/err/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import { assertEquals, assertExists } from "https://deno.land/std/assert/mod.ts"

import type { Arbitrary } from "../../../../types/index.ts"
import type { GeneratorState } from "../../types/index.ts"

import generateNextValue from "./index.ts"

Deno.test("generateNextValue - generates value and advances seed", () => {
	const state: GeneratorState = {
		seed: { value: 12345, path: [] },
		values: [1, 2],
		error: null,
	}

	const arbitrary: Arbitrary<number> = {
		generator: (seed) => ok(seed.value % 100),
	}

	const result = generateNextValue(42)(state, arbitrary as Arbitrary<unknown>)

	assertExists(result)
	assertEquals(result.error, null)
	assertEquals(result.values.length, 3)
	assertEquals(result.values[2], 45) // 12345 % 100
	// Seed should be advanced
	assertEquals(result.seed.value !== state.seed.value, true)
})

Deno.test("generateNextValue - propagates existing error without generating", () => {
	const existingError = err({
		type: "failure" as const,
		counterexample: [],
		seed: 123,
		shrinks: 0,
	})
	const state: GeneratorState = {
		seed: { value: 12345, path: [] },
		values: [1, 2],
		error: existingError,
	}

	const arbitrary: Arbitrary<number> = {
		generator: (_seed) => ok(999), // Should not be called
	}

	const result = generateNextValue(42)(state, arbitrary as Arbitrary<unknown>)

	// Should return state unchanged
	assertEquals(result, state)
	assertEquals(result.error, existingError)
	assertEquals(result.values.length, 2) // No new value added
})

Deno.test("generateNextValue - handles generator failure", () => {
	const state: GeneratorState = {
		seed: { value: 12345, path: [] },
		values: [1, 2],
		error: null,
	}

	const arbitrary: Arbitrary<number> = {
		generator: (_seed) =>
			err({ type: "GenerationFailed", reason: "Test failure" }),
	}

	const result = generateNextValue(42)(state, arbitrary as Arbitrary<unknown>)

	assertExists(result.error)
	// Should preserve existing values
	assertEquals(result.values, [1, 2])
	// Should keep same seed
	assertEquals(result.seed, state.seed)
})

Deno.test("generateNextValue - preserves immutability", () => {
	const state: GeneratorState = {
		seed: { value: 12345, path: [] },
		values: [1, 2],
		error: null,
	}
	const originalValues = [...state.values]

	const arbitrary: Arbitrary<number> = {
		generator: (seed) => ok(seed.value % 100),
	}

	const result = generateNextValue(42)(state, arbitrary as Arbitrary<unknown>)

	// Original state should be unchanged
	assertEquals(state.values, originalValues)
	assertEquals(state.values.length, 2)
	assertEquals(state.seed.value, 12345)

	// New state should have new values
	assertEquals(result.values.length, 3)
	assertEquals(result.seed.value !== 12345, true)
})
