//++ Example: Testing a higher-order function with predicates
//++ Demonstrates testing functions that accept function parameters

import { assertEquals } from "@std/assert"

//++ Function under test: curried filter
function filter<T>(predicate: (item: T) => boolean) {
	return function filterWithPredicate(array: ReadonlyArray<T>): ReadonlyArray<T> {
		return array.reduce(
			function accumulateFiltered(accumulator: ReadonlyArray<T>, item: T): ReadonlyArray<T> {
				if (predicate(item)) {
					return [...accumulator, item]
				}
				return accumulator
			},
			[] as ReadonlyArray<T>
		)
	}
}

//++ Tests for filter (higher-order array function)
Deno.test("filter", async (t) => {
	await t.step("with predicates", async (t) => {
		await t.step("filters with simple predicate", () => {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}
			const result = filter(isEven)([1, 2, 3, 4, 5, 6])
			assertEquals(result, [2, 4, 6])
		})

		await t.step("filters with always-true predicate", () => {
			function alwaysTrue(_n: number): boolean {
				return true
			}
			const result = filter(alwaysTrue)([1, 2, 3])
			assertEquals(result, [1, 2, 3])
		})

		await t.step("filters with always-false predicate", () => {
			function alwaysFalse(_n: number): boolean {
				return false
			}
			const result = filter(alwaysFalse)([1, 2, 3])
			assertEquals(result, [])
		})

		await t.step("filters strings", () => {
			function isLong(s: string): boolean {
				return s.length > 3
			}
			const result = filter(isLong)(["a", "hello", "hi", "world"])
			assertEquals(result, ["hello", "world"])
		})
	})

	await t.step("with empty arrays", async (t) => {
		await t.step("returns empty array for empty input", () => {
			function isPositive(n: number): boolean {
				return n > 0
			}
			const result = filter(isPositive)([])
			assertEquals(result, [])
		})
	})

	await t.step("partial application", async (t) => {
		await t.step("reuses filtered predicate", () => {
			function isPositive(n: number): boolean {
				return n > 0
			}
			const filterPositive = filter(isPositive)
			assertEquals(filterPositive([1, -1, 2, -2]), [1, 2])
			assertEquals(filterPositive([-5, -10]), [])
			assertEquals(filterPositive([1, 2, 3]), [1, 2, 3])
		})

		await t.step("creates specialized filters", () => {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}
			function isOdd(n: number): boolean {
				return n % 2 !== 0
			}
			const filterEven = filter(isEven)
			const filterOdd = filter(isOdd)
			const numbers = [1, 2, 3, 4, 5, 6]
			assertEquals(filterEven(numbers), [2, 4, 6])
			assertEquals(filterOdd(numbers), [1, 3, 5])
		})
	})
})
