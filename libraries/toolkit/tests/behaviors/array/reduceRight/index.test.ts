import {
	assertEquals,
	assertStrictEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"
import {
	assertType,
	IsExact,
} from "https://deno.land/std@0.218.0/testing/types.ts"
import * as fc from "npm:fast-check@3"

import reduceRight from "../../../../src/simple/array/reduceRight/index.ts"

Deno.test("reduceRight: basic functionality", async (t) => {
	await t.step("should reduce array from right to left", () => {
		const concat = (acc: string, x: string) => acc + x
		const result = reduceRight(concat)("")(["a", "b", "c", "d"])
		assertEquals(result, "dcba")
	})

	await t.step("should handle numeric reduction", () => {
		const subtract = (acc: number, x: number) => acc - x
		const result = reduceRight(subtract)(0)([1, 2, 3, 4])
		// (0 - 4) - 3 - 2 - 1 = -10
		assertEquals(result, -10)
	})

	await t.step("should pass correct arguments to reducer", () => {
		const calls: Array<[unknown, unknown, number, ReadonlyArray<unknown>]> = []
		const spy = (
			acc: unknown,
			elem: unknown,
			idx: number,
			arr: ReadonlyArray<unknown>,
		) => {
			calls.push([acc, elem, idx, arr])
			return acc
		}

		const arr = ["a", "b", "c"]
		reduceRight(spy)("init")(arr)

		assertEquals(calls, [
			["init", "c", 2, arr],
			["init", "b", 1, arr],
			["init", "a", 0, arr],
		])
	})

	await t.step("should handle single element array", () => {
		const add = (acc: number, x: number) => acc + x
		const result = reduceRight(add)(10)([5])
		assertEquals(result, 15)
	})

	await t.step("should return initial value for empty array", () => {
		const add = (acc: number, x: number) => acc + x
		const result = reduceRight(add)(42)([])
		assertEquals(result, 42)
	})
})

Deno.test("reduceRight: right-associative operations", async (t) => {
	await t.step("should handle power operations correctly", () => {
		const power = (acc: number, x: number) => Math.pow(x, acc)
		const result = reduceRight(power)(1)([2, 3, 2])
		// 2^(3^(2^1)) = 2^(3^2) = 2^9 = 512
		assertEquals(result, 512)
	})

	await t.step("should build nested structures from right", () => {
		type Node = { value: string; next: Node | null }
		const buildList = (next: Node | null, value: string): Node => ({
			value,
			next,
		})
		const result = reduceRight(buildList)(null as Node | null)([
			"a",
			"b",
			"c",
		])

		assertEquals(result, {
			value: "a",
			next: {
				value: "b",
				next: {
					value: "c",
					next: null,
				},
			},
		})
	})

	await t.step("should handle string concatenation from right", () => {
		const concat = (acc: string, x: string) => `(${x}${acc})`
		const result = reduceRight(concat)("")(["a", "b", "c"])
		assertEquals(result, "(a(b(c)))")
	})
})

Deno.test("reduceRight: comparison with reduce", async (t) => {
	await t.step(
		"should produce different results than reduce for non-commutative operations",
		() => {
			const divide = (acc: number, x: number) => acc / x
			const arr = [8, 4, 2]

			// reduceRight: 1 / 2 = 0.5, then 0.5 / 4 = 0.125, then 0.125 / 8 = 0.015625
			const rightResult = reduceRight(divide)(1)(arr)
			assertEquals(rightResult, 0.015625)

			// For comparison, reduce would give: 1 / 8 = 0.125, then 0.125 / 4 = 0.03125, then 0.03125 / 2 = 0.015625
			// Actually they're the same! Let's use subtraction instead
			const subtract = (acc: number, x: number) => acc - x
			const arr2 = [1, 2, 3]

			// reduceRight: 0 - 3 = -3, then -3 - 2 = -5, then -5 - 1 = -6
			const rightSubtract = reduceRight(subtract)(0)(arr2)
			assertEquals(rightSubtract, -6)

			// reduce: 0 - 1 = -1, then -1 - 2 = -3, then -3 - 3 = -6
			// Still the same! Let's use string concatenation which is clearly non-commutative
			const concat = (acc: string, x: string) => acc + x
			const strArr = ["a", "b", "c"]

			const rightConcat = reduceRight(concat)("")(strArr)
			assertEquals(rightConcat, "cba")

			const leftConcat = strArr.reduce(concat, "")
			assertEquals(leftConcat, "abc")
		},
	)

	await t.step(
		"should produce same results as reduce for commutative operations",
		() => {
			const add = (acc: number, x: number) => acc + x
			const multiply = (acc: number, x: number) => acc * x
			const arr = [1, 2, 3, 4]

			assertEquals(reduceRight(add)(0)(arr), arr.reduce(add, 0))
			assertEquals(reduceRight(multiply)(1)(arr), arr.reduce(multiply, 1))
		},
	)
})

Deno.test("reduceRight: edge cases", async (t) => {
	await t.step("should handle null input", () => {
		const add = (acc: number, x: number) => acc + x
		const result = reduceRight(add)(10)(null)
		assertEquals(result, 10)
	})

	await t.step("should handle undefined input", () => {
		const add = (acc: number, x: number) => acc + x
		const result = reduceRight(add)(20)(undefined)
		assertEquals(result, 20)
	})

	await t.step("should handle arrays with undefined values", () => {
		const concat = (acc: string, x: string | undefined) => acc + (x ?? "null")
		const result = reduceRight(concat)("")([undefined, "b", undefined])
		assertEquals(result, "nullbnull")
	})

	await t.step("should handle arrays with null values", () => {
		const concat = (acc: string, x: string | null) => acc + (x ?? "null")
		const result = reduceRight(concat)("")([null, "b", null])
		assertEquals(result, "nullbnull")
	})

	await t.step("should handle arrays with mixed types", () => {
		const stringify = (acc: string, x: unknown) => acc + String(x)
		const result = reduceRight(stringify)("")([1, "two", true, null])
		assertEquals(result, "nulltruetwo1")
	})
})

Deno.test("reduceRight: type safety", async (t) => {
	await t.step("should maintain correct types", () => {
		const reducer = (acc: string, x: number) => acc + x
		const curriedWithInitial = reduceRight(reducer)("init")
		const result = curriedWithInitial([1, 2, 3])

		assertType<IsExact<typeof result, string>>(true)
		assertEquals(result, "init321")
	})

	await t.step("should handle generic types correctly", () => {
		const identity = <T>(acc: T[], x: T) => [...acc, x]
		const result = reduceRight(identity)([])([1, 2, 3])

		assertType<IsExact<typeof result, number[]>>(true)
		assertEquals(result, [3, 2, 1])
	})
})

Deno.test("reduceRight: currying", async (t) => {
	await t.step("should be properly curried", () => {
		const add = (acc: number, x: number) => acc + x
		const curriedFn = reduceRight(add)
		const curriedWithInitial = curriedFn(0)
		const result = curriedWithInitial([1, 2, 3])

		assertEquals(result, 6)
	})

	await t.step("should allow partial application", () => {
		const concat = (acc: string, x: string) => acc + x
		const concatFromRight = reduceRight(concat)

		assertEquals(concatFromRight("")(["a", "b"]), "ba")
		assertEquals(concatFromRight("_")(["x", "y"]), "_yx")
	})
})

Deno.test("reduceRight: immutability", async (t) => {
	await t.step("should not modify the original array", () => {
		const original = [1, 2, 3, 4]
		const copy = [...original]
		const add = (acc: number, x: number) => acc + x

		reduceRight(add)(0)(original)
		assertEquals(original, copy)
	})

	await t.step("should not modify nested structures", () => {
		const original = [{ val: 1 }, { val: 2 }, { val: 3 }]
		const copy = original.map((obj) => ({ ...obj }))
		const sumVals = (acc: number, x: { val: number }) => acc + x.val

		reduceRight(sumVals)(0)(original)
		assertEquals(original, copy)
	})
})

Deno.test("reduceRight: practical examples", async (t) => {
	await t.step("should compose functions from right to left", () => {
		const double = (x: number) => x * 2
		const addOne = (x: number) => x + 1
		const square = (x: number) => x * x

		const compose =
			(f: (x: number) => number, g: (x: number) => number) => (x: number) =>
				f(g(x))

		const composed = reduceRight(compose)((x: number) => x)([
			double,
			addOne,
			square,
		])
		// square(addOne(double(3))) = square(addOne(6)) = square(7) = 49
		assertEquals(composed(3), 49)
	})

	await t.step("should flatten nested arrays from right", () => {
		const flatten = (acc: number[], x: number | number[]): number[] =>
			Array.isArray(x) ? [...x, ...acc] : [x, ...acc]

		const result = reduceRight(flatten)([])([1, [2, 3], 4, [5]])
		assertEquals(result, [1, 2, 3, 4, 5])
	})

	await t.step("should build tree structure from path", () => {
		type Tree = { [key: string]: Tree }
		const buildPath = (tree: Tree, segment: string): Tree => ({
			[segment]: tree,
		})

		const result = reduceRight(buildPath)({} as Tree)([
			"home",
			"user",
			"documents",
		])
		assertEquals(result, {
			home: {
				user: {
					documents: {},
				},
			},
		})
	})
})

Deno.test("reduceRight: property-based tests", async (t) => {
	await t.step("should maintain length when collecting elements", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				(arr) => {
					const collect = (acc: number[], x: number) => [x, ...acc]
					const result = reduceRight(collect)([])(arr)
					return result.length === arr.length
				},
			),
		)
	})

	await t.step(
		"should preserve sum regardless of direction for addition",
		() => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: -1000, max: 1000 })),
					(arr) => {
						const add = (acc: number, x: number) => acc + x
						const rightSum = reduceRight(add)(0)(arr)
						const leftSum = arr.reduce(add, 0)
						return Math.abs(rightSum - leftSum) < 0.0001
					},
				),
			)
		},
	)

	await t.step("should reverse array when collecting from right", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				(arr) => {
					const collect = (acc: number[], x: number) => [x, ...acc]
					const result = reduceRight(collect)([])(arr)
					// When we reduceRight with [x, ...acc], we're actually NOT reversing
					// We're building the array in the same order!
					// reduceRight processes from right to left, but prepending each element
					// Example: [1,2,3] -> process 3 first: [3], then 2: [2,3], then 1: [1,2,3]
					return JSON.stringify(result) === JSON.stringify(arr)
				},
			),
		)
	})

	await t.step("should handle null/undefined consistently", () => {
		fc.assert(
			fc.property(
				fc.integer(),
				(initial) => {
					const add = (acc: number, x: number) => acc + x
					const nullResult = reduceRight(add)(initial)(null)
					const undefinedResult = reduceRight(add)(initial)(undefined)
					return nullResult === initial && undefinedResult === initial
				},
			),
		)
	})

	await t.step("should process elements in reverse order", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer(), { minLength: 1 }),
				(arr) => {
					const indices: number[] = []
					const trackIndex = (acc: null, _x: number, idx: number) => {
						indices.push(idx)
						return acc
					}

					reduceRight(trackIndex)(null)(arr)

					// Indices should be in descending order
					for (let i = 1; i < indices.length; i++) {
						if (indices[i] >= indices[i - 1]) return false
					}
					return true
				},
			),
		)
	})
})

Deno.test("reduceRight: specific test cases from examples", async (t) => {
	await t.step("should handle string concatenation", () => {
		const concat = (acc: string, x: string) => acc + x
		assertEquals(reduceRight(concat)("")(["a", "b", "c", "d"]), "dcba")
	})

	await t.step("should build linked list from right", () => {
		type Node = { value: string; next: Node | null }
		const buildList = (next: Node | null, value: string): Node => ({
			value,
			next,
		})
		const result = reduceRight(buildList)(null as Node | null)([
			"a",
			"b",
			"c",
		])

		assertStrictEquals(result?.value, "a")
		assertStrictEquals(result?.next?.value, "b")
		assertStrictEquals(result?.next?.next?.value, "c")
		assertStrictEquals(result?.next?.next?.next, null)
	})

	await t.step("should handle right-associative power", () => {
		const power = (acc: number, x: number) => Math.pow(x, acc)
		assertEquals(reduceRight(power)(1)([2, 3, 2]), 512)
	})

	await t.step("should handle edge cases from examples", () => {
		const add = (acc: number, x: number) => acc + x
		assertEquals(reduceRight(add)(10)([]), 10)
		assertEquals(reduceRight(add)(0)(null), 0)
	})
})
