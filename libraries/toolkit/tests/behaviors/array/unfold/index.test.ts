import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import { assertType, Has } from "https://deno.land/std@0.218.0/testing/types.ts"
import * as fc from "npm:fast-check@3"

import unfold from "../../../../src/simple/array/unfold/index.ts"

Deno.test("unfold: basic generation", () => {
	// Generate range of numbers
	assertEquals(
		unfold((n: number) => n < 10 ? [n, n + 1] : null)(0),
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		"should generate range of numbers",
	)

	// Generate countdown
	assertEquals(
		unfold((n: number) => n > 0 ? [n, n - 1] : null)(5),
		[5, 4, 3, 2, 1],
		"should generate countdown",
	)

	// Generate even numbers
	assertEquals(
		unfold((n: number) => n <= 10 ? [n, n + 2] : null)(0),
		[0, 2, 4, 6, 8, 10],
		"should generate even numbers",
	)
})

Deno.test("unfold: Fibonacci sequence", () => {
	const fibonacci = unfold(([a, b]: [number, number]) =>
		a <= 100 ? [a, [b, a + b]] : null
	)

	assertEquals(
		fibonacci([0, 1]),
		[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
		"should generate Fibonacci sequence",
	)

	assertEquals(
		fibonacci([1, 1]),
		[1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
		"should generate Fibonacci with different start",
	)
})

Deno.test("unfold: powers of 2", () => {
	assertEquals(
		unfold((n: number) => n <= 256 ? [n, n * 2] : null)(1),
		[1, 2, 4, 8, 16, 32, 64, 128, 256],
		"should generate powers of 2",
	)

	assertEquals(
		unfold((n: number) => n < 1000 ? [n, n * 3] : null)(1),
		[1, 3, 9, 27, 81, 243, 729],
		"should generate powers of 3",
	)
})

Deno.test("unfold: string processing", () => {
	// Parse string character by character
	assertEquals(
		unfold((s: string) => s.length > 0 ? [s[0], s.slice(1)] : null)("hello"),
		["h", "e", "l", "l", "o"],
		"should parse string into characters",
	)

	// Parse in pairs
	assertEquals(
		unfold((s: string) => s.length >= 2 ? [s.slice(0, 2), s.slice(2)] : null)(
			"abcdef",
		),
		["ab", "cd", "ef"],
		"should parse string in pairs",
	)

	// Reverse string character by character
	assertEquals(
		unfold((s: string) =>
			s.length > 0 ? [s[s.length - 1], s.slice(0, -1)] : null
		)("hello"),
		["o", "l", "l", "e", "h"],
		"should reverse string",
	)
})

Deno.test("unfold: object generation", () => {
	type State = { count: number; total: number }

	const sumSequence = unfold((state: State) =>
		state.count <= 5
			? [state.total, {
				count: state.count + 1,
				total: state.total + state.count,
			}]
			: null
	)

	assertEquals(
		sumSequence({ count: 1, total: 0 }),
		[0, 1, 3, 6, 10],
		"should generate cumulative sum",
	)
})

Deno.test("unfold: array generation", () => {
	// Generate Pascal's triangle row
	const nextPascalRow = (row: Array<number>): Array<number> => {
		const next = [1]
		for (let i = 0; i < row.length - 1; i++) {
			next.push(row[i] + row[i + 1])
		}
		next.push(1)
		return next
	}

	assertEquals(
		unfold((state: { row: Array<number>; n: number }) =>
			state.n < 5
				? [state.row, { row: nextPascalRow(state.row), n: state.n + 1 }]
				: null
		)({ row: [1], n: 0 }),
		[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]],
		"should generate Pascal's triangle rows",
	)
})

Deno.test("unfold: edge cases", () => {
	// Immediate termination
	assertEquals(
		unfold(() => null)(0),
		[],
		"should return empty array for immediate termination",
	)

	// Single element
	assertEquals(
		unfold((n: number) => n === 0 ? [42, 1] : null)(0),
		[42],
		"should generate single element",
	)

	// Empty seed handling
	assertEquals(
		unfold((n: number) => n < 5 ? [n, n + 1] : null)(10),
		[],
		"should handle seed that doesn't meet condition",
	)
})

Deno.test("unfold: null and undefined handling", () => {
	const generator = (n: number) => n < 5 ? [n, n + 1] : null

	assertEquals(
		unfold(generator)(null),
		[],
		"should return empty array for null seed",
	)

	assertEquals(
		unfold(generator)(undefined),
		[],
		"should return empty array for undefined seed",
	)
})

Deno.test("unfold: special values", () => {
	// NaN handling
	assertEquals(
		unfold((n: number) => !Number.isNaN(n) && n < 3 ? [n, NaN] : null)(0),
		[0],
		"should stop when seed becomes NaN",
	)

	// Infinity handling
	assertEquals(
		unfold((n: number) =>
			n < Infinity ? [n, n === 3 ? Infinity : n + 1] : null
		)(0),
		[0, 1, 2, 3],
		"should handle Infinity in seed",
	)

	// Negative numbers
	assertEquals(
		unfold((n: number) => n >= -5 ? [n, n - 1] : null)(0),
		[0, -1, -2, -3, -4, -5],
		"should handle negative numbers",
	)
})

Deno.test("unfold: complex data structures", () => {
	// Tree traversal simulation
	type TreeNode = { value: number; children: Array<TreeNode> }
	const tree: TreeNode = {
		value: 1,
		children: [
			{ value: 2, children: [] },
			{ value: 3, children: [] },
		],
	}

	assertEquals(
		unfold((nodes: Array<TreeNode>) => {
			if (nodes.length === 0) return null
			const [first, ...rest] = nodes
			return [first.value, [...rest, ...first.children]]
		})([tree]),
		[1, 2, 3],
		"should traverse tree breadth-first",
	)
})

Deno.test("unfold: factorial generation", () => {
	type FactState = { n: number; fact: number }

	assertEquals(
		unfold((state: FactState) =>
			state.n <= 5
				? [state.fact, { n: state.n + 1, fact: state.fact * (state.n + 1) }]
				: null
		)({ n: 0, fact: 1 }),
		[1, 1, 2, 6, 24, 120],
		"should generate factorials",
	)
})

Deno.test("unfold: date generation", () => {
	const startDate = new Date("2024-01-01")

	const dates = unfold((date: Date) => {
		if (date >= new Date("2024-01-06")) return null
		const nextDate = new Date(date)
		nextDate.setDate(date.getDate() + 1)
		return [date.toISOString().split("T")[0], nextDate]
	})(startDate)

	assertEquals(
		dates,
		["2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04", "2024-01-05"],
		"should generate date sequence",
	)
})

Deno.test("unfold: currying", () => {
	const counter = unfold((n: number) => n < 3 ? [n, n + 1] : null)

	assertEquals(
		counter(0),
		[0, 1, 2],
		"should work with partial application",
	)

	assertEquals(
		counter(1),
		[1, 2],
		"should work with different seed",
	)

	const multipleSeeds = [0, 5, 10].map(counter)
	assertEquals(
		multipleSeeds,
		[[0, 1, 2], [], []],
		"should work with map",
	)
})

Deno.test("unfold: type inference", () => {
	const numbers = unfold((n: number) => n < 3 ? [n, n + 1] : null)(0)
	assertType<Has<typeof numbers, Array<number>>>(true)

	const strings = unfold((s: string) =>
		s.length > 0 ? [s[0], s.slice(1)] : null
	)("test")
	assertType<Has<typeof strings, Array<string>>>(true)

	type State = { value: string; count: number }
	const mixed = unfold((state: State) =>
		state.count < 3
			? [state.value, { value: state.value + "!", count: state.count + 1 }]
			: null
	)({ value: "hi", count: 0 })
	assertType<Has<typeof mixed, Array<string>>>(true)
})

Deno.test("unfold: property-based tests", () => {
	// Property: Length equals number of iterations
	fc.assert(
		fc.property(
			fc.integer({ min: 0, max: 100 }),
			(n) => {
				const result = unfold((i: number) => i < n ? [i, i + 1] : null)(0)
				assertEquals(result.length, n, "length should equal iteration count")
			},
		),
		{ numRuns: 100 },
	)

	// Property: Values match expected sequence
	fc.assert(
		fc.property(
			fc.integer({ min: 1, max: 50 }),
			(n) => {
				const result = unfold((i: number) => i <= n ? [i * 2, i + 1] : null)(1)
				const expected = Array.from({ length: n }, (_, i) => (i + 1) * 2)
				assertEquals(result, expected, "values should match expected sequence")
			},
		),
		{ numRuns: 100 },
	)

	// Property: Empty result for null seed
	fc.assert(
		fc.property(
			fc.func(fc.option(fc.tuple(fc.integer(), fc.integer()), { nil: null })),
			(fn) => {
				const result = unfold(fn)(null)
				assertEquals(result, [], "null seed should produce empty array")
			},
		),
		{ numRuns: 100 },
	)

	// Property: Generator controls termination
	fc.assert(
		fc.property(
			fc.integer({ min: 0, max: 20 }),
			fc.integer({ min: 0, max: 100 }),
			(limit, seed) => {
				const result = unfold((n: number) => n < limit ? [n, n + 1] : null)(
					seed,
				)
				if (seed >= limit) {
					assertEquals(result, [], "should be empty when seed >= limit")
				} else {
					assertEquals(
						result.length,
						limit - seed,
						"length should be limit - seed",
					)
					assertEquals(result[0], seed, "first element should be seed")
					assertEquals(
						result[result.length - 1],
						limit - 1,
						"last element should be limit - 1",
					)
				}
			},
		),
		{ numRuns: 100 },
	)
})

Deno.test("unfold: immutability", () => {
	const seedObj = { value: 0 }
	const result = unfold((obj: { value: number }) =>
		obj.value < 3 ? [obj.value, { value: obj.value + 1 }] : null
	)(seedObj)

	assertEquals(seedObj.value, 0, "original seed should not be modified")
	assertEquals(result, [0, 1, 2], "should generate correct sequence")
})

Deno.test("unfold: performance considerations", () => {
	// Generate large array
	const large = unfold((n: number) => n < 1000 ? [n, n + 1] : null)(0)
	assertEquals(large.length, 1000, "should handle large sequences")
	assertEquals(large[0], 0, "first element should be correct")
	assertEquals(large[999], 999, "last element should be correct")

	// Early termination
	let iterations = 0
	const earlyStop = unfold((n: number) => {
		iterations++
		return n < 5 ? [n, n + 1] : null
	})(0)
	assertEquals(
		iterations,
		6,
		"should only iterate as needed (5 values + 1 termination check)",
	)
	assertEquals(earlyStop, [0, 1, 2, 3, 4], "should produce correct result")
})

Deno.test("unfold: real-world scenarios", () => {
	// Pagination simulation
	type Page = { items: Array<number>; nextToken?: string }
	const simulatePages = unfold((token: string | null) => {
		if (token === null) return null
		const pageNum = token === "start" ? 1 : parseInt(token)
		if (pageNum > 3) return null

		const page: Page = {
			items: Array.from({ length: 3 }, (_, i) => pageNum * 10 + i),
			nextToken: pageNum < 3 ? String(pageNum + 1) : undefined,
		}
		return [page.items, page.nextToken || null]
	})("start")

	assertEquals(
		simulatePages,
		[[10, 11, 12], [20, 21, 22], [30, 31, 32]],
		"should simulate pagination",
	)

	// Exponential backoff delays
	assertEquals(
		unfold((delay: number) => delay <= 8000 ? [delay, delay * 2] : null)(1000),
		[1000, 2000, 4000, 8000],
		"should generate exponential backoff delays",
	)

	// Token generation sequence
	assertEquals(
		unfold((n: number) => n < 5 ? [`token-${n}`, n + 1] : null)(0),
		["token-0", "token-1", "token-2", "token-3", "token-4"],
		"should generate token sequence",
	)
})
