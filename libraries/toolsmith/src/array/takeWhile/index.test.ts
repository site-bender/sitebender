import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import takeWhile from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Tests for takeWhile (takes from start while predicate is true)

//++ Plain array path tests

Deno.test("takeWhile takes leading elements while predicate is true", function testTakeWhileBasic() {
	const result = takeWhile(function isLessThan3(x: number) {
		return x < 3
	})([1, 2, 3, 4, 5])

	assertEquals(result, [1, 2])
})

Deno.test("takeWhile stops taking at first false predicate", function testTakeWhileStopsAtFalse() {
	const result = takeWhile(function isEven(x: number) {
		return x % 2 === 0
	})([2, 4, 6, 7, 8, 10])

	assertEquals(result, [2, 4, 6])
})

Deno.test("takeWhile returns full array when all elements match", function testTakeWhileAllMatch() {
	const result = takeWhile(function isPositive(x: number) {
		return x > 0
	})([1, 2, 3, 4, 5])

	assertEquals(result, [1, 2, 3, 4, 5])
})

Deno.test("takeWhile returns empty when first element fails", function testTakeWhileFirstFails() {
	const result = takeWhile(function isNegative(x: number) {
		return x < 0
	})([1, 2, 3, 4, 5])

	assertEquals(result, [])
})

Deno.test("takeWhile with empty array", function testTakeWhileEmpty() {
	const result = takeWhile<number>(function alwaysTrue() {
		return true
	})([])

	assertEquals(result, [])
})

Deno.test("takeWhile with single element matching", function testTakeWhileSingleMatch() {
	const result = takeWhile(function isPositive(x: number) {
		return x > 0
	})([5])

	assertEquals(result, [5])
})

Deno.test("takeWhile with single element not matching", function testTakeWhileSingleNoMatch() {
	const result = takeWhile(function isNegative(x: number) {
		return x < 0
	})([5])

	assertEquals(result, [])
})

Deno.test("takeWhile with strings", function testTakeWhileStrings() {
	const result = takeWhile(function startsWithA(s: string) {
		return s.startsWith("a")
	})(["apple", "apricot", "banana", "cherry"])

	assertEquals(result, ["apple", "apricot"])
})

Deno.test("takeWhile uses index parameter", function testTakeWhileWithIndex() {
	const result = takeWhile(function indexLessThan2(
		_element: number,
		index: number,
	) {
		return index < 2
	})([10, 20, 30, 40])

	assertEquals(result, [10, 20])
})

Deno.test("takeWhile preserves taken order", function testTakeWhilePreservesOrder() {
	const result = takeWhile(function isLessThan10(x: number) {
		return x < 10
	})([1, 2, 3, 10, 20, 30])

	assertEquals(result, [1, 2, 3])
})

//++ Result monad path tests

Deno.test("takeWhile with Result ok takes leading elements", function testTakeWhileResultOk() {
	const result = takeWhile(function isLessThan3(x: number) {
		return x < 3
	})(ok([1, 2, 3, 4, 5]))

	assertEquals(result, ok([1, 2]))
})

Deno.test("takeWhile with Result ok returns full array when all match", function testTakeWhileResultOkAllMatch() {
	const result = takeWhile(function isPositive(x: number) {
		return x > 0
	})(ok([1, 2, 3]))

	assertEquals(result, ok([1, 2, 3]))
})

Deno.test("takeWhile with Result ok returns empty when first fails", function testTakeWhileResultOkFirstFails() {
	const result = takeWhile(function isNegative(x: number) {
		return x < 0
	})(ok([1, 2, 3]))

	assertEquals(result, ok([]))
})

Deno.test("takeWhile with Result error passes through error", function testTakeWhileResultError() {
	const testError = { _tag: "TestError" as const, message: "test error" }
	const result = takeWhile(function alwaysTrue() {
		return true
	})(error(testError))

	assertEquals(result, error(testError))
})

Deno.test("takeWhile with Result ok preserves result structure", function testTakeWhileResultStructure() {
	const result = takeWhile(function isEven(x: number) {
		return x % 2 === 0
	})(ok([2, 4, 5, 6]))

	assertEquals(result, ok([2, 4]))
})

//++ Validation monad path tests

Deno.test("takeWhile with Validation success takes leading elements", function testTakeWhileValidationSuccess() {
	const result = takeWhile(function isLessThan3(x: number) {
		return x < 3
	})(success([1, 2, 3, 4, 5]))

	assertEquals(result, success([1, 2]))
})

Deno.test("takeWhile with Validation success returns full array when all match", function testTakeWhileValidationSuccessAllMatch() {
	const result = takeWhile(function isPositive(x: number) {
		return x > 0
	})(success([1, 2, 3]))

	assertEquals(result, success([1, 2, 3]))
})

Deno.test("takeWhile with Validation success returns empty when first fails", function testTakeWhileValidationSuccessFirstFails() {
	const result = takeWhile(function isNegative(x: number) {
		return x < 0
	})(success([1, 2, 3]))

	assertEquals(result, success([]))
})

Deno.test("takeWhile with Validation failure passes through failure", function testTakeWhileValidationFailure() {
	const testError = { _tag: "TestError" as const, message: "test error" }
	const result = takeWhile(function alwaysTrue() {
		return true
	})(failure([testError]))

	assertEquals(result, failure([testError]))
})

Deno.test("takeWhile with Validation success preserves validation structure", function testTakeWhileValidationStructure() {
	const result = takeWhile(function isEven(x: number) {
		return x % 2 === 0
	})(success([2, 4, 5, 6]))

	assertEquals(result, success([2, 4]))
})

//++ Property-based tests

Deno.test("takeWhile result is always prefix of original array", function testTakeWhilePrefixProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkTakeWhilePrefix(arr) {
				const result = takeWhile(function isNegative(x: number) {
					return x < 0
				})(arr)
				const resultLength = result.length
				const originalPrefix = arr.slice(0, resultLength)
				return JSON.stringify(result) === JSON.stringify(originalPrefix)
			},
		),
	)
})

Deno.test("takeWhile with always-false predicate returns empty array", function testTakeWhileAlwaysFalseProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkTakeWhileAlwaysFalse(arr) {
				const result = takeWhile(function alwaysFalse() {
					return false
				})(arr)
				return result.length === 0
			},
		),
	)
})

Deno.test("takeWhile with always-true predicate returns full array", function testTakeWhileAlwaysTrueProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkTakeWhileAlwaysTrue(arr) {
				const result = takeWhile(function alwaysTrue() {
					return true
				})(arr)
				return JSON.stringify(result) === JSON.stringify(arr)
			},
		),
	)
})

Deno.test("takeWhile result length is at most original length", function testTakeWhileLengthProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkTakeWhileLength(arr) {
				const result = takeWhile(function isPositive(x: number) {
					return x > 0
				})(arr)
				return result.length <= arr.length
			},
		),
	)
})

Deno.test("takeWhile with Result monad preserves prefix property", function testTakeWhileResultPrefixProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkTakeWhileResultPrefix(arr) {
				const result = takeWhile(function isNegative(x: number) {
					return x < 0
				})(ok(arr))
				if (result._tag === "Ok") {
					const resultLength = result.value.length
					const originalPrefix = arr.slice(0, resultLength)
					return JSON.stringify(result.value) === JSON.stringify(originalPrefix)
				}
				return false
			},
		),
	)
})

Deno.test("takeWhile with Validation monad preserves prefix property", function testTakeWhileValidationPrefixProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkTakeWhileValidationPrefix(arr) {
				const result = takeWhile(function isNegative(x: number) {
					return x < 0
				})(success(arr))
				if (result._tag === "Success") {
					const resultLength = result.value.length
					const originalPrefix = arr.slice(0, resultLength)
					return JSON.stringify(result.value) === JSON.stringify(originalPrefix)
				}
				return false
			},
		),
	)
})
