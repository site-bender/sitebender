import { assertEquals } from "jsr:@std/assert@1.0.8"
import * as fc from "fast-check"

import countBy from "../../../../src/simple/array/countBy/index.ts"

Deno.test("countBy", async (t) => {
	await t.step("should count elements by function result", () => {
		const result = countBy((x: number) => x % 2 === 0 ? "even" : "odd")([
			1,
			2,
			3,
			4,
			5,
		])
		assertEquals(result, { odd: 3, even: 2 })
	})

	await t.step("should count by property value", () => {
		const people = [
			{ name: "Alice", age: 25 },
			{ name: "Bob", age: 30 },
			{ name: "Charlie", age: 25 },
		]
		const result = countBy((p: { age: number }) => p.age)(people)
		assertEquals(result, { "25": 2, "30": 1 })
	})

	await t.step("should count by grade categories", () => {
		const scores = [95, 87, 73, 91, 82]
		const gradeFunction = (score: number) => {
			if (score >= 90) return "A"
			if (score >= 80) return "B"
			return "C"
		}
		const result = countBy(gradeFunction)(scores)
		assertEquals(result, { A: 2, B: 2, C: 1 })
	})

	await t.step("should return empty object for empty array", () => {
		const result = countBy((x: number) => x)([])
		assertEquals(result, {})
	})

	await t.step("should count all elements under same key", () => {
		const result = countBy(() => "same")([1, 2, 3])
		assertEquals(result, { same: 3 })
	})

	await t.step("should handle null array", () => {
		const result = countBy((x: number) => x)(null)
		assertEquals(result, {})
	})

	await t.step("should handle undefined array", () => {
		const result = countBy((x: number) => x)(undefined)
		assertEquals(result, {})
	})

	await t.step("should count by type", () => {
		const countByType = countBy((x: unknown) => typeof x)
		const result = countByType([1, "hello", true, 42, null, undefined])
		assertEquals(result.number, 2)
		assertEquals(result.string, 1)
		assertEquals(result.boolean, 1)
		assertEquals(result.object, 1)
		assertEquals(result.undefined, 1)
	})

	await t.step("should handle numeric keys", () => {
		const result = countBy((x: number) => x)([1, 2, 1, 3, 2, 1])
		assertEquals(result, { 1: 3, 2: 2, 3: 1 })
	})

	await t.step("should handle string keys", () => {
		const words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
		const result = countBy((word: string) => word)(words)
		assertEquals(result, { apple: 3, banana: 2, cherry: 1 })
	})

	await t.step("should handle symbol keys", () => {
		const sym1 = Symbol.for("a")
		const sym2 = Symbol.for("b")
		const items = [sym1, sym2, sym1, sym1]
		const result = countBy((s: symbol) => s)(items)
		assertEquals(result, { [sym1]: 3, [sym2]: 1 })
	})

	await t.step("should handle null/undefined returned from function", () => {
		const fn = (x: number) => x > 2 ? x : null as unknown as number
		const result = countBy(fn)([1, 2, 3, 4])
		assertEquals(result, { 3: 1, 4: 1 })
	})

	await t.step("should be curried", () => {
		const evenOdd = countBy((x: number) => x % 2 === 0 ? "even" : "odd")
		const result1 = evenOdd([1, 2, 3])
		assertEquals(result1.odd, 2)
		assertEquals(result1.even, 1)
		
		const result2 = evenOdd([2, 4, 6])
		assertEquals(result2.even, 3)
		assertEquals(result2.odd, undefined)
	})

	await t.step("should handle single element array", () => {
		const result = countBy((x: number) => x)([42])
		assertEquals(result, { 42: 1 })
	})

	await t.step("should handle arrays with all same values", () => {
		const result = countBy((x: number) => x)([5, 5, 5, 5])
		assertEquals(result, { 5: 4 })
	})

	await t.step("should handle function that returns string from number", () => {
		const digitCount = (n: number) => n.toString().length.toString()
		const result = countBy(digitCount)([1, 10, 100, 5, 50, 500])
		assertEquals(result, { "1": 2, "2": 2, "3": 2 })
	})

	await t.step("should handle complex objects", () => {
		const items = [
			{ type: "fruit", name: "apple" },
			{ type: "vegetable", name: "carrot" },
			{ type: "fruit", name: "banana" },
			{ type: "fruit", name: "orange" },
		]
		const result = countBy((item: { type: string }) => item.type)(items)
		assertEquals(result, { fruit: 3, vegetable: 1 })
	})

	await t.step("should handle nested property access", () => {
		const data = [
			{ user: { role: "admin" } },
			{ user: { role: "user" } },
			{ user: { role: "admin" } },
			{ user: { role: "guest" } },
		]
		const result = countBy((d: { user: { role: string } }) => d.user.role)(
			data,
		)
		assertEquals(result, { admin: 2, user: 1, guest: 1 })
	})

	// Property-based tests
	await t.step("property: should always return an object", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				(arr) => {
					const result = countBy((x: number) => x % 3)(arr)
					assertEquals(typeof result, "object")
					assertEquals(result !== null, true)
				},
			),
		)
	})

	await t.step(
		"property: sum of counts should equal array length",
		() => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					(arr) => {
						const result = countBy((x: number) => x % 5)(arr)
						const totalCount = Object.values(result).reduce(
							(sum, count) => sum + count,
							0,
						)
						assertEquals(totalCount, arr.length)
					},
				),
			)
		},
	)

	await t.step("property: each count should be positive", () => {
		fc.assert(
			fc.property(
				fc.array(fc.string(), { minLength: 1 }),
				(arr) => {
					const result = countBy((s: string) => s.length)(arr)
					Object.values(result).forEach((count) => {
						assertEquals(count > 0, true)
						assertEquals(Number.isInteger(count), true)
					})
				},
			),
		)
	})

	await t.step(
		"property: counting by identity should have unique values as keys",
		() => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 10 })),
					(arr) => {
						const result = countBy((x: number) => x)(arr)
						const uniqueValues = [...new Set(arr)]
						assertEquals(Object.keys(result).length, uniqueValues.length)
					},
				),
			)
		},
	)

	await t.step(
		"property: same input should always produce same output",
		() => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(arr) => {
						const fn = (x: number) => x % 2 === 0 ? "even" : "odd"
						const result1 = countBy(fn)(arr)
						const result2 = countBy(fn)(arr)
						assertEquals(result1, result2)
					},
				),
			)
		},
	)

	await t.step("property: handles various types of keys", () => {
		fc.assert(
			fc.property(
				fc.array(fc.oneof(fc.string(), fc.integer(), fc.boolean())),
				(arr) => {
					const result = countBy((x: unknown) => String(x))(arr)
					assertEquals(typeof result, "object")
					const totalCount = Object.values(result).reduce(
						(sum, count) => sum + count,
						0,
					)
					assertEquals(totalCount, arr.length)
				},
			),
		)
	})
})