import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import partition from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Tests for partition (splits array by predicate into two groups)

//++ Plain array path tests

Deno.test("partition splits array into pass and fail groups", function testPartitionBasic() {
	const result = partition(function isEven(x: number) {
		return x % 2 === 0
	})([1, 2, 3, 4, 5, 6])

	assertEquals(result, [[2, 4, 6], [1, 3, 5]])
})

Deno.test("partition with all elements passing", function testPartitionAllPass() {
	const result = partition(function isPositive(x: number) {
		return x > 0
	})([1, 2, 3, 4, 5])

	assertEquals(result, [[1, 2, 3, 4, 5], []])
})

Deno.test("partition with all elements failing", function testPartitionAllFail() {
	const result = partition(function isNegative(x: number) {
		return x < 0
	})([1, 2, 3, 4, 5])

	assertEquals(result, [[], [1, 2, 3, 4, 5]])
})

Deno.test("partition with empty array", function testPartitionEmpty() {
	const result = partition<number>(function alwaysTrue() {
		return true
	})([])

	assertEquals(result, [[], []])
})

Deno.test("partition with single element passing", function testPartitionSinglePass() {
	const result = partition(function isPositive(x: number) {
		return x > 0
	})([5])

	assertEquals(result, [[5], []])
})

Deno.test("partition with single element failing", function testPartitionSingleFail() {
	const result = partition(function isNegative(x: number) {
		return x < 0
	})([5])

	assertEquals(result, [[], [5]])
})

Deno.test("partition with strings", function testPartitionStrings() {
	const result = partition(function startsWithA(s: string) {
		return s.startsWith("a")
	})(["apple", "banana", "apricot", "cherry"])

	assertEquals(result, [["apple", "apricot"], ["banana", "cherry"]])
})

Deno.test("partition uses index parameter", function testPartitionWithIndex() {
	const result = partition(function indexIsEven(_element: number, index: number) {
		return index % 2 === 0
	})([10, 20, 30, 40, 50])

	assertEquals(result, [[10, 30, 50], [20, 40]])
})

Deno.test("partition preserves order in both groups", function testPartitionPreservesOrder() {
	const result = partition(function isGreaterThan3(x: number) {
		return x > 3
	})([1, 5, 2, 6, 3, 7])

	assertEquals(result, [[5, 6, 7], [1, 2, 3]])
})

Deno.test("partition with mixed values", function testPartitionMixed() {
	const result = partition(function isLessThan5(x: number) {
		return x < 5
	})([3, 7, 1, 9, 2, 8, 4, 6])

	assertEquals(result, [[3, 1, 2, 4], [7, 9, 8, 6]])
})

//++ Result monad path tests

Deno.test("partition with Result ok splits into groups", function testPartitionResultOk() {
	const result = partition(function isEven(x: number) {
		return x % 2 === 0
	})(ok([1, 2, 3, 4, 5, 6]))

	assertEquals(result, ok([[2, 4, 6], [1, 3, 5]]))
})

Deno.test("partition with Result ok and all passing", function testPartitionResultOkAllPass() {
	const result = partition(function isPositive(x: number) {
		return x > 0
	})(ok([1, 2, 3]))

	assertEquals(result, ok([[1, 2, 3], []]))
})

Deno.test("partition with Result ok and all failing", function testPartitionResultOkAllFail() {
	const result = partition(function isNegative(x: number) {
		return x < 0
	})(ok([1, 2, 3]))

	assertEquals(result, ok([[], [1, 2, 3]]))
})

Deno.test("partition with Result error passes through error", function testPartitionResultError() {
	const testError = { _tag: "TestError" as const, message: "test error" }
	const result = partition(function alwaysTrue() {
		return true
	})(error(testError))

	assertEquals(result, error(testError))
})

Deno.test("partition with Result ok preserves result structure", function testPartitionResultStructure() {
	const result = partition(function isGreaterThan3(x: number) {
		return x > 3
	})(ok([1, 2, 3, 4, 5]))

	assertEquals(result, ok([[4, 5], [1, 2, 3]]))
})

//++ Validation monad path tests

Deno.test("partition with Validation success splits into groups", function testPartitionValidationSuccess() {
	const result = partition(function isEven(x: number) {
		return x % 2 === 0
	})(success([1, 2, 3, 4, 5, 6]))

	assertEquals(result, success([[2, 4, 6], [1, 3, 5]]))
})

Deno.test("partition with Validation success and all passing", function testPartitionValidationSuccessAllPass() {
	const result = partition(function isPositive(x: number) {
		return x > 0
	})(success([1, 2, 3]))

	assertEquals(result, success([[1, 2, 3], []]))
})

Deno.test("partition with Validation success and all failing", function testPartitionValidationSuccessAllFail() {
	const result = partition(function isNegative(x: number) {
		return x < 0
	})(success([1, 2, 3]))

	assertEquals(result, success([[], [1, 2, 3]]))
})

Deno.test("partition with Validation failure passes through failure", function testPartitionValidationFailure() {
	const testError = { _tag: "TestError" as const, message: "test error" }
	const result = partition(function alwaysTrue() {
		return true
	})(failure([testError]))

	assertEquals(result, failure([testError]))
})

Deno.test("partition with Validation success preserves validation structure", function testPartitionValidationStructure() {
	const result = partition(function isGreaterThan3(x: number) {
		return x > 3
	})(success([1, 2, 3, 4, 5]))

	assertEquals(result, success([[4, 5], [1, 2, 3]]))
})

//++ Property-based tests

Deno.test("partition combined groups equal original array length", function testPartitionLengthProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkPartitionLength(arr) {
				const [pass, fail] = partition(function isPositive(x: number) {
					return x > 0
				})(arr)
				return pass.length + fail.length === arr.length
			},
		),
	)
})

Deno.test("partition pass group contains only matching elements", function testPartitionPassProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkPartitionPass(arr) {
				const [pass] = partition(function isPositive(x: number) {
					return x > 0
				})(arr)
				return pass.every(function checkPositive(x: number) {
					return x > 0
				})
			},
		),
	)
})

Deno.test("partition fail group contains only non-matching elements", function testPartitionFailProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkPartitionFail(arr) {
				const [, fail] = partition(function isPositive(x: number) {
					return x > 0
				})(arr)
				return fail.every(function checkNonPositive(x: number) {
					return x <= 0
				})
			},
		),
	)
})

Deno.test("partition with always-true predicate puts all in pass", function testPartitionAlwaysTrueProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkPartitionAlwaysTrue(arr) {
				const [pass, fail] = partition(function alwaysTrue() {
					return true
				})(arr)
				return pass.length === arr.length && fail.length === 0
			},
		),
	)
})

Deno.test("partition with always-false predicate puts all in fail", function testPartitionAlwaysFalseProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkPartitionAlwaysFalse(arr) {
				const [pass, fail] = partition(function alwaysFalse() {
					return false
				})(arr)
				return pass.length === 0 && fail.length === arr.length
			},
		),
	)
})

Deno.test("partition with Result monad preserves length property", function testPartitionResultLengthProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkPartitionResultLength(arr) {
				const result = partition(function isPositive(x: number) {
					return x > 0
				})(ok(arr))
				if (result._tag === "Ok") {
					const [pass, fail] = result.value
					return pass.length + fail.length === arr.length
				}
				return false
			},
		),
	)
})

Deno.test("partition with Validation monad preserves length property", function testPartitionValidationLengthProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkPartitionValidationLength(arr) {
				const result = partition(function isPositive(x: number) {
					return x > 0
				})(success(arr))
				if (result._tag === "Success") {
					const [pass, fail] = result.value
					return pass.length + fail.length === arr.length
				}
				return false
			},
		),
	)
})
