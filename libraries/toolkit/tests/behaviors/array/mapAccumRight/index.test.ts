import { assertEquals } from "jsr:@std/assert@1.0.8"
import * as fc from "npm:fast-check@3"

import mapAccumRight from "../../../../src/simple/array/mapAccumRight/index.ts"

Deno.test("mapAccumRight: processes array from right to left", () => {
	const suffixSum = (acc: number, x: number): [number, number] => [
		acc + x,
		acc + x,
	]
	const result = mapAccumRight(suffixSum)(0)([1, 2, 3, 4, 5])
	assertEquals(result, [15, [15, 14, 12, 9, 5]])
})

Deno.test("mapAccumRight: builds path from end", () => {
	const buildPath = (path: string, segment: string): [string, string] => {
		const newPath = path ? `${segment}/${path}` : segment
		return [newPath, newPath]
	}
	const result = mapAccumRight(buildPath)("")(["usr", "local", "bin"])
	assertEquals(result, ["usr/local/bin", ["usr/local/bin", "local/bin", "bin"]])
})

Deno.test("mapAccumRight: counts elements after each position", () => {
	const countAfter = (count: number, _: unknown): [number, number] => [
		count + 1,
		count,
	]
	const result = mapAccumRight(countAfter)(0)(["a", "b", "c", "d"])
	assertEquals(result, [4, [3, 2, 1, 0]])
})

Deno.test("mapAccumRight: handles suffix products", () => {
	const suffixProduct = (acc: number, x: number): [number, number] => [
		acc * x,
		acc * x,
	]
	const result = mapAccumRight(suffixProduct)(1)([2, 3, 4])
	assertEquals(result, [24, [24, 12, 4]])
})

Deno.test("mapAccumRight: handles right-associative operations", () => {
	const rightAssoc = (acc: string, x: string): [string, string] => {
		const combined = `(${x}${acc ? ` ${acc}` : ""})`
		return [combined, combined]
	}
	const result = mapAccumRight(rightAssoc)("")(["a", "b", "c"])
	assertEquals(result, ["(a (b (c)))", ["(a (b (c)))", "(b (c))", "(c)"]])
})

Deno.test("mapAccumRight: handles empty array", () => {
	const fn = (acc: number, x: number): [number, number] => [
		acc + x,
		x * 2,
	]
	const result = mapAccumRight(fn)(10)([])
	assertEquals(result, [10, []])
})

Deno.test("mapAccumRight: handles null array", () => {
	const fn = (acc: number, x: number): [number, number] => [
		acc + x,
		x * 2,
	]
	const result = mapAccumRight(fn)(0)(null)
	assertEquals(result, [0, []])
})

Deno.test("mapAccumRight: handles undefined array", () => {
	const fn = (acc: number, x: number): [number, number] => [
		acc + x,
		x * 2,
	]
	const result = mapAccumRight(fn)(5)(undefined)
	assertEquals(result, [5, []])
})

Deno.test("mapAccumRight: handles single element array", () => {
	const fn = (acc: number, x: number): [number, number] => [
		acc + x,
		acc - x,
	]
	const result = mapAccumRight(fn)(10)([5])
	assertEquals(result, [15, [5]])
})

Deno.test("mapAccumRight: preserves left-to-right order in output", () => {
	const indexFromEnd = (
		acc: number,
		x: string,
	): [number, [string, number]] => [acc + 1, [x, acc]]
	const result = mapAccumRight(indexFromEnd)(0)(["a", "b", "c"])
	assertEquals(result, [3, [["a", 2], ["b", 1], ["c", 0]]])
})

Deno.test("mapAccumRight: supports partial application", () => {
	const suffixConcat = (acc: string, x: string): [string, string] => [
		acc + x,
		acc + x,
	]
	const partialFn = mapAccumRight(suffixConcat)
	const withEmpty = partialFn("")
	const result = withEmpty(["a", "b", "c"])
	assertEquals(result, ["cba", ["cba", "cb", "c"]])
})

Deno.test("mapAccumRight: allows reusing partially applied function", () => {
	const maxSuffix = (max: number, x: number): [number, number] => {
		const newMax = Math.max(max, x)
		return [newMax, newMax]
	}
	const mapWithMax = mapAccumRight(maxSuffix)
	const withNegInfinity = mapWithMax(-Infinity)

	const result1 = withNegInfinity([3, 1, 4, 1, 5])
	assertEquals(result1, [5, [5, 5, 5, 5, 5]])

	const result2 = withNegInfinity([10, 20, 15])
	assertEquals(result2, [20, [20, 20, 15]])
})

Deno.test("mapAccumRight: handles different accumulator and element types", () => {
	const collectSuffixes = (
		suffixes: Array<string>,
		x: number,
	): [Array<string>, string] => {
		const str = x.toString()
		const newSuffixes = [str, ...suffixes]
		return [newSuffixes, newSuffixes.join("-")]
	}
	const result = mapAccumRight(collectSuffixes)([])([1, 2, 3])
	assertEquals(result, [["1", "2", "3"], ["1-2-3", "2-3", "3"]])
})

Deno.test("mapAccumRight: handles complex state transformations", () => {
	type State = { depth: number; path: Array<string> }
	const processNode = (
		state: State,
		node: string,
	): [State, { node: string; depth: number; path: string }] => {
		const newState = {
			depth: state.depth - 1,
			path: [node, ...state.path],
		}
		return [
			newState,
			{
				node,
				depth: state.depth,
				path: state.path.join("/") || "root",
			},
		]
	}

	const result = mapAccumRight(processNode)({ depth: 3, path: [] })([
		"a",
		"b",
		"c",
	])
	assertEquals(result[0], { depth: 0, path: ["a", "b", "c"] })
	assertEquals(result[1], [
		{ node: "a", depth: 1, path: "b/c" },
		{ node: "b", depth: 2, path: "c" },
		{ node: "c", depth: 3, path: "root" },
	])
})

Deno.test("mapAccumRight: does not modify original array", () => {
	const original = [1, 2, 3]
	const fn = (acc: number, x: number): [number, number] => [
		acc + x,
		x * 2,
	]
	mapAccumRight(fn)(0)(original)
	assertEquals(original, [1, 2, 3])
})

Deno.test("mapAccumRight: does not share references in output", () => {
	const fn = (acc: Array<number>, x: number): [Array<number>, number] => [
		[...acc, x],
		x * 2,
	]
	const result1 = mapAccumRight(fn)([])([1, 2])
	const result2 = mapAccumRight(fn)([])([1, 2])
	result1[0].push(999)
	assertEquals(result2[0], [2, 1])
})

Deno.test("mapAccumRight: property test - maintains array length in mapped output", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(arr, initial) => {
				const fn = (acc: number, x: number): [number, number] => [
					acc + x,
					x,
				]
				const [_, mapped] = mapAccumRight(fn)(initial)(arr)
				assertEquals(mapped.length, arr.length)
			},
		),
	)
})

Deno.test("mapAccumRight: property test - accumulates correctly from right", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: -1000, max: 1000 })),
			fc.integer({ min: -1000, max: 1000 }),
			(arr, initial) => {
				const fn = (acc: number, x: number): [number, number] => [
					acc + x,
					x,
				]
				const [finalAcc, _] = mapAccumRight(fn)(initial)(arr)
				const expected = arr.reduceRight((sum, x) => sum + x, initial)
				assertEquals(finalAcc, expected)
			},
		),
	)
})

Deno.test("mapAccumRight: property test - preserves element order in output", () => {
	fc.assert(
		fc.property(
			fc.array(fc.string()),
			(arr) => {
				const fn = (acc: number, x: string): [number, string] => [
					acc + 1,
					x,
				]
				const [_, mapped] = mapAccumRight(fn)(0)(arr)
				assertEquals(mapped, arr)
			},
		),
	)
})

Deno.test("mapAccumRight: property test - consistent with manual right-to-left iteration", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(arr, initial) => {
				const fn = (acc: number, x: number): [number, number] => [
					acc * 2 + x,
					acc + x,
				]
				const [resultAcc, resultMapped] = mapAccumRight(fn)(initial)(arr)

				// Manual right-to-left iteration
				let manualAcc = initial
				const manualMapped: Array<number> = []
				for (let i = arr.length - 1; i >= 0; i--) {
					const x = arr[i]
					const mapped = manualAcc + x
					manualMapped.unshift(mapped)
					manualAcc = manualAcc * 2 + x
				}

				assertEquals(resultAcc, manualAcc)
				assertEquals(resultMapped, manualMapped)
			},
		),
	)
})

Deno.test("mapAccumRight: property test - mapAccumRight with reverse equals mapAccum", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(arr, initial) => {
				const fn = (acc: number, x: number): [number, number] => [
					acc + x,
					acc * x,
				]
				const [rightAcc, rightMapped] = mapAccumRight(fn)(initial)(arr)

				// Simulate mapAccum on reversed array
				const reversed = [...arr].reverse()
				let acc = initial
				const mapped: Array<number> = []
				for (const x of reversed) {
					const product = acc * x
					mapped.push(product)
					acc = acc + x
				}
				mapped.reverse()

				assertEquals(rightAcc, acc)
				assertEquals(rightMapped, mapped)
			},
		),
	)
})

Deno.test("mapAccumRight: property test - handles nullish values properly", () => {
	fc.assert(
		fc.property(
			fc.oneof(fc.constant(null), fc.constant(undefined)),
			fc.integer(),
			fc.func(fc.tuple(fc.integer(), fc.integer())),
			(nullish, initial, fnGen) => {
				const fn = (_acc: number, _x: unknown): [number, number] => fnGen()
				const result = mapAccumRight(fn)(initial)(nullish as any)
				assertEquals(result, [initial, []])
			},
		),
	)
})

Deno.test("mapAccumRight: handles bracket matching from right", () => {
	type BracketState = { depth: number; errors: Array<string> }
	const matchBrackets = (
		state: BracketState,
		char: string,
	): [BracketState, string] => {
		if (char === ")") {
			return [{ ...state, depth: state.depth + 1 }, "close"]
		} else if (char === "(") {
			if (state.depth === 0) {
				return [
					{
						...state,
						errors: [...state.errors, "Unmatched opening bracket"],
					},
					"error",
				]
			}
			return [{ ...state, depth: state.depth - 1 }, "open"]
		}
		return [state, "char"]
	}

	const input = ["(", "(", "a", ")", "b", ")", ")", "("]
	const [finalState, results] = mapAccumRight(matchBrackets)({
		depth: 0,
		errors: [],
	})(input)

	assertEquals(finalState.depth, 1)
	assertEquals(finalState.errors, ["Unmatched opening bracket"])
	assertEquals(results, [
		"open",
		"open",
		"char",
		"close",
		"char",
		"close",
		"close",
		"error",
	])
})

Deno.test("mapAccumRight: handles suffix max calculation", () => {
	const suffixMax = (
		max: number,
		value: number,
	): [number, { value: number; suffixMax: number }] => {
		const newMax = Math.max(max, value)
		return [newMax, { value, suffixMax: newMax }]
	}

	const data = [3, 7, 2, 9, 1, 5]
	const [finalMax, observations] = mapAccumRight(suffixMax)(-Infinity)(data)

	assertEquals(finalMax, 9)
	assertEquals(observations, [
		{ value: 3, suffixMax: 9 },
		{ value: 7, suffixMax: 9 },
		{ value: 2, suffixMax: 9 },
		{ value: 9, suffixMax: 9 },
		{ value: 1, suffixMax: 5 },
		{ value: 5, suffixMax: 5 },
	])
})
