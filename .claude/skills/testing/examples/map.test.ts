//++ Example: Testing a higher-order function with mappers
//++ Demonstrates testing functions that accept transformation functions

import { assertEquals } from "@std/assert"

//++ Function under test: curried map
function map<T, U>(mapper: (item: T) => U) {
	return function mapWithMapper(array: ReadonlyArray<T>): ReadonlyArray<U> {
		const result: Array<U> = []
		for (const item of array) {
			result.push(mapper(item))
		}
		return result
	}
}

//++ Tests for map (higher-order array transformation)
Deno.test("map", async (t) => {
	await t.step("with mappers", async (t) => {
		await t.step("transforms with simple mapper", () => {
			const double = (n: number) => n * 2
			const result = map(double)([1, 2, 3])
			assertEquals(result, [2, 4, 6])
		})

		await t.step("transforms with identity mapper", () => {
			const identity = <T>(x: T) => x
			const result = map(identity)([1, 2, 3])
			assertEquals(result, [1, 2, 3])
		})

		await t.step("transforms to different type", () => {
			const toString = (n: number) => n.toString()
			const result = map(toString)([1, 2, 3])
			assertEquals(result, ["1", "2", "3"])
		})

		await t.step("transforms strings", () => {
			const toUpperCase = (s: string) => s.toUpperCase()
			const result = map(toUpperCase)(["a", "b", "c"])
			assertEquals(result, ["A", "B", "C"])
		})
	})

	await t.step("with empty arrays", async (t) => {
		await t.step("returns empty array for empty input", () => {
			const double = (n: number) => n * 2
			const result = map(double)([])
			assertEquals(result, [])
		})
	})

	await t.step("partial application", async (t) => {
		await t.step("reuses mapper", () => {
			const mapDouble = map((n: number) => n * 2)
			assertEquals(mapDouble([1, 2, 3]), [2, 4, 6])
			assertEquals(mapDouble([10, 20]), [20, 40])
			assertEquals(mapDouble([]), [])
		})

		await t.step("creates specialized transformations", () => {
			const mapSquare = map((n: number) => n * n)
			const mapNegate = map((n: number) => -n)
			const numbers = [1, 2, 3]
			assertEquals(mapSquare(numbers), [1, 4, 9])
			assertEquals(mapNegate(numbers), [-1, -2, -3])
		})
	})

	await t.step("maintains array length", async (t) => {
		await t.step("output length equals input length", () => {
			const double = (n: number) => n * 2
			const input = [1, 2, 3, 4, 5]
			const output = map(double)(input)
			assertEquals(output.length, input.length)
		})
	})
})
