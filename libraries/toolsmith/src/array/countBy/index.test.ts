import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import countBy from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Tests for countBy (counts elements by grouping criteria)

//++ Plain array path tests

Deno.test("countBy counts elements by key function", function testCountByBasic() {
	const result = countBy(function getType(x: number): string {
		return x % 2 === 0 ? "even" : "odd"
	})([1, 2, 3, 4, 5, 6])

	assertEquals(result, {
		even: 3,
		odd: 3,
	})
})

Deno.test("countBy with strings", function testCountByStrings() {
	const result = countBy(function getFirstLetter(s: string): string {
		return s[0]
	})(["apple", "apricot", "banana", "cherry", "avocado"])

	assertEquals(result, {
		a: 3,
		b: 1,
		c: 1,
	})
})

Deno.test("countBy with empty array", function testCountByEmpty() {
	const result = countBy<number, string>(function getType() {
		return "key"
	})([])

	assertEquals(result, {})
})

Deno.test("countBy with single element", function testCountBySingle() {
	const result = countBy(function getType(x: number): string {
		return String(x)
	})([42])

	assertEquals(result, { "42": 1 })
})

Deno.test("countBy all elements same key", function testCountByAllSameKey() {
	const result = countBy(function alwaysSame(): string {
		return "same"
	})([1, 2, 3, 4, 5])

	assertEquals(result, { same: 5 })
})

Deno.test("countBy each element different key", function testCountByAllDifferent() {
	const result = countBy(function getIdentity(x: number): string {
		return String(x)
	})([1, 2, 3])

	assertEquals(result, {
		"1": 1,
		"2": 1,
		"3": 1,
	})
})

Deno.test("countBy by object property", function testCountByProperty() {
	interface Person {
		name: string
		age: number
	}

	const result = countBy(function getAgeGroup(p: Person): string {
		return p.age < 18 ? "minor" : "adult"
	})([
		{ name: "Alice", age: 25 },
		{ name: "Bob", age: 15 },
		{ name: "Charlie", age: 30 },
		{ name: "David", age: 12 },
		{ name: "Eve", age: 16 },
	])

	assertEquals(result, {
		adult: 2,
		minor: 3,
	})
})

Deno.test("countBy with numeric keys", function testCountByNumeric() {
	const result = countBy(function getLength(s: string): number {
		return s.length
	})(["a", "bb", "ccc", "dd", "e", "fff"])

	assertEquals(result, {
		1: 2,
		2: 2,
		3: 2,
	})
})

Deno.test("countBy with duplicate values", function testCountByDuplicates() {
	const result = countBy(function getIdentity(x: number): string {
		return String(x)
	})([1, 2, 1, 3, 2, 1, 4])

	assertEquals(result, {
		"1": 3,
		"2": 2,
		"3": 1,
		"4": 1,
	})
})

Deno.test("countBy with large array", function testCountByLarge() {
	const largeArray = Array.from({ length: 1000 }, function makeNumber(_, i) {
		return i
	})

	const result = countBy(function getMod10(x: number): string {
		return String(x % 10)
	})(largeArray)

	// Each group should have 100 elements
	assertEquals(Object.keys(result).length, 10)
	assertEquals(result["0"], 100)
	assertEquals(result["5"], 100)
})

//++ Result monad path tests

Deno.test("countBy with Result ok counts elements", function testCountByResultOk() {
	const result = countBy(function getType(x: number): string {
		return x % 2 === 0 ? "even" : "odd"
	})(ok([1, 2, 3, 4, 5, 6]))

	assertEquals(result, ok({
		even: 3,
		odd: 3,
	}))
})

Deno.test("countBy with Result ok and empty array", function testCountByResultEmpty() {
	const result = countBy<number, string>(function getType() {
		return "key"
	})(ok([]))

	assertEquals(result, ok({}))
})

Deno.test("countBy with Result error passes through", function testCountByResultError() {
	const err = error({
		code: "UPSTREAM_ERROR",
		field: "data",
		messages: ["Upstream error occurred"],
		received: "null",
		expected: "Array",
		suggestion: "Fix upstream issue",
		severity: "requirement" as const,
	})
	const result = countBy(function getType(x: number): string {
		return String(x)
	})(err)

	assertEquals(result, err)
})

//++ Validation monad path tests

Deno.test("countBy with Validation success counts elements", function testCountByValidationSuccess() {
	const result = countBy(function getType(x: number): string {
		return x % 2 === 0 ? "even" : "odd"
	})(success([1, 2, 3, 4, 5, 6]))

	assertEquals(result, success({
		even: 3,
		odd: 3,
	}))
})

Deno.test("countBy with Validation success and empty array", function testCountByValidationEmpty() {
	const result = countBy<number, string>(function getType() {
		return "key"
	})(success([]))

	assertEquals(result, success({}))
})

Deno.test("countBy with Validation failure passes through", function testCountByValidationFailure() {
	const fail = failure([{
		code: "UPSTREAM_VALIDATION_ERROR",
		field: "data",
		messages: ["Validation failed upstream"],
		received: "null",
		expected: "Array",
		suggestion: "Fix validation issues",
		severity: "requirement" as const,
	}])
	const result = countBy(function getType(x: number): string {
		return String(x)
	})(fail)

	assertEquals(result, fail)
})

//++ Property-based tests

Deno.test("countBy sum of counts equals input length", function testCountBySumProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function propertyCountBySum(arr: ReadonlyArray<number>) {
				const result = countBy(function getMod3(x: number): string {
					return String(x % 3)
				})(arr)

				const totalCount = Object.values(result).reduce(
					function sumCounts(sum: number, count: number): number {
						return sum + count
					},
					0,
				)

				assertEquals(totalCount, arr.length)
			},
		),
	)
})

Deno.test("countBy all counts are positive", function testCountByPositiveProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1 }),
			function propertyCountByPositive(arr: ReadonlyArray<number>) {
				const result = countBy(function getMod2(x: number): string {
					return String(x % 2)
				})(arr)

				Object.values(result).forEach(function checkPositive(count: number) {
					assertEquals(count > 0, true)
				})
			},
		),
	)
})

Deno.test("countBy with constant key returns array length", function testCountByConstantProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1 }),
			function propertyCountByConstant(arr: ReadonlyArray<number>) {
				const result = countBy(function alwaysSame(): string {
					return "same"
				})(arr)

				assertEquals(result.same, arr.length)
			},
		),
	)
})

Deno.test("countBy always returns Record with numbers", function testCountByTypeProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function propertyCountByType(arr: ReadonlyArray<number>) {
				const result = countBy(function getMod2(x: number): string {
					return String(x % 2)
				})(arr)

				assertEquals(typeof result, "object")
				assertEquals(result !== null, true)
				Object.values(result).forEach(function checkNumberType(count: number) {
					assertEquals(typeof count, "number")
				})
			},
		),
	)
})
