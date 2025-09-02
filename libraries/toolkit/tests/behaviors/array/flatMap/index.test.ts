import { assert, assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"
import * as fc from "fast-check"

import flatMap from "../../../../src/simple/array/flatMap/index.ts"

describe("flatMap", () => {
	it("maps and flattens one level", () => {
		const doubleAndTriple = (n: number) => [n * 2, n * 3]
		const result = flatMap(doubleAndTriple)([1, 2, 3])
		assertEquals(result, [2, 3, 4, 6, 6, 9])
	})

	it("splits strings into characters", () => {
		const splitString = (s: string) => s.split("")
		const result = flatMap(splitString)(["hi", "bye"])
		assertEquals(result, ["h", "i", "b", "y", "e"])
	})

	it("filters while mapping using empty arrays", () => {
		const doublePositives = (n: number) => n > 0 ? [n * 2] : []
		const result = flatMap(doublePositives)([1, -2, 3, 0, -4, 5])
		assertEquals(result, [2, 6, 10])
	})

	it("expands elements to multiple items", () => {
		const repeat = (n: number) => Array(n).fill(n)
		const result = flatMap(repeat)([1, 2, 3])
		assertEquals(result, [1, 2, 2, 3, 3, 3])
	})

	it("handles empty array", () => {
		const double = (n: number) => [n * 2]
		const result = flatMap(double)([])
		assertEquals(result, [])
	})

	it("handles single element array", () => {
		const duplicate = (x: string) => [x, x]
		const result = flatMap(duplicate)(["a"])
		assertEquals(result, ["a", "a"])
	})

	it("flattens only one level", () => {
		const nestDeep = (n: number) => [[n, [n * 2]]]
		const result = flatMap(nestDeep)([1, 2])
		assertEquals(result, [[1, [2]], [2, [4]]])
	})

	it("works with non-array return values", () => {
		const identity = (x: number) => x
		const result = flatMap(identity)([1, 2, 3])
		assertEquals(result, [1, 2, 3])
	})

	it("provides index to mapper function", () => {
		const withIndex = (_: number, i: number) => [i, i * 2]
		const result = flatMap(withIndex)([10, 20, 30])
		assertEquals(result, [0, 0, 1, 2, 2, 4])
	})

	it("provides array to mapper function", () => {
		const withArray = (x: number, _: number, arr: Array<number>) => [x, arr.length]
		const result = flatMap(withArray)([1, 2, 3])
		assertEquals(result, [1, 3, 2, 3, 3, 3])
	})

	it("handles mixed return types", () => {
		const mixed = (n: number) => n % 2 === 0 ? [n, n * 2] : n * 3
		const result = flatMap(mixed)([1, 2, 3, 4])
		assertEquals(result, [3, 2, 4, 9, 4, 8])
	})

	it("handles null and undefined in arrays", () => {
		const handleNull = (x: number | null | undefined): Array<number | string> => 
			x === null ? ["null"] : x === undefined ? ["undefined"] : [x]
		const result = flatMap(handleNull)([1, null, undefined, 2])
		assertEquals(result, [1, "null", "undefined", 2])
	})

	it("works with objects", () => {
		type Person = { name: string; pets: Array<string> }
		const getPets = (p: Person) => p.pets
		const people: Array<Person> = [
			{ name: "Alice", pets: ["cat", "dog"] },
			{ name: "Bob", pets: [] },
			{ name: "Charlie", pets: ["fish"] }
		]
		const result = flatMap(getPets)(people)
		assertEquals(result, ["cat", "dog", "fish"])
	})

	it("handles string arrays", () => {
		const addSuffix = (s: string) => [s + "!", s + "?"]
		const result = flatMap(addSuffix)(["hello", "world"])
		assertEquals(result, ["hello!", "hello?", "world!", "world?"])
	})

	it("handles boolean arrays", () => {
		const expandBool = (b: boolean) => b ? ["yes", "true"] : ["no", "false"]
		const result = flatMap(expandBool)([true, false, true])
		assertEquals(result, ["yes", "true", "no", "false", "yes", "true"])
	})

	it("handles large arrays efficiently", () => {
		const duplicate = (n: number) => [n, n]
		const largeArray = Array.from({ length: 1000 }, (_, i) => i)
		const result = flatMap(duplicate)(largeArray)
		assertEquals(result.length, 2000)
		assertEquals(result[0], 0)
		assertEquals(result[1], 0)
		assertEquals(result[1998], 999)
		assertEquals(result[1999], 999)
	})

	it("preserves order of operations", () => {
		const operations: Array<string> = []
		const track = (n: number) => {
			operations.push(`process-${n}`)
			return [n * 2]
		}
		flatMap(track)([1, 2, 3])
		assertEquals(operations, ["process-1", "process-2", "process-3"])
	})

	it("is curried", () => {
		const double = (n: number) => [n * 2]
		const flatMapDouble = flatMap(double)
		assert(typeof flatMapDouble === "function")
		assertEquals(flatMapDouble([1, 2]), [2, 4])
		assertEquals(flatMapDouble([3, 4]), [6, 8])
	})

	// Property-based tests
	describe("property tests", () => {
		it("flatMap(x => [x]) is identity", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					(arr) => {
						const identity = <T>(x: T) => [x]
						const result = flatMap(identity)(arr)
						assertEquals(result, arr)
					}
				),
				{ numRuns: 100 }
			)
		})

		it("flatMap(f) on empty array returns empty array", () => {
			fc.assert(
				fc.property(
					fc.func(fc.array(fc.anything())),
					(f) => {
						const result = flatMap(f)([])
						assertEquals(result, [])
					}
				),
				{ numRuns: 100 }
			)
		})

		it("length of result is sum of lengths of mapped arrays", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 10 })),
					(arr) => {
						const repeat = (n: number) => Array(n).fill(n)
						const result = flatMap(repeat)(arr)
						const expectedLength = arr.reduce((sum, n) => sum + n, 0)
						assertEquals(result.length, expectedLength)
					}
				),
				{ numRuns: 100 }
			)
		})

		it("flatMap preserves order", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(arr) => {
						const tagAndDouble = (n: number, i: number) => [`${i}-a`, `${i}-b`]
						const result = flatMap(tagAndDouble)(arr)
						
						// Check that items from earlier indices come before items from later indices
						for (let i = 0; i < result.length - 2; i += 2) {
							const currentIndex = parseInt(result[i].split("-")[0])
							const nextIndex = parseInt(result[i + 2].split("-")[0])
							assert(currentIndex <= nextIndex)
						}
					}
				),
				{ numRuns: 100 }
			)
		})

		it("flatMap with constant function produces repeated values", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.anything(),
					(arr, constant) => {
						if (arr.length === 0) return
						const constantFunc = () => [constant]
						const result = flatMap(constantFunc)(arr)
						assertEquals(result.length, arr.length)
						result.forEach(item => assertEquals(item, constant))
					}
				),
				{ numRuns: 100 }
			)
		})
	})
})