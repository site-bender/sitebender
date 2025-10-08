import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isEqual from "./index.ts"

Deno.test("isEqual", async function isEqualTests(t) {
	await t.step(
		"returns true for identical primitives",
		function identicalPrimitives() {
			assertEquals(isEqual(42)(42), true)
			assertEquals(isEqual("hello")("hello"), true)
			assertEquals(isEqual(true)(true), true)
			assertEquals(isEqual(false)(false), true)
			assertEquals(isEqual(null)(null), true)
			assertEquals(isEqual(undefined)(undefined), true)
		},
	)

	await t.step(
		"returns false for different primitives",
		function differentPrimitives() {
			assertEquals(isEqual(42)(43), false)
			assertEquals(isEqual("hello")("world"), false)
			assertEquals(isEqual(true)(false), false)
			assertEquals(isEqual(null)(undefined), false)
			assertEquals(isEqual(0)(false), false)
			assertEquals(isEqual("")(false), false)
		},
	)

	await t.step(
		"handles NaN equality correctly",
		function nanEquality() {
			assertEquals(isEqual(NaN)(NaN), true)
			assertEquals(isEqual(NaN)(42), false)
			assertEquals(isEqual(42)(NaN), false)
		},
	)

	await t.step(
		"distinguishes +0 from -0",
		function zeroSign() {
			assertEquals(isEqual(0)(0), true)
			assertEquals(isEqual(+0)(+0), true)
			assertEquals(isEqual(-0)(-0), true)
			assertEquals(isEqual(+0)(-0), false)
			assertEquals(isEqual(-0)(+0), false)
		},
	)

	await t.step(
		"handles null and undefined correctly",
		function nullUndefined() {
			assertEquals(isEqual(null)(null), true)
			assertEquals(isEqual(undefined)(undefined), true)
			assertEquals(isEqual(null)(undefined), false)
			assertEquals(isEqual(undefined)(null), false)
			assertEquals(isEqual(null)(0), false)
			assertEquals(isEqual(undefined)(0), false)
		},
	)

	await t.step(
		"compares empty arrays",
		function emptyArrays() {
			assertEquals(isEqual([])([]), true)
		},
	)

	await t.step(
		"compares arrays with same elements",
		function sameArrays() {
			assertEquals(isEqual([1, 2, 3])([1, 2, 3]), true)
			assertEquals(isEqual(["a", "b"])(["a", "b"]), true)
			assertEquals(isEqual([true, false])([true, false]), true)
		},
	)

	await t.step(
		"returns false for arrays with different elements",
		function differentArrays() {
			assertEquals(isEqual([1, 2, 3])([1, 2, 4]), false)
			assertEquals(isEqual([1, 2])([1, 2, 3]), false)
			assertEquals(isEqual([1, 2, 3])([1, 2]), false)
		},
	)

	await t.step(
		"compares nested arrays",
		function nestedArrays() {
			assertEquals(isEqual([1, [2, 3]])([1, [2, 3]]), true)
			assertEquals(isEqual([[1], [2], [3]])([[1], [2], [3]]), true)
			assertEquals(isEqual([1, [2, 3]])([1, [2, 4]]), false)
		},
	)

	await t.step(
		"compares empty objects",
		function emptyObjects() {
			assertEquals(isEqual({})({}), true)
		},
	)

	await t.step(
		"compares objects with same properties",
		function sameObjects() {
			assertEquals(isEqual({ a: 1 })({ a: 1 }), true)
			assertEquals(isEqual({ a: 1, b: 2 })({ a: 1, b: 2 }), true)
			assertEquals(isEqual({ a: 1, b: 2 })({ b: 2, a: 1 }), true) // Order doesn't matter
		},
	)

	await t.step(
		"returns false for objects with different properties",
		function differentObjects() {
			assertEquals(isEqual({ a: 1 })({ a: 2 }), false)
			assertEquals(isEqual({ a: 1 })({ b: 1 }), false)
			assertEquals(isEqual({ a: 1 })({ a: 1, b: 2 }), false)
			assertEquals(isEqual({ a: 1, b: 2 })({ a: 1 }), false)
		},
	)

	await t.step(
		"compares nested objects",
		function nestedObjects() {
			assertEquals(
				isEqual({ a: { b: 1 } })({ a: { b: 1 } }),
				true,
			)
			assertEquals(
				isEqual({ a: { b: { c: 1 } } })({ a: { b: { c: 1 } } }),
				true,
			)
			assertEquals(
				isEqual({ a: { b: 1 } })({ a: { b: 2 } }),
				false,
			)
		},
	)

	await t.step(
		"compares objects with arrays",
		function objectsWithArrays() {
			assertEquals(
				isEqual({ a: [1, 2, 3] })({ a: [1, 2, 3] }),
				true,
			)
			assertEquals(
				isEqual({ a: [1, 2, 3] })({ a: [1, 2, 4] }),
				false,
			)
		},
	)

	await t.step(
		"compares arrays with objects",
		function arraysWithObjects() {
			assertEquals(
				isEqual([{ a: 1 }, { b: 2 }])([{ a: 1 }, { b: 2 }]),
				true,
			)
			assertEquals(
				isEqual([{ a: 1 }, { b: 2 }])([{ a: 1 }, { b: 3 }]),
				false,
			)
		},
	)

	await t.step(
		"compares Date objects",
		function dateObjects() {
			const date1 = new Date("2024-01-01")
			const date2 = new Date("2024-01-01")
			const date3 = new Date("2024-01-02")

			assertEquals(isEqual(date1)(date2), true)
			assertEquals(isEqual(date1)(date3), false)
		},
	)

	await t.step(
		"compares RegExp objects",
		function regExpObjects() {
			assertEquals(isEqual(/test/)(/test/), true)
			assertEquals(isEqual(/test/i)(/test/i), true)
			assertEquals(isEqual(/test/g)(/test/g), true)
			assertEquals(isEqual(/test/)(/test/i), false)
			assertEquals(isEqual(/test/)(/other/), false)
		},
	)

	await t.step(
		"handles circular references",
		function circularReferences() {
			const obj1: Record<string, unknown> = { a: 1 }
			obj1.self = obj1

			const obj2: Record<string, unknown> = { a: 1 }
			obj2.self = obj2

			assertEquals(isEqual(obj1)(obj2), true)

			const obj3: Record<string, unknown> = { a: 2 }
			obj3.self = obj3

			assertEquals(isEqual(obj1)(obj3), false)
		},
	)

	await t.step(
		"handles complex nested structures",
		function complexStructures() {
			const complex1 = {
				name: "test",
				age: 30,
				hobbies: ["reading", "coding"],
				address: {
					street: "123 Main St",
					city: "Anytown",
					coordinates: { lat: 40.7128, lng: -74.006 },
				},
				metadata: {
					created: new Date("2024-01-01"),
					tags: ["important", "verified"],
				},
			}

			const complex2 = {
				name: "test",
				age: 30,
				hobbies: ["reading", "coding"],
				address: {
					street: "123 Main St",
					city: "Anytown",
					coordinates: { lat: 40.7128, lng: -74.006 },
				},
				metadata: {
					created: new Date("2024-01-01"),
					tags: ["important", "verified"],
				},
			}

			assertEquals(isEqual(complex1)(complex2), true)

			const complex3 = { ...complex2, age: 31 }
			assertEquals(isEqual(complex1)(complex3), false)
		},
	)

	await t.step(
		"returns false when comparing different types",
		function differentTypes() {
			assertEquals(isEqual(42)("42"), false)
			assertEquals(isEqual([])(""), false)
			assertEquals(isEqual({})(null), false)
			assertEquals(isEqual([])({}), false)
		},
	)

	await t.step(
		"is curried correctly",
		function currying() {
			const isEqualTo42 = isEqual(42)
			assertEquals(isEqualTo42(42), true)
			assertEquals(isEqualTo42(43), false)

			const isEqualToHello = isEqual("hello")
			assertEquals(isEqualToHello("hello"), true)
			assertEquals(isEqualToHello("world"), false)
		},
	)
})

Deno.test("isEqual - property: reflexivity", function reflexivity() {
	fc.assert(
		fc.property(
			fc.anything(),
			function propertyReflexivity(value: unknown) {
				// Any value should equal itself
				assertEquals(isEqual(value)(value), true)
			},
		),
	)
})

Deno.test("isEqual - property: symmetry", function symmetry() {
	fc.assert(
		fc.property(
			fc.anything(),
			fc.anything(),
			function propertySymmetry(a: unknown, b: unknown) {
				// If a equals b, then b equals a
				const aEqualsB = isEqual(a)(b)
				const bEqualsA = isEqual(b)(a)
				assertEquals(aEqualsB, bEqualsA)
			},
		),
	)
})

Deno.test("isEqual - property: transitivity", function transitivity() {
	fc.assert(
		fc.property(
			fc.integer(),
			function propertyTransitivity(n: number) {
				// If a equals b and b equals c, then a equals c
				const a = n
				const b = n
				const c = n

				const aEqualsB = isEqual(a)(b)
				const bEqualsC = isEqual(b)(c)
				const aEqualsC = isEqual(a)(c)

				if (aEqualsB && bEqualsC) {
					assertEquals(aEqualsC, true)
				}
			},
		),
	)
})

Deno.test("isEqual - property: arrays with same elements are equal", function arrayEquality() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function propertyArrayEquality(arr: Array<number>) {
				const copy = [...arr]
				assertEquals(isEqual(arr)(copy), true)
			},
		),
	)
})

Deno.test("isEqual - property: objects with same properties are equal", function objectEquality() {
	fc.assert(
		fc.property(
			fc.dictionary(fc.string(), fc.integer()),
			function propertyObjectEquality(obj: Record<string, number>) {
				const copy = { ...obj }
				assertEquals(isEqual(obj)(copy), true)
			},
		),
	)
})

Deno.test("isEqual - property: NaN always equals NaN", function nanAlwaysEqual() {
	fc.assert(
		fc.property(
			fc.constant(NaN),
			fc.constant(NaN),
			function propertyNanEquality(a: number, b: number) {
				assertEquals(isEqual(a)(b), true)
			},
		),
	)
})
