import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import some from "./index.ts"

Deno.test("some - basic functionality", async function someBasicTests(t) {
	await t.step(
		"returns true when at least one element satisfies predicate",
		function returnsTrueWhenSatisfied() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = some(isEven)([1, 2, 3, 4, 5])

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns false when no element satisfies predicate",
		function returnsFalseWhenNotSatisfied() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = some(isEven)([1, 3, 5, 7, 9])

			assertEquals(result, false)
		},
	)

	await t.step(
		"returns false for empty array",
		function returnsFalseForEmpty() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = some(isEven)([])

			assertEquals(result, false)
		},
	)

	await t.step(
		"returns true when first element satisfies",
		function returnsTrueForFirst() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = some(isEven)([2, 3, 5, 7])

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns true when last element satisfies",
		function returnsTrueForLast() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = some(isEven)([1, 3, 5, 8])

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns true when all elements satisfy",
		function returnsTrueWhenAllSatisfy() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = some(isEven)([2, 4, 6, 8])

			assertEquals(result, true)
		},
	)
})

Deno.test("some - predicate with index", async function someIndexTests(t) {
	await t.step(
		"passes index to predicate",
		function passesIndex() {
			function isAtEvenIndex(
				_value: number,
				index: number,
			): boolean {
				return index % 2 === 0
			}

			const result = some(isAtEvenIndex)([10, 20, 30])

			assertEquals(result, true)
		},
	)

	await t.step(
		"passes array to predicate",
		function passesArray() {
			function isInLongArray(
				_value: number,
				_index: number,
				array: ReadonlyArray<number>,
			): boolean {
				return array.length > 5
			}

			const result = some(isInLongArray)([1, 2, 3, 4, 5, 6, 7])

			assertEquals(result, true)
		},
	)
})

Deno.test("some - various predicates", async function someVariousTests(t) {
	await t.step(
		"works with string predicate",
		function worksWithStrings() {
			function hasA(s: string): boolean {
				return s.includes("a")
			}

			const result = some(hasA)(["hello", "world", "array"])

			assertEquals(result, true)
		},
	)

	await t.step(
		"works with object predicate",
		function worksWithObjects() {
			type Person = { readonly name: string; readonly age: number }

			function isAdult(p: Person): boolean {
				return p.age >= 18
			}

			const people: ReadonlyArray<Person> = [
				{ name: "Alice", age: 15 },
				{ name: "Bob", age: 20 },
			]

			const result = some(isAdult)(people)

			assertEquals(result, true)
		},
	)

	await t.step(
		"works with null check",
		function worksWithNullCheck() {
			function isNotNull(x: string | null): boolean {
				return x !== null
			}

			const result = some(isNotNull)([null, null, "value", null])

			assertEquals(result, true)
		},
	)
})

Deno.test("some - edge cases", async function someEdgeCaseTests(t) {
	await t.step(
		"handles single element matching",
		function handlesSingleMatching() {
			function isTrue(x: boolean): boolean {
				return x === true
			}

			const result = some(isTrue)([true])

			assertEquals(result, true)
		},
	)

	await t.step(
		"handles single element not matching",
		function handlesSingleNotMatching() {
			function isTrue(x: boolean): boolean {
				return x === true
			}

			const result = some(isTrue)([false])

			assertEquals(result, false)
		},
	)

	await t.step(
		"handles large arrays efficiently",
		function handlesLargeArrays() {
			function isThousand(n: number): boolean {
				return n === 1000
			}

			const largeArray = Array.from({ length: 10000 }, function createIndex(
				_,
				i,
			) {
				return i
			})

			const result = some(isThousand)(largeArray)

			assertEquals(result, true)
		},
	)
})

Deno.test(
	"some - property: matches native some",
	function matchesNativeSome() {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.integer(),
				function propertyMatchesNative(arr, target) {
					function equalsTarget(n: number): boolean {
						return n === target
					}

					const result = some(equalsTarget)(arr)
					const expected = arr.some(function nativeSome(n) {
						return n === target
					})

					assertEquals(result, expected)
				},
			),
		)
	},
)

Deno.test(
	"some - property: true if any element matches",
	function propertyTrueIfAny() {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				function propertyAnyMatch(arr) {
					function isPositive(n: number): boolean {
						return n > 0
					}

					const result = some(isPositive)(arr)
					const hasPositive = arr.filter(function filterPositive(n) {
						return n > 0
					}).length > 0

					assertEquals(result, hasPositive)
				},
			),
		)
	},
)

Deno.test(
	"some - property: false for empty array",
	function propertyFalseForEmpty() {
		fc.assert(
			fc.property(
				fc.func(fc.boolean()),
				function propertyEmptyFalse(predicateFn) {
					const result = some(predicateFn)([])

					assertEquals(result, false)
				},
			),
		)
	},
)
