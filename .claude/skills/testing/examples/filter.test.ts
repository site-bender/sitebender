//++ Example: Testing a higher-order function with predicates
//++ Demonstrates testing functions that accept function parameters

import { assertEquals } from "@std/assert"

//++ Function under test: curried filter
function filter<T>(predicate: (item: T) => boolean) {
	return function filterWithPredicate(array: ReadonlyArray<T>): ReadonlyArray<T> {
		const result: Array<T> = []
		for (const item of array) {
			if (predicate(item)) {
				result.push(item)
			}
		}
		return result
	}
}

//++ Tests for filter (higher-order array function)
Deno.test("filter", async (t) => {
	await t.step("with predicates", async (t) => {
		await t.step("filters with simple predicate", () => {
			const isEven = (n: number) => n % 2 === 0
			const result = filter(isEven)([1, 2, 3, 4, 5, 6])
			assertEquals(result, [2, 4, 6])
		})

		await t.step("filters with always-true predicate", () => {
			const alwaysTrue = (_n: number) => true
			const result = filter(alwaysTrue)([1, 2, 3])
			assertEquals(result, [1, 2, 3])
		})

		await t.step("filters with always-false predicate", () => {
			const alwaysFalse = (_n: number) => false
			const result = filter(alwaysFalse)([1, 2, 3])
			assertEquals(result, [])
		})

		await t.step("filters strings", () => {
			const isLong = (s: string) => s.length > 3
			const result = filter(isLong)(["a", "hello", "hi", "world"])
			assertEquals(result, ["hello", "world"])
		})
	})

	await t.step("with empty arrays", async (t) => {
		await t.step("returns empty array for empty input", () => {
			const isPositive = (n: number) => n > 0
			const result = filter(isPositive)([])
			assertEquals(result, [])
		})
	})

	await t.step("partial application", async (t) => {
		await t.step("reuses filtered predicate", () => {
			const filterPositive = filter((n: number) => n > 0)
			assertEquals(filterPositive([1, -1, 2, -2]), [1, 2])
			assertEquals(filterPositive([-5, -10]), [])
			assertEquals(filterPositive([1, 2, 3]), [1, 2, 3])
		})

		await t.step("creates specialized filters", () => {
			const filterEven = filter((n: number) => n % 2 === 0)
			const filterOdd = filter((n: number) => n % 2 !== 0)
			const numbers = [1, 2, 3, 4, 5, 6]
			assertEquals(filterEven(numbers), [2, 4, 6])
			assertEquals(filterOdd(numbers), [1, 3, 5])
		})
	})
})
