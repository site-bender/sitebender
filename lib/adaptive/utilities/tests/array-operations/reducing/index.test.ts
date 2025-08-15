import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import * as fc from "fast-check"
import reduce from "../../../array/reduce/index.ts"

describe("Array Reducing Behaviors", () => {
	describe("when accumulating values", () => {
		it("sums numbers starting from zero", () => {
			const sum = (acc: number, n: number) => acc + n
			const sumFromZero = reduce(sum)(0)
			const result = sumFromZero([1, 2, 3, 4, 5])
			expect(result).toBe(15)
		})

		it("sums numbers starting from a non-zero value", () => {
			const sum = (acc: number, n: number) => acc + n
			const sumFrom10 = reduce(sum)(10)
			const result = sumFrom10([1, 2, 3])
			expect(result).toBe(16)
		})

		it("multiplies numbers starting from one", () => {
			const multiply = (acc: number, n: number) => acc * n
			const product = reduce(multiply)(1)
			const result = product([2, 3, 4])
			expect(result).toBe(24)
		})

		it("concatenates strings", () => {
			const concat = (acc: string, s: string) => acc + s
			const join = reduce(concat)("")
			const result = join(["hello", " ", "world"])
			expect(result).toBe("hello world")
		})

		it("concatenates strings with separator", () => {
			const joinWithComma = (acc: string, s: string) => 
				acc === "" ? s : acc + ", " + s
			const csvJoin = reduce(joinWithComma)("")
			const result = csvJoin(["apple", "banana", "cherry"])
			expect(result).toBe("apple, banana, cherry")
		})
	})

	describe("when building data structures", () => {
		it("builds an object from key-value pairs", () => {
			type KV = [string, number]
			const toObject = (acc: Record<string, number>, [k, v]: KV) => ({
				...acc,
				[k]: v
			})
			const buildObject = reduce(toObject)({})
			const result = buildObject([["a", 1], ["b", 2], ["c", 3]])
			expect(result).toEqual({ a: 1, b: 2, c: 3 })
		})

		it("groups items by a property", () => {
			type Item = { category: string; name: string }
			const groupBy = (acc: Record<string, string[]>, item: Item) => ({
				...acc,
				[item.category]: [...(acc[item.category] || []), item.name]
			})
			const group = reduce(groupBy)({})
			const items = [
				{ category: "fruit", name: "apple" },
				{ category: "fruit", name: "banana" },
				{ category: "vegetable", name: "carrot" }
			]
			const result = group(items)
			expect(result).toEqual({
				fruit: ["apple", "banana"],
				vegetable: ["carrot"]
			})
		})

		it("flattens nested arrays", () => {
			const flatten = (acc: number[], arr: number[]) => acc.concat(arr)
			const flat = reduce(flatten)([])
			const result = flat([[1, 2], [3, 4], [5]])
			expect(result).toEqual([1, 2, 3, 4, 5])
		})
	})

	describe("when computing statistics", () => {
		it("finds maximum value", () => {
			const max = (acc: number, n: number) => n > acc ? n : acc
			const findMax = reduce(max)(-Infinity)
			const result = findMax([3, 7, 2, 9, 1])
			expect(result).toBe(9)
		})

		it("finds minimum value", () => {
			const min = (acc: number, n: number) => n < acc ? n : acc
			const findMin = reduce(min)(Infinity)
			const result = findMin([3, 7, 2, 9, 1])
			expect(result).toBe(1)
		})

		it("counts occurrences", () => {
			const count = (acc: Record<string, number>, item: string) => ({
				...acc,
				[item]: (acc[item] || 0) + 1
			})
			const countItems = reduce(count)({})
			const result = countItems(["a", "b", "a", "c", "b", "a"])
			expect(result).toEqual({ a: 3, b: 2, c: 1 })
		})

		it("calculates average", () => {
			type Acc = { sum: number; count: number }
			const avgReducer = (acc: Acc, n: number) => ({
				sum: acc.sum + n,
				count: acc.count + 1
			})
			const calculateAvg = reduce(avgReducer)({ sum: 0, count: 0 })
			const result = calculateAvg([10, 20, 30, 40])
			const average = result.sum / result.count
			expect(average).toBe(25)
		})
	})

	describe("when filtering and transforming", () => {
		it("filters and maps in one pass", () => {
			const filterMap = (f: (n: number) => boolean) => (g: (n: number) => number) =>
				(acc: number[], n: number) => f(n) ? [...acc, g(n)] : acc
			const evenDoubled = reduce(filterMap(n => n % 2 === 0)(n => n * 2))([])
			const result = evenDoubled([1, 2, 3, 4, 5, 6])
			expect(result).toEqual([4, 8, 12])
		})

		it("takes while condition is true", () => {
			const takeWhile = (predicate: (n: number) => boolean) =>
				(acc: number[], n: number) => predicate(n) ? [...acc, n] : acc
			const takeLessThan5 = reduce(takeWhile(n => n < 5))([])
			const result = takeLessThan5([1, 3, 5, 2, 4, 6])
			expect(result).toEqual([1, 3, 2, 4])
		})
	})

	describe("when handling edge cases", () => {
		it("returns initial value for empty array", () => {
			const sum = (acc: number, n: number) => acc + n
			const sumFrom42 = reduce(sum)(42)
			const result = sumFrom42([])
			expect(result).toBe(42)
		})

		it("works with single element array", () => {
			const sum = (acc: number, n: number) => acc + n
			const sumFrom10 = reduce(sum)(10)
			const result = sumFrom10([5])
			expect(result).toBe(15)
		})

		it("preserves initial value type when array is empty", () => {
			const concat = (acc: string[], s: string) => [...acc, s]
			const build = reduce(concat)(["initial"])
			const result = build([])
			expect(result).toEqual(["initial"])
		})

		it("can use array index in reducer", () => {
			const withIndex = (acc: string[], item: string, index?: number) =>
				[...acc, `${index}: ${item}`]
			const indexed = reduce(withIndex)([])
			const result = indexed(["a", "b", "c"])
			expect(result).toEqual(["0: a", "1: b", "2: c"])
		})
	})

	describe("when using different types", () => {
		it("reduces array of strings to number", () => {
			const totalLength = (acc: number, s: string) => acc + s.length
			const getLength = reduce(totalLength)(0)
			const result = getLength(["hello", "world"])
			expect(result).toBe(10)
		})

		it("reduces array of numbers to string", () => {
			const stringify = (acc: string, n: number) => 
				acc + (acc ? "," : "") + n.toString()
			const join = reduce(stringify)("")
			const result = join([1, 2, 3])
			expect(result).toBe("1,2,3")
		})

		it("reduces array of objects to primitive", () => {
			type Person = { name: string; age: number }
			const totalAge = (acc: number, p: Person) => acc + p.age
			const sumAges = reduce(totalAge)(0)
			const people = [
				{ name: "Alice", age: 30 },
				{ name: "Bob", age: 25 },
				{ name: "Charlie", age: 35 }
			]
			const result = sumAges(people)
			expect(result).toBe(90)
		})
	})

	describe("when composing reducers", () => {
		it("can be partially applied and reused", () => {
			const sum = (acc: number, n: number) => acc + n
			const sumReducer = reduce(sum)
			
			const from0 = sumReducer(0)
			const from100 = sumReducer(100)
			
			const numbers = [1, 2, 3]
			expect(from0(numbers)).toBe(6)
			expect(from100(numbers)).toBe(106)
		})

		it("allows building specialized reducers", () => {
			const genericJoin = (sep: string) => 
				(acc: string, s: string) => acc + (acc ? sep : "") + s
			
			const commaJoin = reduce(genericJoin(", "))("")
			const dashJoin = reduce(genericJoin("-"))("")
			
			const words = ["apple", "banana", "cherry"]
			expect(commaJoin(words)).toBe("apple, banana, cherry")
			expect(dashJoin(words)).toBe("apple-banana-cherry")
		})
	})

	describe("property-based tests", () => {
		it("sum reduction equals expected total", () => {
			fc.assert(fc.property(
				fc.array(fc.integer()),
				(numbers) => {
					const sum = (acc: number, n: number) => acc + n
					const result = reduce(sum)(0)(numbers)
					const expected = numbers.reduce((a, b) => a + b, 0)
					expect(result).toBe(expected)
				}
			))
		})

		it("concatenation preserves all elements", () => {
			fc.assert(fc.property(
				fc.array(fc.string()),
				(strings) => {
					const concat = (acc: string, s: string) => acc + s
					const result = reduce(concat)("")(strings)
					const expected = strings.join("")
					expect(result).toBe(expected)
				}
			))
		})

		it("initial value affects result predictably", () => {
			fc.assert(fc.property(
				fc.array(fc.integer()),
				fc.integer(),
				(numbers, initial) => {
					const sum = (acc: number, n: number) => acc + n
					const result = reduce(sum)(initial)(numbers)
					const arraySum = numbers.reduce((a, b) => a + b, 0)
					expect(result).toBe(arraySum + initial)
				}
			))
		})

		it("preserves order of operations", () => {
			fc.assert(fc.property(
				fc.array(fc.string(), { minLength: 2, maxLength: 10 }),
				(strings) => {
					// String concatenation preserves order
					const concat = (acc: string, s: string) => acc + s
					const forward = reduce(concat)("")(strings)
					const backward = reduce(concat)("")([...strings].reverse())
					
					// Should be equal only if palindrome or all same
					const isPalindrome = strings.join("") === [...strings].reverse().join("")
					if (isPalindrome) {
						expect(forward).toBe(backward)
					} else {
						expect(forward).not.toBe(backward)
					}
				}
			))
		})

		it("identity element preserves array for list building", () => {
			fc.assert(fc.property(
				fc.array(fc.integer()),
				(numbers) => {
					const listBuilder = (acc: number[], n: number) => [...acc, n]
					const result = reduce(listBuilder)([])(numbers)
					expect(result).toEqual(numbers)
				}
			))
		})
	})
})