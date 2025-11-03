import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import dropWhile from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Tests for dropWhile (drops leading elements while predicate is true)

//++ Plain array path tests

Deno.test("dropWhile drops leading elements while predicate is true", function testDropWhileBasic() {
	const result = dropWhile(function isLessThan3(x: number) {
		return x < 3
	})([1, 2, 3, 4, 5])

	assertEquals(result, [3, 4, 5])
})

Deno.test("dropWhile stops dropping at first false predicate", function testDropWhileStopsAtFalse() {
	const result = dropWhile(function isEven(x: number) {
		return x % 2 === 0
	})([2, 4, 6, 7, 8, 10])

	assertEquals(result, [7, 8, 10])
})

Deno.test("dropWhile returns empty when all elements match", function testDropWhileAllMatch() {
	const result = dropWhile(function isPositive(x: number) {
		return x > 0
	})([1, 2, 3, 4, 5])

	assertEquals(result, [])
})

Deno.test("dropWhile returns full array when first element fails", function testDropWhileFirstFails() {
	const result = dropWhile(function isNegative(x: number) {
		return x < 0
	})([1, 2, 3, 4, 5])

	assertEquals(result, [1, 2, 3, 4, 5])
})

Deno.test("dropWhile with empty array", function testDropWhileEmpty() {
	const result = dropWhile<number>(function alwaysTrue() {
		return true
	})([])

	assertEquals(result, [])
})

Deno.test("dropWhile with single element matching", function testDropWhileSingleMatch() {
	const result = dropWhile(function isPositive(x: number) {
		return x > 0
	})([5])

	assertEquals(result, [])
})

Deno.test("dropWhile with single element not matching", function testDropWhileSingleNoMatch() {
	const result = dropWhile(function isNegative(x: number) {
		return x < 0
	})([5])

	assertEquals(result, [5])
})

Deno.test("dropWhile with strings", function testDropWhileStrings() {
	const result = dropWhile(function startsWithA(s: string) {
		return s.startsWith("a")
	})(["apple", "apricot", "banana", "cherry"])

	assertEquals(result, ["banana", "cherry"])
})

Deno.test("dropWhile uses index parameter", function testDropWhileWithIndex() {
	const result = dropWhile(function indexLessThan2(
		_element: number,
		index: number,
	) {
		return index < 2
	})([10, 20, 30, 40])

	assertEquals(result, [30, 40])
})

Deno.test("dropWhile preserves remaining order", function testDropWhilePreservesOrder() {
	const result = dropWhile(function isLessThan10(x: number) {
		return x < 10
	})([1, 2, 3, 10, 20, 30])

	assertEquals(result, [10, 20, 30])
})

//++ Result monad path tests

Deno.test("dropWhile with Result ok drops leading elements", function testDropWhileResultOk() {
	const result = dropWhile(function isLessThan3(x: number) {
		return x < 3
	})(ok([1, 2, 3, 4, 5]))

	assertEquals(result, ok([3, 4, 5]))
})

Deno.test("dropWhile with Result ok returns empty when all match", function testDropWhileResultOkAllMatch() {
	const result = dropWhile(function isPositive(x: number) {
		return x > 0
	})(ok([1, 2, 3]))

	assertEquals(result, ok([]))
})

Deno.test("dropWhile with Result ok returns full array when first fails", function testDropWhileResultOkFirstFails() {
	const result = dropWhile(function isNegative(x: number) {
		return x < 0
	})(ok([1, 2, 3]))

	assertEquals(result, ok([1, 2, 3]))
})

Deno.test("dropWhile with Result error passes through error", function testDropWhileResultError() {
	const testError = { _tag: "TestError" as const, message: "test error" }
	const result = dropWhile(function alwaysTrue() {
		return true
	})(error(testError))

	assertEquals(result, error(testError))
})

Deno.test("dropWhile with Result ok preserves result structure", function testDropWhileResultStructure() {
	const result = dropWhile(function isEven(x: number) {
		return x % 2 === 0
	})(ok([2, 4, 5, 6]))

	assertEquals(result, ok([5, 6]))
})

//++ Validation monad path tests

Deno.test("dropWhile with Validation success drops leading elements", function testDropWhileValidationSuccess() {
	const result = dropWhile(function isLessThan3(x: number) {
		return x < 3
	})(success([1, 2, 3, 4, 5]))

	assertEquals(result, success([3, 4, 5]))
})

Deno.test("dropWhile with Validation success returns empty when all match", function testDropWhileValidationSuccessAllMatch() {
	const result = dropWhile(function isPositive(x: number) {
		return x > 0
	})(success([1, 2, 3]))

	assertEquals(result, success([]))
})

Deno.test("dropWhile with Validation success returns full array when first fails", function testDropWhileValidationSuccessFirstFails() {
	const result = dropWhile(function isNegative(x: number) {
		return x < 0
	})(success([1, 2, 3]))

	assertEquals(result, success([1, 2, 3]))
})

Deno.test("dropWhile with Validation failure passes through failure", function testDropWhileValidationFailure() {
	const testError = { _tag: "TestError" as const, message: "test error" }
	const result = dropWhile(function alwaysTrue() {
		return true
	})(failure([testError]))

	assertEquals(result, failure([testError]))
})

Deno.test("dropWhile with Validation success preserves validation structure", function testDropWhileValidationStructure() {
	const result = dropWhile(function isEven(x: number) {
		return x % 2 === 0
	})(success([2, 4, 5, 6]))

	assertEquals(result, success([5, 6]))
})

//++ Property-based tests

Deno.test("dropWhile result is always suffix of original array", function testDropWhileSuffixProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkDropWhileSuffix(arr) {
				const result = dropWhile(function isNegative(x: number) {
					return x < 0
				})(arr)
				const resultLength = result.length
				const originalSuffix = arr.slice(arr.length - resultLength)
				return JSON.stringify(result) === JSON.stringify(originalSuffix)
			},
		),
	)
})

Deno.test("dropWhile with always-false predicate returns full array", function testDropWhileAlwaysFalseProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkDropWhileAlwaysFalse(arr) {
				const result = dropWhile(function alwaysFalse() {
					return false
				})(arr)
				return JSON.stringify(result) === JSON.stringify(arr)
			},
		),
	)
})

Deno.test("dropWhile with always-true predicate returns empty array", function testDropWhileAlwaysTrueProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkDropWhileAlwaysTrue(arr) {
				const result = dropWhile(function alwaysTrue() {
					return true
				})(arr)
				return result.length === 0
			},
		),
	)
})

Deno.test("dropWhile result length is at most original length", function testDropWhileLengthProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkDropWhileLength(arr) {
				const result = dropWhile(function isPositive(x: number) {
					return x > 0
				})(arr)
				return result.length <= arr.length
			},
		),
	)
})

Deno.test("dropWhile with Result monad preserves suffix property", function testDropWhileResultSuffixProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkDropWhileResultSuffix(arr) {
				const result = dropWhile(function isNegative(x: number) {
					return x < 0
				})(ok(arr))
				if (result._tag === "Ok") {
					const resultLength = result.value.length
					const originalSuffix = arr.slice(arr.length - resultLength)
					return JSON.stringify(result.value) === JSON.stringify(originalSuffix)
				}
				return false
			},
		),
	)
})

Deno.test("dropWhile with Validation monad preserves suffix property", function testDropWhileValidationSuffixProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkDropWhileValidationSuffix(arr) {
				const result = dropWhile(function isNegative(x: number) {
					return x < 0
				})(success(arr))
				if (result._tag === "Success") {
					const resultLength = result.value.length
					const originalSuffix = arr.slice(arr.length - resultLength)
					return JSON.stringify(result.value) === JSON.stringify(originalSuffix)
				}
				return false
			},
		),
	)
})
