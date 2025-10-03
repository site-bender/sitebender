import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import createSeed from "../../../../random/createSeed/index.ts"
import boolean from "../../../primitives/boolean/index.ts"
import integer from "../../../primitives/integer/index.ts"
import _generateTupleElements from "./index.ts"

Deno.test("_generateTupleElements: generates empty tuple for no generators", () => {
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")

	const generators: any[] = []
	const initialState = {
		seed: seedResult.value,
		values: [],
		totalSize: 0,
	}

	const result = _generateTupleElements(generators)(initialState)

	assertEquals(result.values.length, 0)
	assertEquals(result.totalSize, 0)
	assertEquals(result.seed, seedResult.value)
})

Deno.test("_generateTupleElements: generates tuple with correct types", () => {
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")

	const generators = [
		integer(0, 100),
		boolean,
		integer(0, 10),
	]

	const initialState = {
		seed: seedResult.value,
		values: [],
		totalSize: 0,
	}

	const result = _generateTupleElements(generators)(initialState)

	assertEquals(result.values.length, 3)
	assertEquals(typeof result.values[0], "number")
	assertEquals(typeof result.values[1], "boolean")
	assertEquals(typeof result.values[2], "number")
})

Deno.test("_generateTupleElements: accumulates size correctly", () => {
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")

	const generators = [
		integer(0, 100),
		integer(0, 100),
		integer(0, 100),
	]

	const initialState = {
		seed: seedResult.value,
		values: [],
		totalSize: 0,
	}

	const result = _generateTupleElements(generators)(initialState)

	assertEquals(result.values.length, 3)
	assertEquals(result.totalSize, 3) // Each integer has size 1
})

Deno.test("_generateTupleElements: preserves existing values in state", () => {
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")

	const generators = [boolean, boolean]

	const initialState = {
		seed: seedResult.value,
		values: ["existing", 123],
		totalSize: 10,
	}

	const result = _generateTupleElements(generators)(initialState)

	assertEquals(result.values.length, 4)
	assertEquals(result.values[0], "existing")
	assertEquals(result.values[1], 123)
	assertEquals(typeof result.values[2], "boolean")
	assertEquals(typeof result.values[3], "boolean")
	assertEquals(result.totalSize, 12) // 10 + 2 for booleans
})

Deno.test("_generateTupleElements: advances seed for each element", () => {
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")

	const generators = [
		integer(0, 100),
		integer(0, 100),
	]

	const initialState = {
		seed: seedResult.value,
		values: [],
		totalSize: 0,
	}

	const result = _generateTupleElements(generators)(initialState)

	// Seed should be different after generation
	assertEquals(result.seed !== seedResult.value, true)
	assertEquals(result.seed.state !== seedResult.value.state, true)
})

Deno.test("_generateTupleElements: deterministic generation", () => {
	const seedResult1 = createSeed(12345)
	const seedResult2 = createSeed(12345)
	if (seedResult1._tag === "Error" || seedResult2._tag === "Error") {
		throw new Error("Invalid seed")
	}

	const generators = [
		integer(0, 100),
		boolean,
		integer(0, 10),
	]

	const state1 = _generateTupleElements(generators)({
		seed: seedResult1.value,
		values: [],
		totalSize: 0,
	})

	const state2 = _generateTupleElements(generators)({
		seed: seedResult2.value,
		values: [],
		totalSize: 0,
	})

	assertEquals(state1.values, state2.values)
	assertEquals(state1.totalSize, state2.totalSize)
})
