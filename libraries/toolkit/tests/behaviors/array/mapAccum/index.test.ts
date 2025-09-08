import { assertEquals } from "jsr:@std/assert@1.0.8"
import * as fc from "npm:fast-check@3"

import mapAccum from "../../../../src/simple/array/mapAccum/index.ts"

Deno.test("mapAccum: combines accumulation and mapping", () => {
	const sumWithDouble = (acc: number, x: number): [number, number] => [
		acc + x,
		x * 2,
	]
	const result = mapAccum(sumWithDouble)(0)([1, 2, 3, 4])
	assertEquals(result, [10, [2, 4, 6, 8]])
})

Deno.test("mapAccum: handles running sum with differences", () => {
	const sumWithDiff = (acc: number, x: number): [number, number] => [
		acc + x,
		x - acc,
	]
	const result = mapAccum(sumWithDiff)(0)([1, 2, 3, 4])
	assertEquals(result, [10, [1, 1, 0, -2]])
})

Deno.test("mapAccum: handles running average", () => {
	const runningAvg = (
		acc: { sum: number; count: number },
		x: number,
	): [{ sum: number; count: number }, number] => {
		const newSum = acc.sum + x
		const newCount = acc.count + 1
		return [{ sum: newSum, count: newCount }, newSum / newCount]
	}
	const result = mapAccum(runningAvg)({ sum: 0, count: 0 })([10, 20, 30])
	assertEquals(result, [{ sum: 60, count: 3 }, [10, 15, 20]])
})

Deno.test("mapAccum: handles line numbering", () => {
	const addLineNumber = (
		lineNo: number,
		text: string,
	): [number, string] => [lineNo + 1, `${lineNo}: ${text}`]
	const result = mapAccum(addLineNumber)(1)(["First", "Second", "Third"])
	assertEquals(result, [4, ["1: First", "2: Second", "3: Third"]])
})

Deno.test("mapAccum: handles fibonacci sequence", () => {
	const fibonacci = (
		acc: [number, number],
		_: unknown,
	): [[number, number], number] => [[acc[1], acc[0] + acc[1]], acc[0]]
	const result = mapAccum(fibonacci)([0, 1])([1, 2, 3, 4, 5])
	assertEquals(result, [[5, 8], [0, 1, 1, 2, 3]])
})

Deno.test("mapAccum: handles partial sums with objects", () => {
	const withRunningTotal = mapAccum(
		(sum: number, x: number) => [
			sum + x,
			{ value: x, total: sum + x },
		],
	)
	const result = withRunningTotal(0)([10, 20, 30])
	assertEquals(result, [
		60,
		[
			{ value: 10, total: 10 },
			{ value: 20, total: 30 },
			{ value: 30, total: 60 },
		],
	])
})

Deno.test("mapAccum: handles empty array", () => {
	const fn = (acc: number, x: number): [number, number] => [
		acc + x,
		x * 2,
	]
	const result = mapAccum(fn)(10)([])
	assertEquals(result, [10, []])
})

Deno.test("mapAccum: handles null array", () => {
	const fn = (acc: number, x: number): [number, number] => [
		acc + x,
		x * 2,
	]
	const result = mapAccum(fn)(0)(null)
	assertEquals(result, [0, []])
})

Deno.test("mapAccum: handles undefined array", () => {
	const fn = (acc: number, x: number): [number, number] => [
		acc + x,
		x * 2,
	]
	const result = mapAccum(fn)(5)(undefined)
	assertEquals(result, [5, []])
})

Deno.test("mapAccum: handles single element array", () => {
	const fn = (acc: number, x: number): [number, number] => [
		acc + x,
		x - acc,
	]
	const result = mapAccum(fn)(10)([5])
	assertEquals(result, [15, [-5]])
})

Deno.test("mapAccum: preserves order of elements", () => {
	const indexer = (acc: number, x: string): [number, [number, string]] => [
		acc + 1,
		[acc, x],
	]
	const result = mapAccum(indexer)(0)(["a", "b", "c"])
	assertEquals(result, [3, [[0, "a"], [1, "b"], [2, "c"]]])
})

Deno.test("mapAccum: supports partial application", () => {
	const sumWithProduct = (acc: number, x: number): [number, number] => [
		acc + x,
		acc * x,
	]
	const partialFn = mapAccum(sumWithProduct)
	const withInitial = partialFn(1)
	const result = withInitial([2, 3, 4])
	assertEquals(result, [10, [2, 9, 24]])
})

Deno.test("mapAccum: allows reusing partially applied function", () => {
	const concat = (acc: string, x: string): [string, number] => [
		acc + x,
		x.length,
	]
	const mapWithConcat = mapAccum(concat)
	const withEmpty = mapWithConcat("")

	const result1 = withEmpty(["a", "bb", "ccc"])
	assertEquals(result1, ["abbccc", [1, 2, 3]])

	const result2 = withEmpty(["hello", "world"])
	assertEquals(result2, ["helloworld", [5, 5]])
})

Deno.test("mapAccum: handles different accumulator and element types", () => {
	const builder = (
		acc: Array<string>,
		x: number,
	): [Array<string>, string] => {
		const str = x.toString()
		return [[...acc, str], str.repeat(x)]
	}
	const result = mapAccum(builder)([])([1, 2, 3])
	assertEquals(result, [["1", "2", "3"], ["1", "22", "333"]])
})

Deno.test("mapAccum: handles complex object transformations", () => {
	type State = { count: number; seen: Set<string> }
	const counter = (
		state: State,
		item: string,
	): [State, { item: string; isNew: boolean; count: number }] => {
		const isNew = !state.seen.has(item)
		const newState = {
			count: state.count + 1,
			seen: new Set([...state.seen, item]),
		}
		return [newState, { item, isNew, count: state.count }]
	}

	const result = mapAccum(counter)({ count: 0, seen: new Set() })([
		"a",
		"b",
		"a",
		"c",
	])
	assertEquals(result[0].count, 4)
	assertEquals(result[0].seen.size, 3)
	assertEquals(result[1], [
		{ item: "a", isNew: true, count: 0 },
		{ item: "b", isNew: true, count: 1 },
		{ item: "a", isNew: false, count: 2 },
		{ item: "c", isNew: true, count: 3 },
	])
})

Deno.test("mapAccum: does not modify original array", () => {
	const original = [1, 2, 3]
	const fn = (acc: number, x: number): [number, number] => [
		acc + x,
		x * 2,
	]
	mapAccum(fn)(0)(original)
	assertEquals(original, [1, 2, 3])
})

Deno.test("mapAccum: does not share references in output", () => {
	const fn = (acc: Array<number>, x: number): [Array<number>, number] => [
		[...acc, x],
		x * 2,
	]
	const result1 = mapAccum(fn)([])([1, 2])
	const result2 = mapAccum(fn)([])([1, 2])
	result1[0].push(999)
	assertEquals(result2[0], [1, 2])
})

Deno.test("mapAccum: property test - maintains array length in mapped output", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(arr, initial) => {
				const fn = (acc: number, x: number): [number, number] => [
					acc + x,
					x,
				]
				const [_, mapped] = mapAccum(fn)(initial)(arr)
				assertEquals(mapped.length, arr.length)
			},
		),
	)
})

Deno.test("mapAccum: property test - accumulates correctly for addition", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: -1000, max: 1000 })),
			fc.integer({ min: -1000, max: 1000 }),
			(arr, initial) => {
				const fn = (acc: number, x: number): [number, number] => [
					acc + x,
					x,
				]
				const [finalAcc, _] = mapAccum(fn)(initial)(arr)
				const expected = arr.reduce((sum, x) => sum + x, initial)
				assertEquals(finalAcc, expected)
			},
		),
	)
})

Deno.test("mapAccum: property test - preserves order of mapped elements", () => {
	fc.assert(
		fc.property(
			fc.array(fc.string()),
			(arr) => {
				const fn = (acc: number, x: string): [number, string] => [
					acc + 1,
					x,
				]
				const [_, mapped] = mapAccum(fn)(0)(arr)
				assertEquals(mapped, arr)
			},
		),
	)
})

Deno.test("mapAccum: property test - handles identity mapping", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			fc.anything(),
			(arr, initial) => {
				const fn = <T>(acc: T, x: T): [T, T] => [acc, x]
				const [finalAcc, mapped] = mapAccum(fn)(initial)(arr)
				assertEquals(finalAcc, initial)
				assertEquals(mapped, arr)
			},
		),
	)
})

Deno.test("mapAccum: property test - consistent with manual iteration", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(arr, initial) => {
				const fn = (acc: number, x: number): [number, number] => [
					acc * 2 + x,
					acc + x,
				]
				const [resultAcc, resultMapped] = mapAccum(fn)(initial)(arr)

				// Manual iteration
				let manualAcc = initial
				const manualMapped: Array<number> = []
				for (const x of arr) {
					const mapped = manualAcc + x
					manualMapped.push(mapped)
					manualAcc = manualAcc * 2 + x
				}

				assertEquals(resultAcc, manualAcc)
				assertEquals(resultMapped, manualMapped)
			},
		),
	)
})

Deno.test("mapAccum: property test - handles nullish values properly", () => {
	fc.assert(
		fc.property(
			fc.oneof(fc.constant(null), fc.constant(undefined)),
			fc.integer(),
			fc.func(fc.tuple(fc.integer(), fc.integer())),
			(nullish, initial, fnGen) => {
				const fn = (_acc: number, _x: unknown): [number, number] => fnGen()
				const result = mapAccum(fn)(initial)(nullish as any)
				assertEquals(result, [initial, []])
			},
		),
	)
})

Deno.test("mapAccum: handles parsing with state", () => {
	type ParserState = { pos: number; errors: Array<string> }
	const parse = (
		state: ParserState,
		char: string,
	): [ParserState, boolean] => {
		if (char === "(") {
			return [{ ...state, pos: state.pos + 1 }, true]
		} else if (char === ")") {
			if (state.pos === 0) {
				return [
					{
						...state,
						errors: [
							...state.errors,
							"Unmatched closing parenthesis",
						],
					},
					false,
				]
			}
			return [{ ...state, pos: state.pos - 1 }, true]
		}
		return [state, true]
	}

	const input = ["(", "(", "a", ")", ")", ")", "("]
	const [finalState, results] = mapAccum(parse)({ pos: 0, errors: [] })(
		input,
	)

	assertEquals(finalState.pos, 1)
	assertEquals(finalState.errors, ["Unmatched closing parenthesis"])
	assertEquals(results, [true, true, true, true, true, false, true])
})

Deno.test("mapAccum: handles calculating running statistics", () => {
	type Stats = { min: number; max: number; sum: number; count: number }
	const updateStats = (
		stats: Stats,
		value: number,
	): [Stats, { value: number; mean: number; range: number }] => {
		const newStats = {
			min: Math.min(stats.min, value),
			max: Math.max(stats.max, value),
			sum: stats.sum + value,
			count: stats.count + 1,
		}
		const mean = newStats.sum / newStats.count
		const range = newStats.max - newStats.min
		return [newStats, { value, mean, range }]
	}

	const data = [10, 5, 15, 20, 8]
	const [finalStats, observations] = mapAccum(updateStats)({
		min: Infinity,
		max: -Infinity,
		sum: 0,
		count: 0,
	})(data)

	assertEquals(finalStats, { min: 5, max: 20, sum: 58, count: 5 })
	assertEquals(observations[4], { value: 8, mean: 11.6, range: 15 })
})
