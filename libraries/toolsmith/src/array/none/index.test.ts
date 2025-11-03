import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import none from "./index.ts"

Deno.test("none - basic functionality", async function noneBasicTests(t) {
	await t.step(
		"returns true when no element satisfies predicate",
		function returnsTrueWhenNotSatisfied() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = none(isEven)([1, 3, 5, 7, 9])

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns false when at least one element satisfies predicate",
		function returnsFalseWhenSatisfied() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = none(isEven)([1, 2, 3, 4, 5])

			assertEquals(result, false)
		},
	)

	await t.step(
		"returns true for empty array",
		function returnsTrueForEmpty() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = none(isEven)([])

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns false when first element satisfies",
		function returnsFalseForFirst() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = none(isEven)([2, 3, 5, 7])

			assertEquals(result, false)
		},
	)

	await t.step(
		"returns false when last element satisfies",
		function returnsFalseForLast() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = none(isEven)([1, 3, 5, 8])

			assertEquals(result, false)
		},
	)

	await t.step(
		"returns false when all elements satisfy",
		function returnsFalseWhenAllSatisfy() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = none(isEven)([2, 4, 6, 8])

			assertEquals(result, false)
		},
	)
})

Deno.test("none - predicate with index", async function noneIndexTests(t) {
	await t.step(
		"passes index to predicate",
		function passesIndex() {
			function isAtEvenIndex(
				_value: number,
				index: number,
			): boolean {
				return index % 2 === 0
			}

			const result = none(isAtEvenIndex)([10, 20, 30])

			assertEquals(result, false)
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

			const result = none(isInLongArray)([1, 2, 3])

			assertEquals(result, true)
		},
	)
})

Deno.test("none - various predicates", async function noneVariousTests(t) {
	await t.step(
		"works with string predicate",
		function worksWithStrings() {
			function hasA(s: string): boolean {
				return s.includes("a")
			}

			const result = none(hasA)(["hello", "world"])

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
				{ name: "Bob", age: 16 },
			]

			const result = none(isAdult)(people)

			assertEquals(result, true)
		},
	)

	await t.step(
		"works with null check",
		function worksWithNullCheck() {
			function isNull(x: string | null): boolean {
				return x === null
			}

			const result = none(isNull)(["a", "b", "c"])

			assertEquals(result, true)
		},
	)
})

Deno.test("none - edge cases", async function noneEdgeCaseTests(t) {
	await t.step(
		"handles single element matching",
		function handlesSingleMatching() {
			function isTrue(x: boolean): boolean {
				return x === true
			}

			const result = none(isTrue)([true])

			assertEquals(result, false)
		},
	)

	await t.step(
		"handles single element not matching",
		function handlesSingleNotMatching() {
			function isTrue(x: boolean): boolean {
				return x === true
			}

			const result = none(isTrue)([false])

			assertEquals(result, true)
		},
	)

	await t.step(
		"handles large arrays efficiently",
		function handlesLargeArrays() {
			function isNegative(n: number): boolean {
				return n < 0
			}

			const largeArray = Array.from({ length: 10000 }, function createIndex(
				_,
				i,
			) {
				return i
			})

			const result = none(isNegative)(largeArray)

			assertEquals(result, true)
		},
	)
})

Deno.test(
	"none - property: opposite of some",
	function oppositeOfSome() {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.integer(),
				function propertyOppositeOfSome(arr, target) {
					function equalsTarget(n: number): boolean {
						return n === target
					}

					const noneResult = none(equalsTarget)(arr)
					const someResult = arr.some(function nativeSome(n) {
						return n === target
					})

					assertEquals(noneResult, !someResult)
				},
			),
		)
	},
)

Deno.test(
	"none - property: true if all elements fail predicate",
	function propertyAllFail() {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				function propertyNoneFail(arr) {
					function isNegative(n: number): boolean {
						return n < 0
					}

					const result = none(isNegative)(arr)
					const allNonNegative = arr.every(function everyNonNegative(n) {
						return n >= 0
					})

					assertEquals(result, allNonNegative)
				},
			),
		)
	},
)

Deno.test(
	"none - property: true for empty array with any predicate",
	function propertyTrueForEmpty() {
		fc.assert(
			fc.property(
				fc.func(fc.boolean()),
				function propertyEmptyTrue(predicateFn) {
					const result = none(predicateFn)([])

					assertEquals(result, true)
				},
			),
		)
	},
)

Deno.test(
	"none - property: none(p)(arr) === !arr.some(p)",
	function propertyNotSome() {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				function propertyEqualsNotSome(arr) {
					function isEven(n: number): boolean {
						return n % 2 === 0
					}

					const noneResult = none(isEven)(arr)
					const notSomeResult = !arr.some(function nativeSome(n) {
						return n % 2 === 0
					})

					assertEquals(noneResult, notSomeResult)
				},
			),
		)
	},
)
