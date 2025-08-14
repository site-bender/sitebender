import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import pipe from "../../../functions/pipe/index.ts"

describe("Pipe Composition Behaviors", () => {
	describe("when composing functions", () => {
		it("applies functions left-to-right", () => {
			const add = (x: number) => x + 1
			const multiply = (x: number) => x * 2
			const subtract = (x: number) => x - 3
			
			const result = pipe([add, multiply, subtract])(5)
			// (5 + 1) * 2 - 3 = 6 * 2 - 3 = 12 - 3 = 9
			expect(result).toBe(9)
		})

		it("passes output of each function to next", () => {
			const toUpper = (s: string) => s.toUpperCase()
			const addExclamation = (s: string) => s + "!"
			const repeat = (s: string) => s + s
			
			const result = pipe([toUpper, addExclamation, repeat])("hello")
			// "hello" -> "HELLO" -> "HELLO!" -> "HELLO!HELLO!"
			expect(result).toBe("HELLO!HELLO!")
		})

		it("handles single function", () => {
			const double = (x: number) => x * 2
			const result = pipe([double])(5)
			expect(result).toBe(10)
		})

		it("handles empty function array (identity)", () => {
			const result = pipe([])(42)
			expect(result).toBe(42)
			
			const str = pipe([])("hello")
			expect(str).toBe("hello")
			
			const obj = { a: 1 }
			const objResult = pipe([])(obj)
			expect(objResult).toBe(obj)
		})

		it("maintains type safety through composition", () => {
			const stringToNumber = (s: string) => s.length
			const numberToBoolean = (n: number) => n > 5
			const booleanToString = (b: boolean) => b ? "yes" : "no"
			
			const result = pipe([stringToNumber, numberToBoolean, booleanToString])("hello world")
			expect(result).toBe("yes")
		})

		it("works with array methods", () => {
			const nums = [1, 2, 3, 4, 5]
			const filterEven = (arr: Array<number>) => arr.filter(x => x % 2 === 0)
			const double = (arr: Array<number>) => arr.map(x => x * 2)
			const sum = (arr: Array<number>) => arr.reduce((a, b) => a + b, 0)
			
			const result = pipe([filterEven, double, sum])(nums)
			// [1,2,3,4,5] -> [2,4] -> [4,8] -> 12
			expect(result).toBe(12)
		})

		it("handles async functions", async () => {
			const asyncAdd = async (x: number) => x + 1
			const asyncMultiply = async (x: number) => x * 2
			
			const composed = pipe([asyncAdd, asyncMultiply])
			const result = await composed(5)
			expect(result).toBe(12)
		})

		it("preserves this context", () => {
			const obj = {
				value: 10,
				add: function(x: number) { return x + this.value },
				multiply: function(x: number) { return x * this.value },
			}
			
			const boundAdd = obj.add.bind(obj)
			const boundMultiply = obj.multiply.bind(obj)
			
			const result = pipe([boundAdd, boundMultiply])(5)
			// (5 + 10) * 10 = 15 * 10 = 150
			expect(result).toBe(150)
		})

		it("handles functions that return undefined", () => {
			let sideEffect = 0
			const increment = () => { sideEffect++ }
			const returnValue = () => 42
			
			const result = pipe([increment, returnValue])()
			expect(sideEffect).toBe(1)
			expect(result).toBe(42)
		})

		it("can be partially applied", () => {
			const add = (x: number) => x + 1
			const multiply = (x: number) => x * 2
			
			const pipeline = pipe([add, multiply])
			
			expect(pipeline(5)).toBe(12)
			expect(pipeline(10)).toBe(22)
			expect(pipeline(0)).toBe(2)
		})
	})

	describe("practical use cases", () => {
		it("data transformation pipeline", () => {
			interface User {
				name: string
				age: number
				email: string
			}
			
			const users: Array<User> = [
				{ name: "Alice", age: 25, email: "alice@example.com" },
				{ name: "Bob", age: 17, email: "bob@example.com" },
				{ name: "Charlie", age: 30, email: "charlie@example.com" },
			]
			
			const filterAdults = (users: Array<User>) => users.filter(u => u.age >= 18)
			const sortByAge = (users: Array<User>) => [...users].sort((a, b) => a.age - b.age)
			const getNames = (users: Array<User>) => users.map(u => u.name)
			const joinNames = (names: Array<string>) => names.join(", ")
			
			const result = pipe([filterAdults, sortByAge, getNames, joinNames])(users)
			expect(result).toBe("Alice, Charlie")
		})

		it("string processing pipeline", () => {
			const trim = (s: string) => s.trim()
			const lowercase = (s: string) => s.toLowerCase()
			const removeSpaces = (s: string) => s.replace(/\s+/g, "-")
			const addPrefix = (s: string) => "slug-" + s
			
			const slugify = pipe([trim, lowercase, removeSpaces, addPrefix])
			
			expect(slugify("  Hello World  ")).toBe("slug-hello-world")
			expect(slugify("Test Case")).toBe("slug-test-case")
		})

		it("validation pipeline", () => {
			const isNotEmpty = (s: string) => s.length > 0 ? s : null
			const isEmail = (s: string | null) => s && s.includes("@") ? s : null
			const normalize = (s: string | null) => s ? s.toLowerCase().trim() : null
			
			const validateEmail = pipe([isNotEmpty, isEmail, normalize])
			
			expect(validateEmail("USER@EXAMPLE.COM ")).toBe("user@example.com")
			expect(validateEmail("")).toBeNull()
			expect(validateEmail("notanemail")).toBeNull()
		})

		it("mathematical operations", () => {
			const square = (x: number) => x * x
			const halve = (x: number) => x / 2
			const floor = Math.floor
			const abs = Math.abs
			
			const compute = pipe([square, halve, floor, abs])
			
			expect(compute(5)).toBe(12) // 25 / 2 = 12.5 -> 12
			expect(compute(-3)).toBe(4) // 9 / 2 = 4.5 -> 4
		})
	})

	describe("error handling", () => {
		it("propagates errors through pipeline", () => {
			const throwError = () => { throw new Error("Pipeline error") }
			const neverReached = (x: any) => x + 1
			
			const pipeline = pipe([throwError, neverReached])
			
			expect(() => pipeline(5)).toThrow("Pipeline error")
		})

		it("handles try-catch in individual functions", () => {
			const mightFail = (x: number) => {
				if (x < 0) throw new Error("Negative")
				return x
			}
			const safeDouble = (x: number) => {
				try {
					return mightFail(x) * 2
				} catch {
					return 0
				}
			}
			
			const pipeline = pipe([safeDouble])
			
			expect(pipeline(5)).toBe(10)
			expect(pipeline(-5)).toBe(0)
		})
	})
})