import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.15.0"

import type { ShrinkTree } from "../../../types/index.ts"
import createSeed from "../../../random/createSeed/index.ts"
import integer from "../../primitives/integer/index.ts"
import boolean from "../../primitives/boolean/index.ts"
import string from "../../primitives/string/index.ts"
import record from "./index.ts"

Deno.test("record: generates object with correct shape", () => {
	const gen = record({
		name: string({ minLength: 1, maxLength: 10 }),
		age: integer(0, 100),
		active: boolean,
	})
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")
	const seed = seedResult.value
	const result = gen.next(seed)

	assertEquals(typeof result.value.name, "string")
	assertEquals(typeof result.value.age, "number")
	assertEquals(typeof result.value.active, "boolean")
	assertEquals(Object.keys(result.value).sort(), ["active", "age", "name"])
})

Deno.test("record: generates empty record", () => {
	const gen = record({})
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")
	const seed = seedResult.value
	const result = gen.next(seed)

	assertEquals(result.value, {})
	assertEquals(Object.keys(result.value).length, 0)
})

Deno.test("record: single property record", () => {
	const gen = record({ value: integer(10, 20) })
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")
	const seed = seedResult.value
	const result = gen.next(seed)

	assertEquals(Object.keys(result.value), ["value"])
	assertEquals(result.value.value >= 10 && result.value.value <= 20, true)
})

Deno.test("record: deterministic generation", () => {
	const gen = record({
		x: integer(0, 100),
		y: integer(0, 100),
		enabled: boolean,
	})
	const seedResult1 = createSeed(12345)
	const seedResult2 = createSeed(12345)
	if (seedResult1._tag === "Error" || seedResult2._tag === "Error") {
		throw new Error("Invalid seed")
	}

	const result1 = gen.next(seedResult1.value)
	const result2 = gen.next(seedResult2.value)

	assertEquals(result1.value, result2.value)
})

Deno.test("record: shrinks properties", () => {
	const gen = record({
		x: integer(0, 100),
		y: integer(0, 200),
	})
	const original = { x: 50, y: 150 }
	const shrinkTree = gen.shrink(original)

	assertEquals(shrinkTree.value, original)
	const children = shrinkTree.children()

	// Should have shrinks available
	assertEquals(children.length > 0, true)

	// Should shrink individual properties
	const hasShrunkX = children.some((
		child: ShrinkTree<{ x: number; y: number }>,
	) => child.value.x !== original.x && child.value.y === original.y)
	const hasShrunkY = children.some((
		child: ShrinkTree<{ x: number; y: number }>,
	) => child.value.x === original.x && child.value.y !== original.y)

	assertEquals(hasShrunkX, true)
	assertEquals(hasShrunkY, true)
})

Deno.test("record: shrinks empty record to no children", () => {
	const gen = record({})
	const shrinkTree = gen.shrink({})

	assertEquals(shrinkTree.value, {})
	assertEquals(shrinkTree.children().length, 0)
})

Deno.test("record: parses valid objects", () => {
	const gen = record({
		name: string(),
		age: integer(0, 100),
		active: boolean,
	})

	const result1 = gen.parse!({ name: "Alice", age: 30, active: true })
	assertEquals(result1._tag, "Ok")
	if (result1._tag === "Ok") {
		assertEquals(result1.value, { name: "Alice", age: 30, active: true })
	}
})

Deno.test("record: rejects objects with missing properties", () => {
	const gen = record({
		name: string(),
		age: integer(0, 100),
	})

	const result = gen.parse!({ name: "Alice" })
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.type, "ValidationFailed")
	}
})

Deno.test("record: rejects objects with extra properties", () => {
	const gen = record({
		name: string(),
	})

	const result = gen.parse!({ name: "Alice", extra: "property" })
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.type, "ValidationFailed")
	}
})

Deno.test("record: rejects non-objects", () => {
	const gen = record({ name: string() })

	const result1 = gen.parse!("not an object")
	assertEquals(result1._tag, "Error")
	if (result1._tag === "Error") {
		assertEquals(result1.error.type, "TypeMismatch")
	}

	const result2 = gen.parse!(null)
	assertEquals(result2._tag, "Error")

	const result3 = gen.parse!([])
	assertEquals(result3._tag, "Error")
})

Deno.test("record: rejects objects with invalid property values", () => {
	const gen = record({
		age: integer(0, 100),
	})

	const result = gen.parse!({ age: "not a number" })
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.type, "ValidationFailed")
	}
})

Deno.test("record: size calculation includes all property sizes", () => {
	const gen = record({
		a: integer(0, 1000),
		b: boolean,
		c: string({ minLength: 5, maxLength: 5 }),
	})
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")
	const seed = seedResult.value
	const result = gen.next(seed)

	// Size should be sum of property sizes
	assertEquals(result.size >= 3, true) // At least 1 for each property
})

Deno.test("record: property test - maintains object shape", () => {
	fc.assert(
		fc.property(fc.integer(), (seedValue) => {
			const gen = record({
				id: integer(0, 1000),
				flag: boolean,
			})
			const seedResult = createSeed(seedValue)
			if (seedResult._tag === "Error") return true

			const result = gen.next(seedResult.value)
			const keys = Object.keys(result.value).sort()
			return keys.length === 2 && keys[0] === "flag" && keys[1] === "id"
		}),
	)
})
