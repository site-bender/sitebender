import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"

import _hasReturnArrowPattern from "./index.ts"

Deno.test("_hasReturnArrowPattern - detects simple arrow function returns", () => {
	assertEquals(
		_hasReturnArrowPattern("return (x) => x + 1"),
		true,
	)
	assertEquals(
		_hasReturnArrowPattern("return (value) => value * 2"),
		true,
	)
	assertEquals(
		_hasReturnArrowPattern("return () => 42"),
		true,
	)
})

Deno.test("_hasReturnArrowPattern - detects typed arrow function returns", () => {
	assertEquals(
		_hasReturnArrowPattern("return (x: number) => x + 1"),
		true,
	)
	assertEquals(
		_hasReturnArrowPattern("return (str: string) => str.length"),
		true,
	)
	assertEquals(
		_hasReturnArrowPattern("return (arr: Array<T>) => arr.map(fn)"),
		true,
	)
})

Deno.test("_hasReturnArrowPattern - detects multi-parameter arrow functions", () => {
	assertEquals(
		_hasReturnArrowPattern("return (a, b) => a + b"),
		true,
	)
	assertEquals(
		_hasReturnArrowPattern("return (x: number, y: number) => x * y"),
		true,
	)
	assertEquals(
		_hasReturnArrowPattern("return (fn: Function, arr: any[]) => arr.map(fn)"),
		true,
	)
})

Deno.test("_hasReturnArrowPattern - detects with whitespace variations", () => {
	assertEquals(
		_hasReturnArrowPattern("return  (x)  =>  x"),
		true,
	)
	assertEquals(
		_hasReturnArrowPattern("return\t(x)\t=>\tx"),
		true,
	)
	assertEquals(
		_hasReturnArrowPattern("return\n(x)\n=>\nx"),
		true,
	)
	assertEquals(
		_hasReturnArrowPattern("return ( x ) => x"),
		true,
	)
})

Deno.test("_hasReturnArrowPattern - detects in multiline content", () => {
	const content1 = `
		function curried(x) {
			return (y) => x + y
		}
	`
	assertEquals(_hasReturnArrowPattern(content1), true)

	const content2 = `
		export default function map(fn) {
			// This returns a function
			return (array) => array.map(fn)
		}
	`
	assertEquals(_hasReturnArrowPattern(content2), true)
})

Deno.test("_hasReturnArrowPattern - returns false for non-arrow returns", () => {
	assertEquals(
		_hasReturnArrowPattern("return x + 1"),
		false,
	)
	assertEquals(
		_hasReturnArrowPattern("return function(x) { return x }"),
		false,
	)
	assertEquals(
		_hasReturnArrowPattern("return value"),
		false,
	)
	assertEquals(
		_hasReturnArrowPattern("return { key: value }"),
		false,
	)
})

Deno.test("_hasReturnArrowPattern - returns false when no return statement", () => {
	assertEquals(
		_hasReturnArrowPattern("const fn = (x) => x"),
		false,
	)
	assertEquals(
		_hasReturnArrowPattern("(x) => x + 1"),
		false,
	)
	assertEquals(
		_hasReturnArrowPattern("function test() { console.log('test') }"),
		false,
	)
})

Deno.test("_hasReturnArrowPattern - returns false for arrow without parentheses", () => {
	// The pattern specifically looks for parentheses
	assertEquals(
		_hasReturnArrowPattern("return x => x + 1"),
		false,
	)
	assertEquals(
		_hasReturnArrowPattern("return value => value * 2"),
		false,
	)
})

Deno.test("_hasReturnArrowPattern - handles complex parameter patterns", () => {
	assertEquals(
		_hasReturnArrowPattern("return ({ x, y }) => x + y"),
		true,
	)
	assertEquals(
		_hasReturnArrowPattern("return ([a, b]: [number, number]) => a + b"),
		true,
	)
	assertEquals(
		_hasReturnArrowPattern("return (...args: any[]) => args.length"),
		true,
	)
})

Deno.test("_hasReturnArrowPattern - detects pattern even in comments", () => {
	// The function doesn't strip comments, so it will detect the pattern
	assertEquals(
		_hasReturnArrowPattern("// return (x) => x"),
		true,
	)
	assertEquals(
		_hasReturnArrowPattern("/* return (x) => x */"),
		true,
	)
})

Deno.test("_hasReturnArrowPattern - detects first match in multiple returns", () => {
	const content = `
		function example() {
			if (condition) {
				return false
			}
			return (x) => x + 1
		}
	`
	assertEquals(_hasReturnArrowPattern(content), true)
})

Deno.test("_hasReturnArrowPattern - does not match generics without parentheses after", () => {
	// Pattern requires parentheses immediately after return, generics come before parens
	assertEquals(
		_hasReturnArrowPattern("return <T>(x: T) => x"),
		false,
	)
	assertEquals(
		_hasReturnArrowPattern("return <T, U>(fn: (t: T) => U) => fn"),
		false,
	)
})
