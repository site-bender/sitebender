import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import pipe from "./index.ts"

//++ Tests for pipe (left-to-right function composition)

//++ Basic pipe tests

Deno.test("pipe with two functions", function testPipeTwoFunctions() {
	function double(x: number): number {
		return x * 2
	}

	function addTen(x: number): number {
		return x + 10
	}

	const result = pipe<number, number>([double, addTen])(5)

	assertEquals(result, 20) // 5 * 2 = 10, then 10 + 10 = 20
})

Deno.test("pipe with three functions", function testPipeThreeFunctions() {
	function double(x: number): number {
		return x * 2
	}

	function addTen(x: number): number {
		return x + 10
	}

	function square(x: number): number {
		return x * x
	}

	const result = pipe<number, number>([double, addTen, square])(5)

	assertEquals(result, 400) // 5 * 2 = 10, then 10 + 10 = 20, then 20 * 20 = 400
})

Deno.test("pipe with empty array acts as identity", function testPipeEmpty() {
	const result = pipe<number, number>([])(42)

	assertEquals(result, 42)
})

Deno.test("pipe with single function", function testPipeSingle() {
	function double(x: number): number {
		return x * 2
	}

	const result = pipe<number, number>([double])(21)

	assertEquals(result, 42)
})

Deno.test("pipe with type transformations", function testPipeTypeTransform() {
	function numberToString(x: number): string {
		return String(x)
	}

	function addExclamation(s: string): string {
		return s + "!"
	}

	function toUpperCase(s: string): string {
		return s.toUpperCase()
	}

	const result = pipe<number, string>([
		numberToString,
		addExclamation,
		toUpperCase,
	])(42)

	assertEquals(result, "42!")
})

Deno.test("pipe with string operations", function testPipeStrings() {
	function trim(s: string): string {
		return s.trim()
	}

	function toUpperCase(s: string): string {
		return s.toUpperCase()
	}

	function addPrefix(s: string): string {
		return "HELLO " + s
	}

	const result = pipe<string, string>([trim, toUpperCase, addPrefix])(
		"  world  ",
	)

	assertEquals(result, "HELLO WORLD")
})

Deno.test("pipe with array operations", function testPipeArrays() {
	function doubleAll(arr: ReadonlyArray<number>): ReadonlyArray<number> {
		return arr.map(function doubleElement(x: number): number {
			return x * 2
		})
	}

	function filterEven(arr: ReadonlyArray<number>): ReadonlyArray<number> {
		return arr.filter(function isEven(x: number): boolean {
			return x % 2 === 0
		})
	}

	function sum(arr: ReadonlyArray<number>): number {
		return arr.reduce(function add(acc: number, x: number): number {
			return acc + x
		}, 0)
	}

	const result = pipe<ReadonlyArray<number>, number>([
		doubleAll,
		filterEven,
		sum,
	])([1, 2, 3, 4, 5])

	assertEquals(result, 30) // [2,4,6,8,10] -> all even -> 2+4+6+8+10 = 30
})

Deno.test("pipe preserves function execution order", function testPipeOrder() {
	const operations: Array<string> = []

	function first(x: number): number {
		operations.push("first")
		return x + 1
	}

	function second(x: number): number {
		operations.push("second")
		return x * 2
	}

	function third(x: number): number {
		operations.push("third")
		return x - 3
	}

	pipe<number, number>([first, second, third])(10)

	assertEquals(operations, ["first", "second", "third"])
})

//++ Property-based tests

Deno.test("pipe with identity function returns input", function testPipeIdentityProperty() {
	fc.assert(
		fc.property(fc.integer(), function propertyPipeIdentity(n: number) {
			function identity(x: number): number {
				return x
			}

			const result = pipe<number, number>([identity])(n)
			assertEquals(result, n)
		}),
	)
})

Deno.test("pipe composition is associative", function testPipeAssociativity() {
	fc.assert(
		fc.property(fc.integer(), function propertyPipeAssociative(n: number) {
			function addOne(x: number): number {
				return x + 1
			}

			function double(x: number): number {
				return x * 2
			}

			function square(x: number): number {
				return x * x
			}

			// pipe([f, g, h]) should equal pipe([f, pipe([g, h])])
			const result1 = pipe<number, number>([addOne, double, square])(n)
			const composed = pipe<number, number>([double, square])
			const result2 = pipe<number, number>([addOne, composed])(n)

			assertEquals(result1, result2)
		}),
	)
})

Deno.test("pipe with multiple additions is commutative sum", function testPipeAdditions() {
	fc.assert(
		fc.property(
			fc.integer(),
			fc.integer(),
			fc.integer(),
			function propertyPipeSum(n: number, a: number, b: number) {
				function addA(x: number): number {
					return x + a
				}

				function addB(x: number): number {
					return x + b
				}

				const result1 = pipe<number, number>([addA, addB])(n)
				const result2 = pipe<number, number>([addB, addA])(n)

				assertEquals(result1, result2) // Addition is commutative
			},
		),
	)
})
