import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import reject from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Tests for reject (removes elements that satisfy predicate)

//++ Plain array path tests

Deno.test("reject removes elements matching predicate", function testRejectBasic() {
	const result = reject(function isEven(x: number) {
		return x % 2 === 0
	})([1, 2, 3, 4, 5, 6])

	assertEquals(result, [1, 3, 5])
})

Deno.test("reject keeps elements not matching predicate", function testRejectKeepsNonMatching() {
	const result = reject(function isNegative(x: number) {
		return x < 0
	})([1, -2, 3, -4, 5])

	assertEquals(result, [1, 3, 5])
})

Deno.test("reject with no matches returns full array", function testRejectNoMatches() {
	const result = reject(function isNegative(x: number) {
		return x < 0
	})([1, 2, 3, 4, 5])

	assertEquals(result, [1, 2, 3, 4, 5])
})

Deno.test("reject with all matches returns empty array", function testRejectAllMatches() {
	const result = reject(function isPositive(x: number) {
		return x > 0
	})([1, 2, 3, 4, 5])

	assertEquals(result, [])
})

Deno.test("reject with empty array", function testRejectEmpty() {
	const result = reject<number>(function alwaysTrue() {
		return true
	})([])

	assertEquals(result, [])
})

Deno.test("reject with single element matching", function testRejectSingleMatch() {
	const result = reject(function isPositive(x: number) {
		return x > 0
	})([5])

	assertEquals(result, [])
})

Deno.test("reject with single element not matching", function testRejectSingleNoMatch() {
	const result = reject(function isNegative(x: number) {
		return x < 0
	})([5])

	assertEquals(result, [5])
})

Deno.test("reject with strings", function testRejectStrings() {
	const result = reject(function startsWithA(s: string) {
		return s.startsWith("a")
	})(["apple", "banana", "apricot", "cherry"])

	assertEquals(result, ["banana", "cherry"])
})

Deno.test("reject uses index parameter", function testRejectWithIndex() {
	const result = reject(function indexIsEven(_element: number, index: number) {
		return index % 2 === 0
	})([10, 20, 30, 40, 50])

	assertEquals(result, [20, 40])
})

Deno.test("reject preserves order of kept elements", function testRejectPreservesOrder() {
	const result = reject(function isEven(x: number) {
		return x % 2 === 0
	})([1, 2, 3, 4, 5, 6, 7, 8])

	assertEquals(result, [1, 3, 5, 7])
})

//++ Result monad path tests

Deno.test("reject with Result ok removes matching elements", function testRejectResultOk() {
	const result = reject(function isEven(x: number) {
		return x % 2 === 0
	})(ok([1, 2, 3, 4, 5, 6]))

	assertEquals(result, ok([1, 3, 5]))
})

Deno.test("reject with Result ok returns empty when all match", function testRejectResultOkAllMatch() {
	const result = reject(function isPositive(x: number) {
		return x > 0
	})(ok([1, 2, 3]))

	assertEquals(result, ok([]))
})

Deno.test("reject with Result ok returns full array when none match", function testRejectResultOkNoneMatch() {
	const result = reject(function isNegative(x: number) {
		return x < 0
	})(ok([1, 2, 3]))

	assertEquals(result, ok([1, 2, 3]))
})

Deno.test("reject with Result error passes through error", function testRejectResultError() {
	const testError = { _tag: "TestError" as const, message: "test error" }
	const result = reject(function alwaysTrue() {
		return true
	})(error(testError))

	assertEquals(result, error(testError))
})

Deno.test("reject with Result ok preserves result structure", function testRejectResultStructure() {
	const result = reject(function isGreaterThan3(x: number) {
		return x > 3
	})(ok([1, 2, 3, 4, 5]))

	assertEquals(result, ok([1, 2, 3]))
})

//++ Validation monad path tests

Deno.test("reject with Validation success removes matching elements", function testRejectValidationSuccess() {
	const result = reject(function isEven(x: number) {
		return x % 2 === 0
	})(success([1, 2, 3, 4, 5, 6]))

	assertEquals(result, success([1, 3, 5]))
})

Deno.test("reject with Validation success returns empty when all match", function testRejectValidationSuccessAllMatch() {
	const result = reject(function isPositive(x: number) {
		return x > 0
	})(success([1, 2, 3]))

	assertEquals(result, success([]))
})

Deno.test("reject with Validation success returns full array when none match", function testRejectValidationSuccessNoneMatch() {
	const result = reject(function isNegative(x: number) {
		return x < 0
	})(success([1, 2, 3]))

	assertEquals(result, success([1, 2, 3]))
})

Deno.test("reject with Validation failure passes through failure", function testRejectValidationFailure() {
	const testError = { _tag: "TestError" as const, message: "test error" }
	const result = reject(function alwaysTrue() {
		return true
	})(failure([testError]))

	assertEquals(result, failure([testError]))
})

Deno.test("reject with Validation success preserves validation structure", function testRejectValidationStructure() {
	const result = reject(function isGreaterThan3(x: number) {
		return x > 3
	})(success([1, 2, 3, 4, 5]))

	assertEquals(result, success([1, 2, 3]))
})

//++ Property-based tests

Deno.test("reject result length is at most original length", function testRejectLengthProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkRejectLength(arr) {
				const result = reject(function alwaysTrue() {
					return true
				})(arr)
				return result.length <= arr.length
			},
		),
	)
})

Deno.test("reject with always-false predicate returns full array", function testRejectAlwaysFalseProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkRejectAlwaysFalse(arr) {
				const result = reject(function alwaysFalse() {
					return false
				})(arr)
				return JSON.stringify(result) === JSON.stringify(arr)
			},
		),
	)
})

Deno.test("reject with always-true predicate returns empty array", function testRejectAlwaysTrueProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkRejectAlwaysTrue(arr) {
				const result = reject(function alwaysTrue() {
					return true
				})(arr)
				return result.length === 0
			},
		),
	)
})

Deno.test("reject preserves all non-matching elements", function testRejectPreservesNonMatchingProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkRejectPreservesNonMatching(arr) {
				const result = reject(function isNegative(x: number) {
					return x < 0
				})(arr)
				return result.every(function checkNonNegative(x: number) {
					return x >= 0
				})
			},
		),
	)
})

Deno.test("reject with Result monad preserves length property", function testRejectResultLengthProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkRejectResultLength(arr) {
				const result = reject(function alwaysTrue() {
					return true
				})(ok(arr))
				if (result._tag === "Ok") {
					return result.value.length <= arr.length
				}
				return false
			},
		),
	)
})

Deno.test("reject with Validation monad preserves length property", function testRejectValidationLengthProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkRejectValidationLength(arr) {
				const result = reject(function alwaysTrue() {
					return true
				})(success(arr))
				if (result._tag === "Success") {
					return result.value.length <= arr.length
				}
				return false
			},
		),
	)
})
