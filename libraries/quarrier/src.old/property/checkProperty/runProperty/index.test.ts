import err from "@sitebender/toolsmith/monads/result/err/index.ts"
import fold from "@sitebender/toolsmith/monads/result/fold/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import {
	assertEquals,
	assertExists,
} from "https://deno.land/std@0.224.0/assert/mod.ts"

import type { Property, PropertyFailure } from "../../../types/index.ts"
import type { RunState } from "../types/index.ts"

import runProperty from "./index.ts"

Deno.test("runProperty - returns null for passing property", () => {
	const property: Property<[number]> = {
		name: "always true",
		arbitraries: [{ generator: (s) => ok(s.value % 10) }] as const,
		predicate: () => true,
	}

	const state: RunState = {
		seed: { value: 12345, path: [] },
		result: null,
	}

	const runner = runProperty(property, 42)
	const result = runner(state, 0)

	assertExists(result)
	assertEquals(result.result, null)
	// Seed should be advanced
	assertEquals(result.seed.value !== state.seed.value, true)
})

Deno.test("runProperty - returns error for failing property", () => {
	const property: Property<[number]> = {
		name: "always false",
		arbitraries: [{ generator: (s) => ok(s.value % 10) }] as const,
		predicate: () => false,
	}

	const state: RunState = {
		seed: { value: 12345, path: [] },
		result: null,
	}

	const runner = runProperty(property, 42)
	const result = runner(state, 0)

	assertExists(result)
	assertExists(result.result)
	assertEquals(isError(result.result), true)
})

Deno.test("runProperty - short-circuits on existing failure", () => {
	const existingError = err({
		type: "failure" as const,
		counterexample: [1],
		seed: 999,
		shrinks: 0,
	})

	const property: Property<[number]> = {
		name: "should not run",
		arbitraries: [{ generator: (_s) => ok(999) }] as const,
		predicate: () => true,
	}

	const state: RunState = {
		seed: { value: 12345, path: [] },
		result: existingError,
	}

	const runner = runProperty(property, 42)
	const result = runner(state, 0)

	// Should return state unchanged
	assertEquals(result, state)
	assertEquals(result.result, existingError)
})

Deno.test("runProperty - captures predicate exceptions", () => {
	const property: Property<[number]> = {
		name: "throws error",
		arbitraries: [{ generator: (s) => ok(s.value % 10) }] as const,
		predicate: () => {
			throw new Error("Test exception")
		},
	}

	const state: RunState = {
		seed: { value: 12345, path: [] },
		result: null,
	}

	const runner = runProperty(property, 42)
	const result = runner(state, 0)

	assertExists(result)
	assertExists(result.result)
	assertEquals(isError(result.result), true)

	const error = fold<PropertyFailure, PropertyFailure | null>(
		(err: PropertyFailure) => err,
	)(
		() => null,
	)(result.result)

	assertExists(error)
	assertExists(error.error)
	assertEquals(error.error?.includes("Test exception"), true)
})

Deno.test("runProperty - propagates generator failures", () => {
	const property: Property<[number]> = {
		name: "generator fails",
		arbitraries: [{
			generator: (_s) =>
				err({ type: "GenerationFailed", reason: "Test failure" }),
		}] as const,
		predicate: () => true,
	}

	const state: RunState = {
		seed: { value: 12345, path: [] },
		result: null,
	}

	const runner = runProperty(property, 42)
	const result = runner(state, 0)

	assertExists(result)
	assertExists(result.result)
	assertEquals(isError(result.result), true)

	const error = fold<PropertyFailure, PropertyFailure | null>(
		(err: PropertyFailure) => err,
	)(
		() => null,
	)(result.result)

	assertExists(error)
	assertExists(error.error)
	assertEquals(error.error?.includes("Generation failed"), true)
})

Deno.test("runProperty - includes counterexample on failure", () => {
	const property: Property<[number, number]> = {
		name: "sum equals 10",
		arbitraries: [
			{ generator: (_s) => ok(3) },
			{ generator: (_s) => ok(5) },
		] as const,
		predicate: ([a, b]) => a + b === 10, // 3 + 5 = 8, should fail
	}

	const state: RunState = {
		seed: { value: 12345, path: [] },
		result: null,
	}

	const runner = runProperty(property, 42)
	const result = runner(state, 0)

	assertExists(result)
	assertExists(result.result)
	assertEquals(isError(result.result), true)

	const error = fold<PropertyFailure, PropertyFailure | null>(
		(err: PropertyFailure) => err,
	)(
		() => null,
	)(result.result)

	assertExists(error)
	assertEquals(error.counterexample, [3, 5])
})
