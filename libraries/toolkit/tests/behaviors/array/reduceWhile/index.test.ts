import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import { assertType, IsExact } from "https://deno.land/std@0.218.0/testing/types.ts"
import * as fc from "npm:fast-check@3"

import reduceWhile from "../../../../src/simple/array/reduceWhile/index.ts"

Deno.test("reduceWhile: basic functionality", async (t) => {
	await t.step("should sum numbers while under limit", async (t) => {
		const underLimit = (acc: number) => acc < 100
		const add = (acc: number, x: number) => acc + x
		const result = reduceWhile(underLimit)(add)(0)([10, 20, 30, 40, 50, 60])
		assertEquals(result, 100) // 10 + 20 + 30 + 40 = 100, which still passes predicate (100 < 100 is false)
	})

	await t.step("should collect elements until specific element", async (t) => {
		const notStop = (_: string[], x: string) => x !== "STOP"
		const collect = (acc: string[], x: string) => [...acc, x]
		const result = reduceWhile(notStop)(collect)([])(["a", "b", "STOP", "c"])
		assertEquals(result, ["a", "b"])
	})

	await t.step("should multiply until zero", async (t) => {
		const noZero = (_: number, x: number) => x !== 0
		const multiply = (acc: number, x: number) => acc * x
		const result = reduceWhile(noZero)(multiply)(1)([2, 3, 4, 0, 5])
		assertEquals(result, 24) // 1 * 2 * 3 * 4 = 24, stops at 0
	})

	await t.step("should process while ascending", async (t) => {
		const isAscending = (acc: { last: number }, x: number) => acc.last < x
		const track = (acc: { sum: number; last: number }, x: number) =>
			({ sum: acc.sum + x, last: x })
		const result = reduceWhile(isAscending)(track)({ sum: 0, last: -Infinity })([1, 3, 5, 4])
		assertEquals(result, { sum: 9, last: 5 }) // 1 + 3 + 5 = 9, stops at 4
	})

	await t.step("should return initial value when predicate is immediately false", async (t) => {
		const alwaysFalse = () => false
		const add = (acc: number, x: number) => acc + x
		const result = reduceWhile(alwaysFalse)(add)(10)([1, 2, 3])
		assertEquals(result, 10)
	})

	await t.step("should process entire array when predicate is always true", async (t) => {
		const alwaysTrue = () => true
		const add = (acc: number, x: number) => acc + x
		const result = reduceWhile(alwaysTrue)(add)(0)([1, 2, 3])
		assertEquals(result, 6)
	})

	await t.step("should handle empty array", async (t) => {
		const alwaysTrue = () => true
		const add = (acc: number, x: number) => acc + x
		const result = reduceWhile(alwaysTrue)(add)(42)([])
		assertEquals(result, 42)
	})

	await t.step("should handle single element array", async (t) => {
		const underLimit = (acc: number) => acc < 100
		const add = (acc: number, x: number) => acc + x
		const result = reduceWhile(underLimit)(add)(10)([20])
		assertEquals(result, 30)
	})

	await t.step("should pass index and array to predicate", async (t) => {
		const indices: number[] = []
		const arrays: ReadonlyArray<number>[] = []
		const collectParams = (acc: number, _: number, idx: number, arr: ReadonlyArray<number>) => {
			indices.push(idx)
			arrays.push(arr)
			return idx < 2 // Continue for first 2 elements
		}
		const add = (acc: number, x: number) => acc + x
		const arr = [10, 20, 30, 40]
		const result = reduceWhile(collectParams)(add)(0)(arr)
		assertEquals(result, 30) // 0 + 10 + 20 = 30
		assertEquals(indices, [0, 1, 2])
		assertEquals(arrays, [arr, arr, arr])
	})

	await t.step("should pass index and array to reducer", async (t) => {
		const indices: number[] = []
		const arrays: ReadonlyArray<number>[] = []
		const alwaysTrue = () => true
		const collectParams = (acc: number, x: number, idx: number, arr: ReadonlyArray<number>) => {
			indices.push(idx)
			arrays.push(arr)
			return acc + x
		}
		const arr = [10, 20, 30]
		const result = reduceWhile(alwaysTrue)(collectParams)(0)(arr)
		assertEquals(result, 60)
		assertEquals(indices, [0, 1, 2])
		assertEquals(arrays, [arr, arr, arr])
	})
})

Deno.test("reduceWhile: edge cases", async (t) => {
	await t.step("should handle null input", async (t) => {
		const alwaysTrue = () => true
		const add = (acc: number, x: number) => acc + x
		const result = reduceWhile(alwaysTrue)(add)(100)(null)
		assertEquals(result, 100)
	})

	await t.step("should handle undefined input", async (t) => {
		const alwaysTrue = () => true
		const add = (acc: number, x: number) => acc + x
		const result = reduceWhile(alwaysTrue)(add)(200)(undefined)
		assertEquals(result, 200)
	})

	await t.step("should handle large arrays", async (t) => {
		const underLimit = (acc: number) => acc < 5000
		const add = (acc: number, x: number) => acc + x
		const largeArray = Array.from({ length: 10000 }, (_, i) => i)
		const result = reduceWhile(underLimit)(add)(0)(largeArray)
		// Sum of 0..99 = 99*100/2 = 4950, which is under 5000, so we add 100
		// Sum of 0..100 = 100*101/2 = 5050, which exceeds 5000, so we stop
		assertEquals(result, 5050)
	})

	await t.step("should handle complex predicates based on accumulator", async (t) => {
		const hasEnoughItems = (acc: { items: string[]; count: number }) => acc.count < 3
		const collectOdds = (acc: { items: string[]; count: number }, x: number) => {
			if (x % 2 === 1) {
				return { items: [...acc.items, x.toString()], count: acc.count + 1 }
			}
			return acc
		}
		const result = reduceWhile(hasEnoughItems)(collectOdds)({ items: [], count: 0 })([1, 2, 3, 4, 5, 6, 7, 8, 9])
		assertEquals(result, { items: ["1", "3", "5"], count: 3 })
	})

	await t.step("should stop immediately when first element fails predicate", async (t) => {
		const notNegative = (_: number, x: number) => x >= 0
		const add = (acc: number, x: number) => acc + x
		const result = reduceWhile(notNegative)(add)(100)([-1, 1, 2, 3])
		assertEquals(result, 100)
	})

	await t.step("should handle NaN values", async (t) => {
		const notNaN = (_: number, x: number) => !Number.isNaN(x)
		const add = (acc: number, x: number) => acc + x
		const result = reduceWhile(notNaN)(add)(0)([1, 2, NaN, 3, 4])
		assertEquals(result, 3) // 1 + 2 = 3, stops at NaN
	})

	await t.step("should handle Infinity values", async (t) => {
		const isFinite = (acc: number) => Number.isFinite(acc)
		const add = (acc: number, x: number) => acc + x
		const result = reduceWhile(isFinite)(add)(0)([1, 2, Infinity, 3])
		assertEquals(result, Infinity) // 1 + 2 = 3 (finite), then 3 + Infinity = Infinity, stops next iteration
	})
})

Deno.test("reduceWhile: type safety", async (t) => {
	await t.step("should correctly infer types", async (t) => {
		const underLimit = (acc: number) => acc < 100
		const add = (acc: number, x: number) => acc + x
		const result = reduceWhile(underLimit)(add)(0)([1, 2, 3])
		assertType<IsExact<typeof result, number>>(true)
	})

	await t.step("should handle different accumulator and element types", async (t) => {
		const lessThan5 = (acc: string) => acc.length < 5
		const concat = (acc: string, x: number) => acc + x
		const result = reduceWhile(lessThan5)(concat)("")([1, 2, 3, 4, 5])
		assertType<IsExact<typeof result, string>>(true)
		assertEquals(result, "12345")
	})

	await t.step("should handle complex accumulator types", async (t) => {
		type State = { items: string[]; total: number }
		const underBudget = (acc: State) => acc.total < 100
		const addItem = (acc: State, x: { name: string; price: number }): State => ({
			items: [...acc.items, x.name],
			total: acc.total + x.price,
		})
		const result = reduceWhile(underBudget)(addItem)({ items: [], total: 0 })([
			{ name: "A", price: 30 },
			{ name: "B", price: 50 },
			{ name: "C", price: 40 },
		])
		assertType<IsExact<typeof result, State>>(true)
		assertEquals(result, { items: ["A", "B", "C"], total: 120 })
	})
})

Deno.test("reduceWhile: currying", async (t) => {
	await t.step("should be fully curried", async (t) => {
		const underLimit = (acc: number) => acc < 100
		const add = (acc: number, x: number) => acc + x
		
		const step1 = reduceWhile(underLimit)
		const step2 = step1(add)
		const step3 = step2(0)
		const result = step3([10, 20, 30, 40, 50])
		
		assertEquals(result, 100)
	})

	await t.step("should allow partial application", async (t) => {
		const underLimit = (acc: number) => acc < 50
		const add = (acc: number, x: number) => acc + x
		
		const sumWhileUnder50 = reduceWhile(underLimit)(add)
		
		assertEquals(sumWhileUnder50(0)([10, 20, 30]), 60)
		assertEquals(sumWhileUnder50(10)([10, 20, 30]), 70)
		assertEquals(sumWhileUnder50(40)([10, 20, 30]), 50)
	})
})

Deno.test("reduceWhile: property-based tests", async (t) => {
	await t.step("should never process more elements than array length", async (t) => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.integer(),
				(arr, initial) => {
					let processedCount = 0
					const countingPredicate = () => {
						processedCount++
						return true
					}
					const add = (acc: number, x: number) => acc + x
					
					reduceWhile(countingPredicate)(add)(initial)(arr)
					
					// Predicate is called for each element until it returns false or array ends
					return processedCount <= arr.length
				},
			),
		)
	})

	await t.step("should return initial value for empty array", async (t) => {
		fc.assert(
			fc.property(
				fc.anything(),
				(initial) => {
					const alwaysTrue = () => true
					const neverCalled = () => {
						throw new Error("Reducer should not be called for empty array")
					}
					const result = reduceWhile(alwaysTrue)(neverCalled)(initial)([])
					return result === initial
				},
			),
		)
	})

	await t.step("should be equivalent to regular reduce when predicate is always true", async (t) => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.integer(),
				(arr, initial) => {
					const alwaysTrue = () => true
					const add = (acc: number, x: number) => acc + x
					
					const reduceWhileResult = reduceWhile(alwaysTrue)(add)(initial)(arr)
					const regularReduceResult = arr.reduce(add, initial)
					
					return reduceWhileResult === regularReduceResult
				},
			),
		)
	})

	await t.step("should stop at first false predicate", async (t) => {
		fc.assert(
			fc.property(
				fc.array(fc.integer({ min: 1, max: 100 })),
				fc.integer({ min: 0, max: 50 }),
				(arr, limit) => {
					const underLimit = (acc: number) => acc <= limit
					const add = (acc: number, x: number) => acc + x
					
					const result = reduceWhile(underLimit)(add)(0)(arr)
					
					// Result should be at most limit (unless empty array)
					if (arr.length === 0) {
						return result === 0
					}
					// The result should not exceed limit + max element value
					return result <= limit + 100
				},
			),
		)
	})

	await t.step("should handle null/undefined consistently", async (t) => {
		fc.assert(
			fc.property(
				fc.integer(),
				(initial) => {
					const alwaysTrue = () => true
					const add = (acc: number, x: number) => acc + x
					
					const nullResult = reduceWhile(alwaysTrue)(add)(initial)(null)
					const undefinedResult = reduceWhile(alwaysTrue)(add)(initial)(undefined)
					
					return nullResult === initial && undefinedResult === initial
				},
			),
		)
	})
})