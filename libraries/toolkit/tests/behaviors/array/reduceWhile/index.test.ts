import { assertEquals, assertStrictEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import { assertType, IsExact } from "https://deno.land/std@0.218.0/testing/types.ts"
import * as fc from "npm:fast-check@3"

import reduceWhile from "../../../../src/simple/array/reduceWhile/index.ts"

Deno.test("reduceWhile: basic functionality", async (t) => {
	await t.step("should reduce while predicate is true", () => {
		const underLimit = (acc: number) => acc < 100
		const add = (acc: number, x: number) => acc + x
		const result = reduceWhile(underLimit)(add)(0)([10, 20, 30, 40, 50, 60])
		// 0 + 10 = 10 (< 100, continue)
		// 10 + 20 = 30 (< 100, continue)
		// 30 + 30 = 60 (< 100, continue)
		// 60 + 40 = 100 (next check: 100 < 100 = false, stop)
		assertEquals(result, 100)
	})

	await t.step("should stop when predicate becomes false", () => {
		const notStop = (_: string[], x: string) => x !== "STOP"
		const collect = (acc: string[], x: string) => [...acc, x]
		const result = reduceWhile(notStop)(collect)([])(["a", "b", "STOP", "c", "d"])
		assertEquals(result, ["a", "b"])
	})

	await t.step("should handle predicate checking accumulator", () => {
		const maxThree = (acc: unknown[]) => acc.length < 3
		const append = (acc: string[], x: string) => [...acc, x]
		const result = reduceWhile(maxThree)(append)([])(["a", "b", "c", "d", "e"])
		assertEquals(result, ["a", "b", "c"])
	})

	await t.step("should handle predicate checking element", () => {
		const noZero = (_: number, x: number) => x !== 0
		const multiply = (acc: number, x: number) => acc * x
		const result = reduceWhile(noZero)(multiply)(1)([2, 3, 4, 0, 5, 6])
		// 1 * 2 = 2 (elem 2 !== 0, continue)
		// 2 * 3 = 6 (elem 3 !== 0, continue)
		// 6 * 4 = 24 (elem 4 !== 0, continue)
		// Stop before 0 since predicate(24, 0) = false
		assertEquals(result, 24)
	})

	await t.step("should pass all parameters to predicate and reducer", () => {
		const predicateCalls: Array<[unknown, unknown, number, ReadonlyArray<unknown>]> = []
		const reducerCalls: Array<[unknown, unknown, number, ReadonlyArray<unknown>]> = []
		
		const spyPredicate = (acc: unknown, elem: unknown, idx: number, arr: ReadonlyArray<unknown>) => {
			predicateCalls.push([acc, elem, idx, arr])
			return idx < 2
		}
		
		const spyReducer = (acc: unknown, elem: unknown, idx: number, arr: ReadonlyArray<unknown>) => {
			reducerCalls.push([acc, elem, idx, arr])
			return acc
		}
		
		const arr = ["a", "b", "c", "d"]
		reduceWhile(spyPredicate)(spyReducer)("init")(arr)
		
		// Predicate should be called for indices 0, 1, 2 (stops at 2)
		assertEquals(predicateCalls.length, 3)
		assertEquals(predicateCalls[0], ["init", "a", 0, arr])
		assertEquals(predicateCalls[1], ["init", "b", 1, arr])
		assertEquals(predicateCalls[2], ["init", "c", 2, arr])
		
		// Reducer should be called only for indices 0, 1
		assertEquals(reducerCalls.length, 2)
		assertEquals(reducerCalls[0], ["init", "a", 0, arr])
		assertEquals(reducerCalls[1], ["init", "b", 1, arr])
	})
})

Deno.test("reduceWhile: early termination", async (t) => {
	await t.step("should stop immediately if predicate is false initially", () => {
		const alwaysFalse = () => false
		const add = (acc: number, x: number) => acc + x
		const result = reduceWhile(alwaysFalse)(add)(10)([1, 2, 3, 4])
		assertEquals(result, 10)
	})

	await t.step("should process entire array if predicate is always true", () => {
		const alwaysTrue = () => true
		const add = (acc: number, x: number) => acc + x
		const result = reduceWhile(alwaysTrue)(add)(0)([1, 2, 3, 4])
		assertEquals(result, 10)
	})

	await t.step("should handle single element array", () => {
		const underTen = (acc: number) => acc < 10
		const add = (acc: number, x: number) => acc + x
		
		// Should process the single element
		assertEquals(reduceWhile(underTen)(add)(0)([5]), 5)
		
		// Should not process if predicate fails
		assertEquals(reduceWhile(underTen)(add)(10)([5]), 10)
	})

	await t.step("should handle empty array", () => {
		const alwaysTrue = () => true
		const add = (acc: number, x: number) => acc + x
		const result = reduceWhile(alwaysTrue)(add)(42)([])
		assertEquals(result, 42)
	})
})

Deno.test("reduceWhile: complex predicates", async (t) => {
	await t.step("should handle ascending order check", () => {
		const isAscending = (acc: { last: number }, x: number) => acc.last < x
		const track = (acc: { sum: number; last: number }, x: number) => 
			({ sum: acc.sum + x, last: x })
		
		const result = reduceWhile(isAscending)(track)({ sum: 0, last: -Infinity })([1, 3, 5, 4, 7])
		// Process 1 (last: -Inf < 1), 3 (last: 1 < 3), 5 (last: 3 < 5)
		// Stop at 4 (last: 5 not < 4)
		assertEquals(result, { sum: 9, last: 5 })
	})

	await t.step("should handle running average threshold", () => {
		type Acc = { sum: number; count: number; avg: number }
		const avgUnder = (acc: Acc) => acc.avg < 5
		const updateAvg = (acc: Acc, x: number): Acc => {
			const newSum = acc.sum + x
			const newCount = acc.count + 1
			return { sum: newSum, count: newCount, avg: newSum / newCount }
		}
		
		const result = reduceWhile(avgUnder)(updateAvg)({ sum: 0, count: 0, avg: 0 })([2, 3, 4, 8, 10])
		// avg: 0 < 5, process 2 -> avg: 2/1 = 2
		// avg: 2 < 5, process 3 -> avg: 5/2 = 2.5
		// avg: 2.5 < 5, process 4 -> avg: 9/3 = 3
		// avg: 3 < 5, process 8 -> avg: 17/4 = 4.25
		// avg: 4.25 < 5, process 10 -> avg: 27/5 = 5.4
		// avg: 5.4 not < 5, stop (but we already processed all)
		assertEquals(result.count, 4)
		assertEquals(result.avg, 4.25)
	})

	await t.step("should handle pattern matching", () => {
		const notPattern = (_: string, x: string) => !/^END/.test(x)
		const concat = (acc: string, x: string) => acc + x
		
		const result = reduceWhile(notPattern)(concat)("")(["hello", "world", "END_HERE", "more"])
		assertEquals(result, "helloworld")
	})
})

Deno.test("reduceWhile: edge cases", async (t) => {
	await t.step("should handle null input", () => {
		const alwaysTrue = () => true
		const add = (acc: number, x: number) => acc + x
		const result = reduceWhile(alwaysTrue)(add)(10)(null)
		assertEquals(result, 10)
	})

	await t.step("should handle undefined input", () => {
		const alwaysTrue = () => true
		const add = (acc: number, x: number) => acc + x
		const result = reduceWhile(alwaysTrue)(add)(20)(undefined)
		assertEquals(result, 20)
	})

	await t.step("should handle arrays with undefined values", () => {
		const notUndefined = (_: string, x: string | undefined) => x !== undefined
		const concat = (acc: string, x: string | undefined) => acc + (x ?? "null")
		
		const result = reduceWhile(notUndefined)(concat)("")(["a", undefined, "b"])
		assertEquals(result, "a")
	})

	await t.step("should handle arrays with null values", () => {
		const notNull = (_: number, x: number | null) => x !== null
		const add = (acc: number, x: number | null) => acc + (x ?? 0)
		
		const result = reduceWhile(notNull)(add)(0)([1, 2, null, 3])
		assertEquals(result, 3)
	})

	await t.step("should handle mixed types", () => {
		const isNumber = (_: string, x: unknown) => typeof x === "number"
		const stringify = (acc: string, x: unknown) => acc + String(x)
		
		const result = reduceWhile(isNumber)(stringify)("")([1, 2, "stop", 3])
		assertEquals(result, "12")
	})
})

Deno.test("reduceWhile: type safety", async (t) => {
	await t.step("should maintain correct types", () => {
		const underTen = (acc: number) => acc < 10
		const add = (acc: number, x: number) => acc + x
		const curriedPredicate = reduceWhile(underTen)
		const curriedWithReducer = curriedPredicate(add)
		const curriedWithInitial = curriedWithReducer(0)
		const result = curriedWithInitial([1, 2, 3, 4, 5])
		
		assertType<IsExact<typeof result, number>>(true)
		assertEquals(result, 6) // 1 + 2 + 3 = 6 (then 6 + 4 = 10, stops)
	})

	await t.step("should handle generic types correctly", () => {
		type Item = { id: number; value: string }
		const notEnd = (_: Item[], item: Item) => item.value !== "end"
		const collect = (acc: Item[], item: Item) => [...acc, item]
		
		const items: Item[] = [
			{ id: 1, value: "a" },
			{ id: 2, value: "b" },
			{ id: 3, value: "end" },
			{ id: 4, value: "c" },
		]
		
		const result = reduceWhile(notEnd)(collect)([])(items)
		assertType<IsExact<typeof result, Item[]>>(true)
		assertEquals(result.length, 2)
	})
})

Deno.test("reduceWhile: currying", async (t) => {
	await t.step("should be properly curried", () => {
		const underLimit = (acc: number) => acc < 20
		const add = (acc: number, x: number) => acc + x
		
		const curriedPredicate = reduceWhile(underLimit)
		const curriedWithReducer = curriedPredicate(add)
		const curriedWithInitial = curriedWithReducer(0)
		const result = curriedWithInitial([5, 10, 15, 20])
		
		assertEquals(result, 15) // 5 + 10 = 15 (15 + 15 = 30, stops)
	})

	await t.step("should allow partial application and reuse", () => {
		const maxLength = (max: number) => (acc: unknown[]) => acc.length < max
		const append = <T>(acc: T[], x: T) => [...acc, x]
		
		const takeMax3 = reduceWhile(maxLength(3))(append)
		
		assertEquals(takeMax3([])([1, 2, 3, 4, 5]), [1, 2, 3])
		assertEquals(takeMax3(["a"])(["b", "c", "d"]), ["a", "b", "c"])
		
		const takeMax2 = reduceWhile(maxLength(2))(append)
		assertEquals(takeMax2([])(["x", "y", "z"]), ["x", "y"])
	})
})

Deno.test("reduceWhile: immutability", async (t) => {
	await t.step("should not modify the original array", () => {
		const original = [1, 2, 3, 4, 5]
		const copy = [...original]
		const underTwenty = (acc: number) => acc < 20
		const add = (acc: number, x: number) => acc + x
		
		reduceWhile(underTwenty)(add)(0)(original)
		assertEquals(original, copy)
	})

	await t.step("should not modify nested objects", () => {
		const original = [{ val: 1 }, { val: 2 }, { val: 3 }, { val: 0 }, { val: 4 }]
		const copy = original.map(obj => ({ ...obj }))
		const noZero = (_: number, x: { val: number }) => x.val !== 0
		const sumVals = (acc: number, x: { val: number }) => acc + x.val
		
		reduceWhile(noZero)(sumVals)(0)(original)
		assertEquals(original, copy)
	})
})

Deno.test("reduceWhile: practical examples", async (t) => {
	await t.step("should take elements until sum exceeds limit", () => {
		const underBudget = (acc: { sum: number; items: string[] }) => acc.sum <= 100
		const addItem = (acc: { sum: number; items: string[] }, item: { name: string; price: number }) =>
			({ sum: acc.sum + item.price, items: [...acc.items, item.name] })
		
		const cart = [
			{ name: "apple", price: 30 },
			{ name: "banana", price: 25 },
			{ name: "cherry", price: 40 },
			{ name: "date", price: 20 },
		]
		
		const result = reduceWhile(underBudget)(addItem)({ sum: 0, items: [] })(cart)
		assertEquals(result, { sum: 95, items: ["apple", "banana", "cherry"] })
	})

	await t.step("should parse until invalid input", () => {
		const isValid = (_: number[], x: string) => /^\d+$/.test(x)
		const parseAndAdd = (acc: number[], x: string) => [...acc, parseInt(x)]
		
		const input = ["123", "456", "789", "abc", "012"]
		const result = reduceWhile(isValid)(parseAndAdd)([])(input)
		assertEquals(result, [123, 456, 789])
	})

	await t.step("should build string until length limit", () => {
		const underLimit = (acc: string) => acc.length < 10
		const concat = (acc: string, x: string) => acc + x
		
		const words = ["hello", "world", "foo", "bar"]
		const result = reduceWhile(underLimit)(concat)("")(words)
		assertEquals(result, "helloworld") // "helloworld" = 10 chars, stops
	})

	await t.step("should find first sequence break", () => {
		const inSequence = (acc: { last: number; seq: number[] }, x: number) => 
			acc.last === -1 || x === acc.last + 1
		const track = (acc: { last: number; seq: number[] }, x: number) =>
			({ last: x, seq: [...acc.seq, x] })
		
		const numbers = [1, 2, 3, 5, 6, 7]
		const result = reduceWhile(inSequence)(track)({ last: -1, seq: [] })(numbers)
		assertEquals(result.seq, [1, 2, 3])
	})
})

Deno.test("reduceWhile: property-based tests", async (t) => {
	await t.step("should never process more elements than array length", () => {
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
					// Predicate is called once per element until it returns false or array ends
					// Since our predicate always returns true, it should be called for each element
					// plus one final check
					return processedCount <= arr.length + 1
				}
			)
		)
	})

	await t.step("should return initial value for null/undefined", () => {
		fc.assert(
			fc.property(
				fc.integer(),
				(initial) => {
					const alwaysTrue = () => true
					const add = (acc: number, x: number) => acc + x
					
					const nullResult = reduceWhile(alwaysTrue)(add)(initial)(null)
					const undefinedResult = reduceWhile(alwaysTrue)(add)(initial)(undefined)
					
					return nullResult === initial && undefinedResult === initial
				}
			)
		)
	})

	await t.step("should stop at first false predicate", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer({ min: 0, max: 100 }), { minLength: 1 }),
				fc.integer({ min: 1, max: 50 }),
				(arr, threshold) => {
					const underThreshold = (acc: number) => acc < threshold
					const add = (acc: number, x: number) => acc + x
					
					const result = reduceWhile(underThreshold)(add)(0)(arr)
					
					// Result should always be less than threshold
					// (unless no elements were processed)
					return result < threshold || result === 0
				}
			)
		)
	})

	await t.step("should be equivalent to reduce when predicate is always true", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer({ min: -100, max: 100 })),
				(arr) => {
					const alwaysTrue = () => true
					const add = (acc: number, x: number) => acc + x
					
					const whileResult = reduceWhile(alwaysTrue)(add)(0)(arr)
					const normalResult = arr.reduce(add, 0)
					
					return whileResult === normalResult
				}
			)
		)
	})

	await t.step("should process elements in order", () => {
		fc.assert(
			fc.property(
				fc.array(fc.string(), { minLength: 1, maxLength: 10 }),
				(arr) => {
					const processed: string[] = []
					const trackOrder = (_: null, x: string) => {
						processed.push(x)
						return true
					}
					const noop = (acc: null) => acc
					
					reduceWhile(trackOrder)(noop)(null)(arr)
					
					// Processed elements should be a prefix of the original array
					for (let i = 0; i < processed.length; i++) {
						if (processed[i] !== arr[i]) return false
					}
					return true
				}
			)
		)
	})
})

Deno.test("reduceWhile: specific test cases from examples", async (t) => {
	await t.step("should sum until limit", () => {
		const underLimit = (acc: number) => acc < 100
		const add = (acc: number, x: number) => acc + x
		assertEquals(reduceWhile(underLimit)(add)(0)([10, 20, 30, 40, 50, 60]), 100)
	})

	await t.step("should collect until stop element", () => {
		const notStop = (_: string[], x: string) => x !== "STOP"
		const collect = (acc: string[], x: string) => [...acc, x]
		assertEquals(reduceWhile(notStop)(collect)([])(["a", "b", "STOP", "c"]), ["a", "b"])
	})

	await t.step("should multiply until zero", () => {
		const noZero = (_: number, x: number) => x !== 0
		const multiply = (acc: number, x: number) => acc * x
		assertEquals(reduceWhile(noZero)(multiply)(1)([2, 3, 4, 0, 5]), 24)
	})

	await t.step("should process while ascending", () => {
		const isAscending = (acc: { last: number }, x: number) => acc.last < x
		const track = (acc: { sum: number; last: number }, x: number) =>
			({ sum: acc.sum + x, last: x })
		const result = reduceWhile(isAscending)(track)({ sum: 0, last: -Infinity })([1, 3, 5, 4])
		assertEquals(result, { sum: 9, last: 5 })
	})

	await t.step("should handle edge cases from examples", () => {
		const add = (acc: number, x: number) => acc + x
		
		// Never process any elements
		assertEquals(reduceWhile(() => false)(add)(10)([1, 2, 3]), 10)
		
		// Process all elements
		assertEquals(reduceWhile(() => true)(add)(0)([1, 2, 3]), 6)
		
		// Handle null input
		assertEquals(reduceWhile(() => true)(add)(0)(null), 0)
	})
})