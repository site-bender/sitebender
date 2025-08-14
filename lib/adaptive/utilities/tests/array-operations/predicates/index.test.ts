import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import * as fc from "fast-check"
import all from "../../../array/all/index.ts"
import some from "../../../array/some/index.ts"
import none from "../../../array/none/index.ts"

describe("Array Predicate Behaviors", () => {
	describe("when checking if all elements match", () => {
		it("returns true when all elements match predicate", () => {
			const isPositive = (n: number) => n > 0
			const result = all(isPositive)([1, 2, 3, 4, 5])
			expect(result).toBe(true)
		})

		it("returns false when at least one element doesn't match", () => {
			const isPositive = (n: number) => n > 0
			const result = all(isPositive)([1, 2, -3, 4, 5])
			expect(result).toBe(false)
		})

		it("returns false when first element doesn't match", () => {
			const isPositive = (n: number) => n > 0
			const result = all(isPositive)([-1, 2, 3, 4, 5])
			expect(result).toBe(false)
		})

		it("returns false when last element doesn't match", () => {
			const isPositive = (n: number) => n > 0
			const result = all(isPositive)([1, 2, 3, 4, -5])
			expect(result).toBe(false)
		})

		it("returns true for empty array", () => {
			const isPositive = (n: number) => n > 0
			const result = all(isPositive)([])
			expect(result).toBe(true)
		})

		it("works with different types", () => {
			const isLongString = (s: string) => s.length > 2
			expect(all(isLongString)(["foo", "bar", "baz"])).toBe(true)
			expect(all(isLongString)(["foo", "x", "baz"])).toBe(false)
		})

		it("stops checking after first false", () => {
			let checks = 0
			const predicate = (n: number) => {
				checks++
				return n < 3
			}
			const result = all(predicate)([1, 2, 3, 4, 5])
			expect(result).toBe(false)
			expect(checks).toBe(3)
		})

		it("handles complex predicates", () => {
			const users = [
				{ name: "Alice", age: 25 },
				{ name: "Bob", age: 30 },
				{ name: "Charlie", age: 28 },
			]
			const isAdult = (user: { age: number }) => user.age >= 18
			expect(all(isAdult)(users)).toBe(true)
		})
	})

	describe("when checking if some elements match", () => {
		it("returns true when at least one element matches", () => {
			const isEven = (n: number) => n % 2 === 0
			const result = some(isEven)([1, 3, 4, 5, 7])
			expect(result).toBe(true)
		})

		it("returns true when all elements match", () => {
			const isEven = (n: number) => n % 2 === 0
			const result = some(isEven)([2, 4, 6, 8])
			expect(result).toBe(true)
		})

		it("returns false when no elements match", () => {
			const isEven = (n: number) => n % 2 === 0
			const result = some(isEven)([1, 3, 5, 7])
			expect(result).toBe(false)
		})

		it("returns true when first element matches", () => {
			const isEven = (n: number) => n % 2 === 0
			const result = some(isEven)([2, 1, 3, 5])
			expect(result).toBe(true)
		})

		it("returns true when last element matches", () => {
			const isEven = (n: number) => n % 2 === 0
			const result = some(isEven)([1, 3, 5, 8])
			expect(result).toBe(true)
		})

		it("returns false for empty array", () => {
			const isEven = (n: number) => n % 2 === 0
			const result = some(isEven)([])
			expect(result).toBe(false)
		})

		it("stops checking after first true", () => {
			let checks = 0
			const predicate = (n: number) => {
				checks++
				return n > 3
			}
			const result = some(predicate)([1, 2, 4, 5, 6])
			expect(result).toBe(true)
			expect(checks).toBe(3)
		})

		it("works with different types", () => {
			const hasA = (s: string) => s.includes("a")
			expect(some(hasA)(["foo", "bar", "baz"])).toBe(true)
			expect(some(hasA)(["foo", "boo", "zoo"])).toBe(false)
		})

		it("handles complex predicates", () => {
			const users = [
				{ name: "Alice", age: 17 },
				{ name: "Bob", age: 16 },
				{ name: "Charlie", age: 18 },
			]
			const isAdult = (user: { age: number }) => user.age >= 18
			expect(some(isAdult)(users)).toBe(true)
		})
	})

	describe("when checking if no elements match", () => {
		it("returns true when no elements match predicate", () => {
			const isNegative = (n: number) => n < 0
			const result = none(isNegative)([1, 2, 3, 4, 5])
			expect(result).toBe(true)
		})

		it("returns false when at least one element matches", () => {
			const isNegative = (n: number) => n < 0
			const result = none(isNegative)([1, 2, -3, 4, 5])
			expect(result).toBe(false)
		})

		it("returns false when all elements match", () => {
			const isNegative = (n: number) => n < 0
			const result = none(isNegative)([-1, -2, -3])
			expect(result).toBe(false)
		})

		it("returns false when first element matches", () => {
			const isNegative = (n: number) => n < 0
			const result = none(isNegative)([-1, 2, 3, 4])
			expect(result).toBe(false)
		})

		it("returns false when last element matches", () => {
			const isNegative = (n: number) => n < 0
			const result = none(isNegative)([1, 2, 3, -4])
			expect(result).toBe(false)
		})

		it("returns true for empty array", () => {
			const isNegative = (n: number) => n < 0
			const result = none(isNegative)([])
			expect(result).toBe(true)
		})

		it("stops checking after first match", () => {
			let checks = 0
			const predicate = (n: number) => {
				checks++
				return n > 3
			}
			const result = none(predicate)([1, 2, 4, 5, 6])
			expect(result).toBe(false)
			expect(checks).toBe(3)
		})

		it("works with different types", () => {
			const hasZ = (s: string) => s.includes("z")
			expect(none(hasZ)(["foo", "bar", "bat"])).toBe(true)
			expect(none(hasZ)(["foo", "bar", "baz"])).toBe(false)
		})

		it("is equivalent to !some", () => {
			const isEven = (n: number) => n % 2 === 0
			const testArrays = [
				[1, 3, 5],
				[2, 4, 6],
				[1, 2, 3],
				[],
			]

			testArrays.forEach((arr) => {
				expect(none(isEven)(arr)).toBe(!some(isEven)(arr))
			})
		})

		it("handles complex predicates", () => {
			const users = [
				{ name: "Alice", age: 15 },
				{ name: "Bob", age: 16 },
				{ name: "Charlie", age: 17 },
			]
			const isAdult = (user: { age: number }) => user.age >= 18
			expect(none(isAdult)(users)).toBe(true)
		})
	})

	describe("predicate relationships", () => {
		it("all and none are mutually exclusive for non-empty arrays", () => {
			const isEven = (n: number) => n % 2 === 0
			const arrays = [
				[2, 4, 6],
				[1, 3, 5],
				[1, 2, 3],
			]

			arrays.forEach((arr) => {
				const allResult = all(isEven)(arr)
				const noneResult = none(isEven)(arr)
				expect(allResult && noneResult).toBe(false)
			})
		})

		it("if all is true, then some is true (for non-empty arrays)", () => {
			const isPositive = (n: number) => n > 0
			const arrays = [
				[1, 2, 3],
				[5, 10, 15],
			]

			arrays.forEach((arr) => {
				if (all(isPositive)(arr)) {
					expect(some(isPositive)(arr)).toBe(true)
				}
			})
		})

		it("if none is true, then some is false", () => {
			const isNegative = (n: number) => n < 0
			const arrays = [
				[1, 2, 3],
				[0, 5, 10],
				[],
			]

			arrays.forEach((arr) => {
				if (none(isNegative)(arr)) {
					expect(some(isNegative)(arr)).toBe(false)
				}
			})
		})

		it("empty array edge cases", () => {
			const predicate = (n: number) => n > 0
			const empty: Array<number> = []

			expect(all(predicate)(empty)).toBe(true)
			expect(none(predicate)(empty)).toBe(true)
			expect(some(predicate)(empty)).toBe(false)
		})
	})

	describe("property-based tests", () => {
		describe("logical laws", () => {
			it("all and none are complementary for uniform arrays", () => {
				fc.assert(fc.property(
					fc.array(fc.integer()),
					fc.boolean(),
					(arr, shouldMatch) => {
						const predicate = () => shouldMatch
						const allResult = all(predicate)(arr)
						const noneResult = none(predicate)(arr)
						
						if (arr.length === 0) {
							expect(allResult).toBe(true)
							expect(noneResult).toBe(true)
						} else {
							expect(allResult).toBe(shouldMatch)
							expect(noneResult).toBe(!shouldMatch)
						}
					}
				))
			})

			it("some is true when at least one element matches", () => {
				fc.assert(fc.property(
					fc.array(fc.integer()),
					fc.integer(),
					(arr, target) => {
						const predicate = (x: number) => x === target
						const someResult = some(predicate)(arr)
						const hasTarget = arr.includes(target)
						
						expect(someResult).toBe(hasTarget)
					}
				))
			})

			it("if all is true, then some is true (for non-empty arrays)", () => {
				fc.assert(fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					fc.func(fc.boolean()),
					(arr, predicate) => {
						const allResult = all(predicate)(arr)
						const someResult = some(predicate)(arr)
						
						if (allResult) {
							expect(someResult).toBe(true)
						}
					}
				))
			})

			it("if none is true, then some is false", () => {
				fc.assert(fc.property(
					fc.array(fc.integer()),
					fc.func(fc.boolean()),
					(arr, predicate) => {
						const noneResult = none(predicate)(arr)
						const someResult = some(predicate)(arr)
						
						if (noneResult) {
							expect(someResult).toBe(false)
						}
					}
				))
			})

			it("none(p) equals !some(p)", () => {
				fc.assert(fc.property(
					fc.array(fc.integer()),
					fc.func(fc.boolean()),
					(arr, predicate) => {
						const noneResult = none(predicate)(arr)
						const someResult = some(predicate)(arr)
						
						expect(noneResult).toBe(!someResult)
					}
				))
			})
		})

		describe("empty array properties", () => {
			it("all returns true for empty arrays", () => {
				fc.assert(fc.property(
					fc.func(fc.boolean()),
					(predicate) => {
						expect(all(predicate)([])).toBe(true)
					}
				))
			})

			it("some returns false for empty arrays", () => {
				fc.assert(fc.property(
					fc.func(fc.boolean()),
					(predicate) => {
						expect(some(predicate)([])).toBe(false)
					}
				))
			})

			it("none returns true for empty arrays", () => {
				fc.assert(fc.property(
					fc.func(fc.boolean()),
					(predicate) => {
						expect(none(predicate)([])).toBe(true)
					}
				))
			})
		})

		describe("short-circuit properties", () => {
			it("all stops at first false", () => {
				fc.assert(fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					(arr) => {
						let callCount = 0
						const predicate = (x: number) => {
							callCount++
							return x > 0 // Will fail for first non-positive number
						}
						
						const hasNonPositive = arr.some(x => x <= 0)
						all(predicate)(arr)
						
						if (hasNonPositive) {
							const firstNonPositiveIndex = arr.findIndex(x => x <= 0)
							expect(callCount).toBe(firstNonPositiveIndex + 1)
						} else {
							expect(callCount).toBe(arr.length)
						}
					}
				))
			})

			it("some stops at first true", () => {
				fc.assert(fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					(arr) => {
						let callCount = 0
						const predicate = (x: number) => {
							callCount++
							return x > 0 // Will succeed for first positive number
						}
						
						const hasPositive = arr.some(x => x > 0)
						some(predicate)(arr)
						
						if (hasPositive) {
							const firstPositiveIndex = arr.findIndex(x => x > 0)
							expect(callCount).toBe(firstPositiveIndex + 1)
						} else {
							expect(callCount).toBe(arr.length)
						}
					}
				))
			})

			it("none stops at first true", () => {
				fc.assert(fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					(arr) => {
						let callCount = 0
						const predicate = (x: number) => {
							callCount++
							return x > 0 // Will succeed for first positive number
						}
						
						const hasPositive = arr.some(x => x > 0)
						none(predicate)(arr)
						
						if (hasPositive) {
							const firstPositiveIndex = arr.findIndex(x => x > 0)
							expect(callCount).toBe(firstPositiveIndex + 1)
						} else {
							expect(callCount).toBe(arr.length)
						}
					}
				))
			})
		})

		describe("mathematical properties", () => {
			it("all with always-true predicate returns true", () => {
				fc.assert(fc.property(
					fc.array(fc.integer()),
					(arr) => {
						const alwaysTrue = () => true
						expect(all(alwaysTrue)(arr)).toBe(true)
					}
				))
			})

			it("all with always-false predicate returns false for non-empty arrays", () => {
				fc.assert(fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					(arr) => {
						const alwaysFalse = () => false
						expect(all(alwaysFalse)(arr)).toBe(false)
					}
				))
			})

			it("some with always-true predicate returns true for non-empty arrays", () => {
				fc.assert(fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					(arr) => {
						const alwaysTrue = () => true
						expect(some(alwaysTrue)(arr)).toBe(true)
					}
				))
			})

			it("some with always-false predicate returns false", () => {
				fc.assert(fc.property(
					fc.array(fc.integer()),
					(arr) => {
						const alwaysFalse = () => false
						expect(some(alwaysFalse)(arr)).toBe(false)
					}
				))
			})

			it("none with always-false predicate returns true", () => {
				fc.assert(fc.property(
					fc.array(fc.integer()),
					(arr) => {
						const alwaysFalse = () => false
						expect(none(alwaysFalse)(arr)).toBe(true)
					}
				))
			})

			it("none with always-true predicate returns false for non-empty arrays", () => {
				fc.assert(fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					(arr) => {
						const alwaysTrue = () => true
						expect(none(alwaysTrue)(arr)).toBe(false)
					}
				))
			})
		})

		describe("composition properties", () => {
			it("all(p1) && all(p2) equals all(x => p1(x) && p2(x))", () => {
				fc.assert(fc.property(
					fc.array(fc.integer()),
					(arr) => {
						const p1 = (x: number) => x > 0
						const p2 = (x: number) => x < 100
						const combined = (x: number) => p1(x) && p2(x)
						
						const separate = all(p1)(arr) && all(p2)(arr)
						const combined_result = all(combined)(arr)
						
						expect(separate).toBe(combined_result)
					}
				))
			})

			it("some(p1) || some(p2) equals some(x => p1(x) || p2(x))", () => {
				fc.assert(fc.property(
					fc.array(fc.integer()),
					(arr) => {
						const p1 = (x: number) => x > 50
						const p2 = (x: number) => x < -50
						const combined = (x: number) => p1(x) || p2(x)
						
						const separate = some(p1)(arr) || some(p2)(arr)
						const combined_result = some(combined)(arr)
						
						expect(separate).toBe(combined_result)
					}
				))
			})
		})

		describe("type consistency", () => {
			it("predicates work with different types", () => {
				fc.assert(fc.property(
					fc.array(fc.string()),
					fc.nat(10),
					(arr, minLength) => {
						const predicate = (s: string) => s.length >= minLength
						
						// Should not throw and return boolean
						const allResult = all(predicate)(arr)
						const someResult = some(predicate)(arr)
						const noneResult = none(predicate)(arr)
						
						expect(typeof allResult).toBe("boolean")
						expect(typeof someResult).toBe("boolean")
						expect(typeof noneResult).toBe("boolean")
					}
				))
			})
		})
	})
})