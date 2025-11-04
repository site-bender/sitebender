import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import groupBy from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Tests for groupBy (groups elements by a key function into a Record)

//++ Plain array path tests

Deno.test("groupBy groups elements by key function", function testGroupByBasic() {
	const result = groupBy(function getType(x: number): string {
		return x % 2 === 0 ? "even" : "odd"
	})([1, 2, 3, 4, 5, 6])

	assertEquals(result, {
		even: [2, 4, 6],
		odd: [1, 3, 5],
	})
})

Deno.test("groupBy with strings", function testGroupByStrings() {
	const result = groupBy(function getFirstLetter(s: string): string {
		return s[0]
	})(["apple", "apricot", "banana", "cherry", "avocado"])

	assertEquals(result, {
		a: ["apple", "apricot", "avocado"],
		b: ["banana"],
		c: ["cherry"],
	})
})

Deno.test("groupBy with empty array", function testGroupByEmpty() {
	const result = groupBy<number, string>(function getType() {
		return "key"
	})([])

	assertEquals(result, {})
})

Deno.test("groupBy with single element", function testGroupBySingle() {
	const result = groupBy(function getType(x: number): string {
		return String(x)
	})([42])

	assertEquals(result, { "42": [42] })
})

Deno.test("groupBy all elements same key", function testGroupByAllSameKey() {
	const result = groupBy(function alwaysSame(): string {
		return "same"
	})([1, 2, 3, 4, 5])

	assertEquals(result, { same: [1, 2, 3, 4, 5] })
})

Deno.test("groupBy each element different key", function testGroupByAllDifferent() {
	const result = groupBy(function getIdentity(x: number): string {
		return String(x)
	})([1, 2, 3])

	assertEquals(result, {
		"1": [1],
		"2": [2],
		"3": [3],
	})
})

Deno.test("groupBy by object property", function testGroupByProperty() {
	interface Person {
		name: string
		age: number
	}

	const result = groupBy(function getAgeGroup(p: Person): string {
		return p.age < 18 ? "minor" : "adult"
	})([
		{ name: "Alice", age: 25 },
		{ name: "Bob", age: 15 },
		{ name: "Charlie", age: 30 },
		{ name: "David", age: 12 },
	])

	assertEquals(result, {
		adult: [
			{ name: "Alice", age: 25 },
			{ name: "Charlie", age: 30 },
		],
		minor: [
			{ name: "Bob", age: 15 },
			{ name: "David", age: 12 },
		],
	})
})

Deno.test("groupBy with numeric keys", function testGroupByNumeric() {
	const result = groupBy(function getLength(s: string): number {
		return s.length
	})(["a", "bb", "ccc", "dd", "e"])

	assertEquals(result, {
		"1": ["a", "e"],
		"2": ["bb", "dd"],
		"3": ["ccc"],
	})
})

Deno.test("groupBy preserves order within groups", function testGroupByOrder() {
	const result = groupBy(function isVowel(s: string): string {
		return "aeiou".includes(s[0]) ? "vowel" : "consonant"
	})(["apple", "banana", "avocado", "cherry", "orange"])

	assertEquals(result, {
		vowel: ["apple", "avocado", "orange"],
		consonant: ["banana", "cherry"],
	})
})

Deno.test("groupBy with large array", function testGroupByLarge() {
	const largeArray = Array.from({ length: 1000 }, function makeNumber(_, i) {
		return i
	})

	const result = groupBy(function getMod10(x: number): string {
		return String(x % 10)
	})(largeArray)

	// Each group should have 100 elements
	assertEquals(Object.keys(result).length, 10)
	assertEquals(result["0"].length, 100)
	assertEquals(result["5"].length, 100)
})

//++ Result monad path tests

Deno.test("groupBy with Result ok groups elements", function testGroupByResultOk() {
	const result = groupBy(function getType(x: number): string {
		return x % 2 === 0 ? "even" : "odd"
	})(ok([1, 2, 3, 4, 5, 6]))

	assertEquals(result, ok({
		even: [2, 4, 6],
		odd: [1, 3, 5],
	}))
})

Deno.test("groupBy with Result ok and empty array", function testGroupByResultEmpty() {
	const result = groupBy<number, string>(function getType() {
		return "key"
	})(ok([]))

	assertEquals(result, ok({}))
})

Deno.test("groupBy with Result error passes through", function testGroupByResultError() {
	const err = error({ code: "TEST_ERROR", message: "Test error" })
	const result = groupBy(function getType(x: number): string {
		return String(x)
	})(err)

	assertEquals(result, err)
})

//++ Validation monad path tests

Deno.test("groupBy with Validation success groups elements", function testGroupByValidationSuccess() {
	const result = groupBy(function getType(x: number): string {
		return x % 2 === 0 ? "even" : "odd"
	})(success([1, 2, 3, 4, 5, 6]))

	assertEquals(result, success({
		even: [2, 4, 6],
		odd: [1, 3, 5],
	}))
})

Deno.test("groupBy with Validation success and empty array", function testGroupByValidationEmpty() {
	const result = groupBy<number, string>(function getType() {
		return "key"
	})(success([]))

	assertEquals(result, success({}))
})

Deno.test("groupBy with Validation failure passes through", function testGroupByValidationFailure() {
	const fail = failure([{ code: "TEST_ERROR", message: "Test error" }])
	const result = groupBy(function getType(x: number): string {
		return String(x)
	})(fail)

	assertEquals(result, fail)
})

//++ Property-based tests

Deno.test("groupBy total elements equals input length", function testGroupByTotalProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function propertyGroupByTotal(arr: ReadonlyArray<number>) {
				const result = groupBy(function getMod3(x: number): string {
					return String(x % 3)
				})(arr)

				const totalElements = Object.values(result).reduce(
					function sumLengths(sum: number, group: ReadonlyArray<number>): number {
						return sum + group.length
					},
					0,
				)

				assertEquals(totalElements, arr.length)
			},
		),
	)
})

Deno.test("groupBy with identity key creates separate groups", function testGroupByIdentityProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { maxLength: 20 }),
			function propertyGroupByIdentity(arr: ReadonlyArray<number>) {
				const result = groupBy(function getIdentity(x: number): string {
					return String(x)
				})(arr)

				// Each unique value should be in its own group
				Object.values(result).forEach(function checkGroupSize(
					group: ReadonlyArray<number>,
				) {
					const firstElement = group[0]
					// All elements in group should be the same
					group.forEach(function checkElement(element: number) {
						assertEquals(element, firstElement)
					})
				})
			},
		),
	)
})

Deno.test("groupBy with constant key creates single group", function testGroupByConstantProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1 }),
			function propertyGroupByConstant(arr: ReadonlyArray<number>) {
				const result = groupBy(function alwaysSame(): string {
					return "same"
				})(arr)

				assertEquals(Object.keys(result).length, 1)
				assertEquals(result.same.length, arr.length)
			},
		),
	)
})

Deno.test("groupBy always returns Record type", function testGroupByTypeProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function propertyGroupByType(arr: ReadonlyArray<number>) {
				const result = groupBy(function getMod2(x: number): string {
					return String(x % 2)
				})(arr)

				assertEquals(typeof result, "object")
				assertEquals(result !== null, true)
				assertEquals(Array.isArray(result), false)
			},
		),
	)
})
