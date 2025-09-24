import err from "@sitebender/toolsmith/monads/result/err/index.ts"
import fold from "@sitebender/toolsmith/monads/result/fold/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import { assertEquals, assertExists } from "https://deno.land/std/assert/mod.ts"

import type {
	Arbitrary,
	Configuration,
	Generator,
	Property,
	PropertyFailure,
	PropertySuccess,
} from "../../types/index.ts"

import checkProperty from "./index.ts"

// Helper generators for testing
const generateInt: Generator<number> = (seed) => ok(seed.value % 100)
const generateNegativeInt: Generator<number> = (seed) =>
	ok(-(Math.abs(seed.value % 100) + 1))

// Helper arbitraries
const intArb: Arbitrary<number> = { generator: generateInt }
const negativeIntArb: Arbitrary<number> = { generator: generateNegativeInt }

Deno.test("checkProperty - passes for always true property", () => {
	const property: Property<[number]> = {
		name: "always true",
		arbitraries: [intArb] as const,
		predicate: () => true,
	}

	const result = checkProperty(property)()

	assertExists(result)
	assertEquals(isOk(result), true)

	const success = fold<PropertyFailure, PropertySuccess | null>(
		() => null,
	)(
		(value: PropertySuccess) => value,
	)(result)

	assertExists(success)
	assertEquals(success.type, "success")
	assertEquals(success.runs, 100) // default runs
})

Deno.test("checkProperty - fails for always false property", () => {
	const property: Property<[number]> = {
		name: "always false",
		arbitraries: [intArb] as const,
		predicate: () => false,
	}

	const result = checkProperty(property)()

	assertExists(result)
	assertEquals(isError(result), true)

	const failure = fold<PropertyFailure, PropertyFailure | null>(
		(error: PropertyFailure) => error,
	)(
		() => null,
	)(result)

	assertExists(failure)
	assertEquals(failure.type, "failure")
	assertExists(failure.counterexample)
	assertEquals(failure.counterexample.length, 1)
})

Deno.test("checkProperty - verifies mathematical property", () => {
	const property: Property<[number, number]> = {
		name: "addition is commutative",
		arbitraries: [intArb, intArb] as const,
		predicate: ([a, b]) => a + b === b + a,
	}

	const result = checkProperty(property)()

	assertExists(result)
	assertEquals(isOk(result), true)
})

Deno.test("checkProperty - finds counterexample for incorrect property", () => {
	const property: Property<[number]> = {
		name: "all numbers are positive",
		arbitraries: [negativeIntArb] as const,
		predicate: ([n]) => n > 0,
	}

	const result = checkProperty(property)()

	assertExists(result)
	assertEquals(isError(result), true)

	const failure = fold<PropertyFailure, PropertyFailure | null>(
		(error: PropertyFailure) => error,
	)(
		() => null,
	)(result)

	assertExists(failure)
	assertEquals(failure.type, "failure")
	// Should fail on first run since all generated are negative
	assertEquals(failure.counterexample.length, 1)
	assertEquals(failure.counterexample[0] as number <= 0, true)
})

Deno.test("checkProperty - respects configuration runs", () => {
	let runCount = 0
	const property: Property<[number]> = {
		name: "counts runs",
		arbitraries: [intArb] as const,
		predicate: () => {
			runCount++
			return true
		},
	}

	const config: Configuration = { runs: 50 }
	const result = checkProperty(property)(config)

	assertEquals(runCount, 50)
	assertEquals(isOk(result), true)

	const success = fold<PropertyFailure, PropertySuccess | null>(
		() => null,
	)(
		(value: PropertySuccess) => value,
	)(result)

	assertExists(success)
	assertEquals(success.runs, 50)
})

Deno.test("checkProperty - uses provided seed", () => {
	const property: Property<[number]> = {
		name: "deterministic with seed",
		arbitraries: [intArb] as const,
		predicate: ([n]) => n !== 42, // Will fail if we generate 42
	}

	const config: Configuration = { seed: 42, runs: 1 }
	const result1 = checkProperty(property)(config)
	const result2 = checkProperty(property)(config)

	// Should produce same result with same seed
	if (isError(result1) && isError(result2)) {
		const failure1 = fold<PropertyFailure, PropertyFailure | null>(
			(error: PropertyFailure) => error,
		)(
			() => null,
		)(result1)

		const failure2 = fold<PropertyFailure, PropertyFailure | null>(
			(error: PropertyFailure) => error,
		)(
			() => null,
		)(result2)

		assertExists(failure1)
		assertExists(failure2)
		assertEquals(failure1.counterexample, failure2.counterexample)
		assertEquals(failure1.seed, failure2.seed)
	} else if (isOk(result1) && isOk(result2)) {
		const success1 = fold<PropertyFailure, PropertySuccess | null>(
			() => null,
		)(
			(value: PropertySuccess) => value,
		)(result1)

		const success2 = fold<PropertyFailure, PropertySuccess | null>(
			() => null,
		)(
			(value: PropertySuccess) => value,
		)(result2)

		assertExists(success1)
		assertExists(success2)
		assertEquals(success1.seed, success2.seed)
	}
})

Deno.test("checkProperty - handles multiple arbitraries", () => {
	const property: Property<[number, number, number]> = {
		name: "associativity of addition",
		arbitraries: [intArb, intArb, intArb] as const,
		predicate: ([a, b, c]) => (a + b) + c === a + (b + c),
	}

	const result = checkProperty(property)()

	assertExists(result)
	assertEquals(isOk(result), true)
})

Deno.test("checkProperty - captures predicate errors", () => {
	const property: Property<[number]> = {
		name: "throws error",
		arbitraries: [intArb] as const,
		predicate: () => {
			throw new Error("Test error")
		},
	}

	const result = checkProperty(property)()

	assertExists(result)
	assertEquals(isError(result), true)

	const failure = fold<PropertyFailure, PropertyFailure | null>(
		(error: PropertyFailure) => error,
	)(
		() => null,
	)(result)

	assertExists(failure)
	assertEquals(failure.type, "failure")
	assertExists(failure.error)
	assertEquals(failure.error.includes("Test error"), true)
})

Deno.test("checkProperty - handles generator failures", () => {
	const failingGenerator: Generator<number> = () =>
		err({ type: "GenerationFailed", reason: "Intentional failure" })

	const property: Property<[number]> = {
		name: "with failing generator",
		arbitraries: [{ generator: failingGenerator }] as const,
		predicate: () => true,
	}

	const result = checkProperty(property)()

	assertExists(result)
	assertEquals(isError(result), true)

	const failure = fold<PropertyFailure, PropertyFailure | null>(
		(error: PropertyFailure) => error,
	)(
		() => null,
	)(result)

	assertExists(failure)
	assertEquals(failure.type, "failure")
	assertExists(failure.error)
	assertEquals(failure.error.includes("Generation failed"), true)
})

Deno.test("checkProperty - deterministic results with same configuration", () => {
	const property: Property<[number, number]> = {
		name: "product is commutative",
		arbitraries: [intArb, intArb] as const,
		predicate: ([a, b]) => a * b === b * a,
	}

	const config: Configuration = { seed: 12345, runs: 20 }

	const result1 = checkProperty(property)(config)
	const result2 = checkProperty(property)(config)

	// Both should succeed
	assertEquals(isOk(result1), true)
	assertEquals(isOk(result2), true)

	if (isOk(result1) && isOk(result2)) {
		const success1 = fold<PropertyFailure, PropertySuccess | null>(
			() => null,
		)(
			(value: PropertySuccess) => value,
		)(result1)

		const success2 = fold<PropertyFailure, PropertySuccess | null>(
			() => null,
		)(
			(value: PropertySuccess) => value,
		)(result2)

		assertExists(success1)
		assertExists(success2)
		assertEquals(success1.seed, success2.seed)
		assertEquals(success1.runs, success2.runs)
	}
})
