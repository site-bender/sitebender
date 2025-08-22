import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import add from "../../../../../src/simple/math/add/index.ts"
import divide from "../../../../../src/simple/math/divide/index.ts"
import pipe from "../../../../../src/simple/combinator/pipe/index.ts"

Deno.test("pipe - empty pipeline returns input unchanged", () => {
	const emptyPipe = pipe([])
	
	assertEquals(emptyPipe(5), 5)
	assertEquals(emptyPipe("hello"), "hello")
	assertEquals(emptyPipe(null), null)
	assertEquals(emptyPipe(undefined), undefined)
	assertEquals(emptyPipe({ a: 1 }), { a: 1 })
})

Deno.test("pipe - single function pipeline", () => {
	const double = (x: number) => x * 2
	const pipeline = pipe([double])
	
	assertEquals(pipeline(5), 10)
	assertEquals(pipeline(0), 0)
	assertEquals(pipeline(-3), -6)
})

Deno.test("pipe - two function composition", () => {
	const double = (x: number) => x * 2
	const addOne = (x: number) => x + 1
	
	const pipeline = pipe([double, addOne])
	
	assertEquals(pipeline(5), 11) // (5 * 2) + 1
	assertEquals(pipeline(0), 1)  // (0 * 2) + 1
	assertEquals(pipeline(-3), -5) // (-3 * 2) + 1
})

Deno.test("pipe - left-to-right composition order", () => {
	const addA = (s: string) => s + "A"
	const addB = (s: string) => s + "B"
	const addC = (s: string) => s + "C"
	
	const pipeline = pipe([addA, addB, addC])
	
	assertEquals(pipeline(""), "ABC")
	assertEquals(pipeline("X"), "XABC")
})

Deno.test("pipe - type transformations", () => {
	const toString = (n: number) => n.toString()
	const getLength = (s: string) => s.length
	const isEven = (n: number) => n % 2 === 0
	
	const pipeline = pipe([toString, getLength, isEven])
	
	assertEquals(pipeline(5), false)    // "5" -> 1 -> false
	assertEquals(pipeline(10), true)    // "10" -> 2 -> true
	assertEquals(pipeline(100), false)  // "100" -> 3 -> false
	assertEquals(pipeline(1000), true)  // "1000" -> 4 -> true
})

Deno.test("pipe - with curried functions", () => {
	const add5 = add(5)
	const divideBy2 = (n: number) => divide(n)(2)
	const multiplyBy3 = (n: number) => n * 3
	
	const pipeline = pipe([add5, divideBy2, multiplyBy3])
	
	assertEquals(pipeline(10), 22.5) // ((10 + 5) / 2) * 3 = 7.5 * 3
	assertEquals(pipeline(0), 7.5)   // ((0 + 5) / 2) * 3 = 2.5 * 3
})

Deno.test("pipe - associativity with nested pipes", () => {
	const f = (x: number) => x + 1
	const g = (x: number) => x * 2
	const h = (x: number) => x - 3
	
	// pipe([f, g, h]) should equal pipe([f, pipe([g, h])])
	const pipeline1 = pipe([f, g, h])
	const pipeline2 = pipe([f, pipe([g, h])])
	
	fc.assert(
		fc.property(fc.integer({ min: -100, max: 100 }), (x) => {
			return pipeline1(x) === pipeline2(x)
		}),
		{ numRuns: 100 }
	)
})

Deno.test("pipe - error propagation", () => {
	const throwError = () => {
		throw new Error("Test error")
	}
	const neverCalled = (x: number) => x * 2
	
	const pipeline = pipe([throwError, neverCalled])
	
	try {
		pipeline(5)
		assertEquals(true, false, "Should have thrown")
	} catch (e) {
		assertEquals(e.message, "Test error")
	}
})

Deno.test("pipe - NaN propagation in numeric pipelines", () => {
	const addOne = (x: number) => x + 1
	const double = (x: number) => x * 2
	const divideBy3 = (x: number) => x / 3
	
	const pipeline = pipe([addOne, double, divideBy3])
	
	assertEquals(Number.isNaN(pipeline(NaN)), true)
})

Deno.test("pipe - null/undefined handling", () => {
	const getProperty = (obj: any) => obj?.value
	const addExclamation = (s: string | undefined) => s ? s + "!" : undefined
	const toUpper = (s: string | undefined) => s?.toUpperCase()
	
	const pipeline = pipe([getProperty, addExclamation, toUpper])
	
	assertEquals(pipeline({ value: "hello" }), "HELLO!")
	assertEquals(pipeline({ value: null }), undefined)
	assertEquals(pipeline({}), undefined)
	assertEquals(pipeline(null), undefined)
})

Deno.test("pipe - long pipeline composition", () => {
	const increment = (x: number) => x + 1
	
	// Create a pipeline of 10 increment functions
	const pipeline = pipe(Array(10).fill(increment))
	
	assertEquals(pipeline(0), 10)
	assertEquals(pipeline(5), 15)
	assertEquals(pipeline(-10), 0)
})

Deno.test("pipe - property: identity with empty array", () => {
	fc.assert(
		fc.property(fc.anything(), (value) => {
			const result = pipe([])(value)
			return Object.is(result, value) || 
				(result !== null && typeof result === 'object' && 
				JSON.stringify(result) === JSON.stringify(value))
		}),
		{ numRuns: 100 }
	)
})

Deno.test("pipe - property: composition order matters", () => {
	const subtract5 = (x: number) => x - 5
	const multiply2 = (x: number) => x * 2
	
	const pipeline1 = pipe([subtract5, multiply2])
	const pipeline2 = pipe([multiply2, subtract5])
	
	fc.assert(
		fc.property(
			fc.integer({ min: -100, max: 100 }).filter(x => x !== 5/2),
			(x) => {
				// These should generally not be equal (unless x = 5/2)
				return pipeline1(x) !== pipeline2(x)
			}
		),
		{ numRuns: 100 }
	)
})

Deno.test("pipe - practical examples", () => {
	// Data transformation pipeline
	const processUser = pipe([
		(user: { name: string; age: number }) => ({
			...user,
			name: user.name.trim(),
		}),
		(user: { name: string; age: number }) => ({
			...user,
			name: user.name.toUpperCase(),
		}),
		(user: { name: string; age: number }) => ({
			...user,
			isAdult: user.age >= 18,
		}),
	])
	
	assertEquals(
		processUser({ name: "  john doe  ", age: 25 }),
		{ name: "JOHN DOE", age: 25, isAdult: true }
	)
	
	// String processing pipeline
	const cleanString = pipe([
		(s: string) => s.trim(),
		(s: string) => s.toLowerCase(),
		(s: string) => s.replace(/\s+/g, " "),
	])
	
	assertEquals(cleanString("  Hello   World  "), "hello world")
	
	// Mathematical calculation pipeline
	const calculate = pipe([
		(n: number) => n + 10,
		(n: number) => n * 2,
		(n: number) => n - 5,
		Math.floor,
	])
	
	assertEquals(calculate(7.5), 30) // ((7.5 + 10) * 2) - 5 = 30
})