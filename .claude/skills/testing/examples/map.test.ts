//++ Example: Testing a higher-order function with mappers
//++ Demonstrates testing functions that accept transformation functions

import { assertEquals } from "@std/assert"

//++ Function under test: curried map
function map<T, U>(mapper: (item: T) => U) {
	return function mapWithMapper(array: ReadonlyArray<T>): ReadonlyArray<U> {
		return array.reduce(
			function accumulateMapped(accumulator: ReadonlyArray<U>, item: T): ReadonlyArray<U> {
				return [...accumulator, mapper(item)]
			},
			[] as ReadonlyArray<U>
		)
	}
}

//++ Tests for map (higher-order array transformation)
Deno.test("map", async (t) => {
	await t.step("with mappers", async (t) => {
		await t.step("transforms with simple mapper", () => {
			function double(n: number): number {
				return n * 2
			}
			const result = map(double)([1, 2, 3])
			assertEquals(result, [2, 4, 6])
		})

		await t.step("transforms with identity mapper", () => {
			function identity<T>(x: T): T {
				return x
			}
			const result = map(identity)([1, 2, 3])
			assertEquals(result, [1, 2, 3])
		})

		await t.step("transforms to different type", () => {
			function toString(n: number): string {
				return n.toString()
			}
			const result = map(toString)([1, 2, 3])
			assertEquals(result, ["1", "2", "3"])
		})

		await t.step("transforms strings", () => {
			function toUpperCase(s: string): string {
				return s.toUpperCase()
			}
			const result = map(toUpperCase)(["a", "b", "c"])
			assertEquals(result, ["A", "B", "C"])
		})
	})

	await t.step("with empty arrays", async (t) => {
		await t.step("returns empty array for empty input", () => {
			function double(n: number): number {
				return n * 2
			}
			const result = map(double)([])
			assertEquals(result, [])
		})
	})

	await t.step("partial application", async (t) => {
		await t.step("reuses mapper", () => {
			function double(n: number): number {
				return n * 2
			}
			const mapDouble = map(double)
			assertEquals(mapDouble([1, 2, 3]), [2, 4, 6])
			assertEquals(mapDouble([10, 20]), [20, 40])
			assertEquals(mapDouble([]), [])
		})

		await t.step("creates specialized transformations", () => {
			function square(n: number): number {
				return n * n
			}
			function negate(n: number): number {
				return -n
			}
			const mapSquare = map(square)
			const mapNegate = map(negate)
			const numbers = [1, 2, 3]
			assertEquals(mapSquare(numbers), [1, 4, 9])
			assertEquals(mapNegate(numbers), [-1, -2, -3])
		})
	})

	await t.step("maintains array length", async (t) => {
		await t.step("output length equals input length", () => {
			function double(n: number): number {
				return n * 2
			}
			const input = [1, 2, 3, 4, 5]
			const output = map(double)(input)
			assertEquals(output.length, input.length)
		})
	})
})
