import { assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"
import fc from "npm:fast-check"

import pluck from "../../../../src/simple/array/pluck/index.ts"

describe("pluck", () => {
	describe("basic functionality", () => {
		it("should extract property values from array of objects", () => {
			const users = [
				{ id: 1, name: "Alice", age: 30 },
				{ id: 2, name: "Bob", age: 25 },
				{ id: 3, name: "Charlie", age: 35 },
			]
			assertEquals(pluck("name")(users), ["Alice", "Bob", "Charlie"])
			assertEquals(pluck("age")(users), [30, 25, 35])
			assertEquals(pluck("id")(users), [1, 2, 3])
		})

		it("should handle missing properties", () => {
			const mixed = [
				{ a: 1, b: 2 },
				{ a: 3 },
				{ b: 7 },
			]
			assertEquals(pluck("a")(mixed), [1, 3, undefined])
			assertEquals(pluck("b")(mixed), [2, undefined, 7])
		})

		it("should handle nested properties", () => {
			const data = [
				{ user: { name: "Alice", id: 1 }, score: 100 },
				{ user: { name: "Bob", id: 2 }, score: 85 },
			]
			assertEquals(pluck("user")(data), [
				{ name: "Alice", id: 1 },
				{ name: "Bob", id: 2 },
			])
			assertEquals(pluck("score")(data), [100, 85])
		})

		it("should handle array values", () => {
			const items = [
				{ tags: ["a", "b"] },
				{ tags: ["c"] },
				{ tags: [] },
			]
			assertEquals(pluck("tags")(items), [["a", "b"], ["c"], []])
		})

		it("should handle null and undefined items", () => {
			const mixed = [
				{ a: 1 },
				null,
				{ a: 2 },
				undefined,
				{ a: 3 },
			]
			assertEquals(pluck("a")(mixed), [1, undefined, 2, undefined, 3])
		})

		it("should handle non-object items", () => {
			const mixed = [
				{ a: 1 },
				"string",
				{ a: 2 },
				42,
				{ a: 3 },
				true,
			] as any[]
			assertEquals(pluck("a")(mixed), [
				1,
				undefined,
				2,
				undefined,
				3,
				undefined,
			])
		})
	})

	describe("edge cases", () => {
		it("should handle empty arrays", () => {
			assertEquals(pluck("key")([]), [])
		})

		it("should handle null and undefined", () => {
			assertEquals(pluck("key")(null), [])
			assertEquals(pluck("key")(undefined), [])
		})

		it("should handle arrays with all null/undefined items", () => {
			assertEquals(pluck("key")([null, undefined, null]), [
				undefined,
				undefined,
				undefined,
			])
		})

		it("should handle property with undefined value", () => {
			const data = [
				{ a: undefined },
				{ a: null },
				{ a: 0 },
				{ a: false },
				{ a: "" },
			]
			assertEquals(pluck("a")(data), [undefined, null, 0, false, ""])
		})

		it("should handle symbol keys", () => {
			const sym = Symbol("test")
			const data = [
				{ [sym]: "value1" },
				{ [sym]: "value2" },
				{ other: "value3" },
			]
			assertEquals(pluck(sym as any)(data), ["value1", "value2", undefined])
		})

		it("should handle numeric keys", () => {
			const data = [
				{ 0: "zero", 1: "one" },
				{ 0: "ZERO", 2: "two" },
			]
			assertEquals(pluck(0 as any)(data), ["zero", "ZERO"])
			assertEquals(pluck(1 as any)(data), ["one", undefined])
		})
	})

	describe("currying", () => {
		it("should support partial application", () => {
			const getName = pluck("name")
			const users1 = [{ name: "Alice" }, { name: "Bob" }]
			const users2 = [{ name: "Charlie" }, { name: "David" }]

			assertEquals(getName(users1), ["Alice", "Bob"])
			assertEquals(getName(users2), ["Charlie", "David"])
		})

		it("should work with different keys", () => {
			const data = [
				{ a: 1, b: 2, c: 3 },
				{ a: 4, b: 5, c: 6 },
			]
			const pluckA = pluck("a")
			const pluckB = pluck("b")
			const pluckC = pluck("c")

			assertEquals(pluckA(data), [1, 4])
			assertEquals(pluckB(data), [2, 5])
			assertEquals(pluckC(data), [3, 6])
		})
	})

	describe("type preservation", () => {
		it("should work with different value types", () => {
			const stringData = [{ val: "a" }, { val: "b" }]
			assertEquals(pluck("val")(stringData), ["a", "b"])

			const numberData = [{ val: 1 }, { val: 2 }]
			assertEquals(pluck("val")(numberData), [1, 2])

			const booleanData = [{ val: true }, { val: false }]
			assertEquals(pluck("val")(booleanData), [true, false])

			const objectData = [{ val: { x: 1 } }, { val: { x: 2 } }]
			assertEquals(pluck("val")(objectData), [{ x: 1 }, { x: 2 }])
		})

		it("should handle union types", () => {
			const data = [
				{ value: "string" as string | number },
				{ value: 42 as string | number },
				{ value: "another" as string | number },
			]
			assertEquals(pluck("value")(data), ["string", 42, "another"])
		})
	})

	describe("practical use cases", () => {
		it("should extract IDs for database queries", () => {
			const records = [
				{ id: 101, name: "Record 1" },
				{ id: 102, name: "Record 2" },
				{ id: 103, name: "Record 3" },
			]
			const ids = pluck("id")(records)
			assertEquals(ids, [101, 102, 103])
		})

		it("should extract timestamps for sorting", () => {
			const events = [
				{ event: "login", timestamp: 1000 },
				{ event: "click", timestamp: 2000 },
				{ event: "logout", timestamp: 3000 },
			]
			const timestamps = pluck("timestamp")(events)
			assertEquals(timestamps, [1000, 2000, 3000])
		})

		it("should work with map for transformations", () => {
			const users = [
				{ name: "alice", age: 30 },
				{ name: "bob", age: 25 },
			]
			const upperNames = pluck("name")(users).map((n) => n?.toUpperCase())
			assertEquals(upperNames, ["ALICE", "BOB"])
		})
	})

	describe("property-based tests", () => {
		it("should always return array of same length as input", () => {
			fc.assert(
				fc.property(
					fc.array(
						fc.oneof(
							fc.record({ key: fc.anything() }),
							fc.constant(null),
							fc.constant(undefined),
						),
					),
					(array) => {
						const result = pluck("key")(array)
						return result.length === array.length
					},
				),
			)
		})

		it("should handle null and undefined consistently", () => {
			fc.assert(
				fc.property(
					fc.oneof(fc.constant(null), fc.constant(undefined)),
					fc.string(),
					(nullish, key) => {
						const result = pluck(key)(nullish)
						return Array.isArray(result) && result.length === 0
					},
				),
			)
		})

		it("should extract correct values when property exists", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(values) => {
						const objects = values.map((v) => ({ value: v, other: v * 2 }))
						const extracted = pluck("value")(objects)
						return extracted.every((v, i) => v === values[i])
					},
				),
			)
		})

		it("should return undefined for missing properties", () => {
			fc.assert(
				fc.property(
					fc.array(
						fc.oneof(
							fc.record({ a: fc.anything() }),
							fc.record({ b: fc.anything() }),
						),
					),
					(array) => {
						const result = pluck("c")(array)
						return result.every((v) => v === undefined)
					},
				),
			)
		})

		it("should be consistent with map operation", () => {
			fc.assert(
				fc.property(
					fc.array(fc.record({ prop: fc.anything() })),
					(array) => {
						const plucked = pluck("prop")(array)
						const mapped = array.map((item) => item.prop)
						return (
							plucked.length === mapped.length &&
							plucked.every((v, i) => Object.is(v, mapped[i]))
						)
					},
				),
			)
		})
	})
})
