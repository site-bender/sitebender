import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import createSeed from "../../../../random/createSeed/index.ts"
import boolean from "../../../primitives/boolean/index.ts"
import integer from "../../../primitives/integer/index.ts"
import _generateRecordProperties from "./index.ts"

Deno.test("_generateRecordProperties: generates empty record for no keys", () => {
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")

	const generators = {}
	const keys: string[] = []

	const initialState = {
		seed: seedResult.value,
		record: {},
		totalSize: 0,
	}

	const result = _generateRecordProperties(generators)(keys)(initialState)

	assertEquals(Object.keys(result.record).length, 0)
	assertEquals(result.totalSize, 0)
	assertEquals(result.seed, seedResult.value)
})

Deno.test("_generateRecordProperties: generates record with correct properties", () => {
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")

	const generators = {
		name: integer(0, 100),
		active: boolean,
		count: integer(0, 10),
	}
	const keys = ["name", "active", "count"]

	const initialState = {
		seed: seedResult.value,
		record: {},
		totalSize: 0,
	}

	const result = _generateRecordProperties(generators)(keys)(initialState)

	assertEquals(Object.keys(result.record).length, 3)
	assertEquals(typeof result.record.name, "number")
	assertEquals(typeof result.record.active, "boolean")
	assertEquals(typeof result.record.count, "number")
})

Deno.test("_generateRecordProperties: accumulates size correctly", () => {
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")

	const generators = {
		a: integer(0, 100),
		b: integer(0, 100),
		c: integer(0, 100),
	}
	const keys = ["a", "b", "c"]

	const initialState = {
		seed: seedResult.value,
		record: {},
		totalSize: 0,
	}

	const result = _generateRecordProperties(generators)(keys)(initialState)

	assertEquals(Object.keys(result.record).length, 3)
	assertEquals(result.totalSize, 3) // Each integer has size 1
})

Deno.test("_generateRecordProperties: preserves existing properties in state", () => {
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")

	const generators = {
		new1: boolean,
		new2: boolean,
	}
	const keys = ["new1", "new2"]

	const initialState = {
		seed: seedResult.value,
		record: { existing: "value", another: 123 },
		totalSize: 10,
	}

	const result = _generateRecordProperties(generators)(keys)(initialState)

	assertEquals(Object.keys(result.record).length, 4)
	assertEquals(result.record.existing, "value")
	assertEquals(result.record.another, 123)
	assertEquals(typeof result.record.new1, "boolean")
	assertEquals(typeof result.record.new2, "boolean")
	assertEquals(result.totalSize, 12) // 10 + 2 for booleans
})

Deno.test("_generateRecordProperties: advances seed for each property", () => {
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")

	const generators = {
		a: integer(0, 100),
		b: integer(0, 100),
	}
	const keys = ["a", "b"]

	const initialState = {
		seed: seedResult.value,
		record: {},
		totalSize: 0,
	}

	const result = _generateRecordProperties(generators)(keys)(initialState)

	// Seed should be different after generation
	assertEquals(result.seed !== seedResult.value, true)
	assertEquals(result.seed.state !== seedResult.value.state, true)
})

Deno.test("_generateRecordProperties: deterministic generation", () => {
	const seedResult1 = createSeed(12345)
	const seedResult2 = createSeed(12345)
	if (seedResult1._tag === "Error" || seedResult2._tag === "Error") {
		throw new Error("Invalid seed")
	}

	const generators = {
		x: integer(0, 100),
		y: boolean,
		z: integer(0, 10),
	}
	const keys = ["x", "y", "z"]

	const state1 = _generateRecordProperties(generators)(keys)({
		seed: seedResult1.value,
		record: {},
		totalSize: 0,
	})

	const state2 = _generateRecordProperties(generators)(keys)({
		seed: seedResult2.value,
		record: {},
		totalSize: 0,
	})

	assertEquals(state1.record, state2.record)
	assertEquals(state1.totalSize, state2.totalSize)
})

Deno.test("_generateRecordProperties: handles single property", () => {
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")

	const generators = {
		only: integer(0, 100),
	}
	const keys = ["only"]

	const initialState = {
		seed: seedResult.value,
		record: {},
		totalSize: 0,
	}

	const result = _generateRecordProperties(generators)(keys)(initialState)

	assertEquals(Object.keys(result.record).length, 1)
	assertEquals(typeof result.record.only, "number")
})
