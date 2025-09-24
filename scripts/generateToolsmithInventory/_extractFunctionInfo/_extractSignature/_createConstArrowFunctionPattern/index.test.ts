import {
	assertEquals,
	assertMatch,
} from "https://deno.land/std@0.208.0/assert/mod.ts"

import _createConstArrowFunctionPattern from "./index.ts"

Deno.test("_createConstArrowFunctionPattern - matches basic arrow function", () => {
	const pattern = _createConstArrowFunctionPattern("myFunction")
	const code = "const myFunction = () => { return 42; }"
	assertMatch(code, pattern)
})

Deno.test("_createConstArrowFunctionPattern - matches arrow function with parameters", () => {
	const pattern = _createConstArrowFunctionPattern("add")
	const code = "const add = (a, b) => a + b"
	assertMatch(code, pattern)
})

Deno.test("_createConstArrowFunctionPattern - matches arrow function with typed parameters", () => {
	const pattern = _createConstArrowFunctionPattern("greet")
	const code = "const greet = (name: string, age: number) => `Hello ${name}`"
	assertMatch(code, pattern)
})

Deno.test("_createConstArrowFunctionPattern - matches with extra whitespace", () => {
	const pattern = _createConstArrowFunctionPattern("process")
	const code = "const   process   =   (  data  )   =>   { return data; }"
	assertMatch(code, pattern)
})

Deno.test("_createConstArrowFunctionPattern - matches multiline arrow function", () => {
	const pattern = _createConstArrowFunctionPattern("calculate")
	const code = `const calculate = (
		x: number,
		y: number
	) => {
		return x + y;
	}`
	assertMatch(code, pattern)
})

Deno.test("_createConstArrowFunctionPattern - does not match regular function", () => {
	const pattern = _createConstArrowFunctionPattern("myFunction")
	const code = "function myFunction() { return 42; }"
	assertEquals(pattern.test(code), false)
})

Deno.test("_createConstArrowFunctionPattern - does not match different function name", () => {
	const pattern = _createConstArrowFunctionPattern("myFunction")
	const code = "const otherFunction = () => { return 42; }"
	assertEquals(pattern.test(code), false)
})

Deno.test("_createConstArrowFunctionPattern - does not match let arrow function", () => {
	const pattern = _createConstArrowFunctionPattern("myFunction")
	const code = "let myFunction = () => { return 42; }"
	assertEquals(pattern.test(code), false)
})

Deno.test("_createConstArrowFunctionPattern - does not match var arrow function", () => {
	const pattern = _createConstArrowFunctionPattern("myFunction")
	const code = "var myFunction = () => { return 42; }"
	assertEquals(pattern.test(code), false)
})

Deno.test("_createConstArrowFunctionPattern - matches arrow function with destructured params", () => {
	const pattern = _createConstArrowFunctionPattern("extract")
	const code = "const extract = ({ name, age }) => name"
	assertMatch(code, pattern)
})

Deno.test("_createConstArrowFunctionPattern - matches arrow function with rest params", () => {
	const pattern = _createConstArrowFunctionPattern("collect")
	const code = "const collect = (...args) => args"
	assertMatch(code, pattern)
})

Deno.test("_createConstArrowFunctionPattern - matches arrow function with default params", () => {
	const pattern = _createConstArrowFunctionPattern("greet")
	const code = "const greet = (name = 'World') => `Hello ${name}`"
	assertMatch(code, pattern)
})

Deno.test("_createConstArrowFunctionPattern - pattern has multiline flag", () => {
	const pattern = _createConstArrowFunctionPattern("test")
	assertEquals(pattern.flags.includes("s"), true)
})

Deno.test("_createConstArrowFunctionPattern - escapes special regex characters in name", () => {
	// Function now properly escapes special regex characters
	const pattern = _createConstArrowFunctionPattern("test$pecial")
	const code = "const test$pecial = () => true"
	assertMatch(code, pattern)
})

Deno.test("_createConstArrowFunctionPattern - escapes dots in function name", () => {
	const pattern = _createConstArrowFunctionPattern("test.special")
	const code = "const test.special = () => true"
	assertMatch(code, pattern)

	// Should not match without the dot
	const wrongCode = "const testXspecial = () => true"
	assertEquals(pattern.test(wrongCode), false)
})

Deno.test("_createConstArrowFunctionPattern - escapes brackets in function name", () => {
	const pattern = _createConstArrowFunctionPattern("test[0]")
	const code = "const test[0] = () => true"
	assertMatch(code, pattern)
})

Deno.test("_createConstArrowFunctionPattern - escapes parentheses in function name", () => {
	const pattern = _createConstArrowFunctionPattern("test()")
	const code = "const test() = () => true"
	assertMatch(code, pattern)
})

Deno.test("_createConstArrowFunctionPattern - escapes plus sign in function name", () => {
	const pattern = _createConstArrowFunctionPattern("test+plus")
	const code = "const test+plus = () => true"
	assertMatch(code, pattern)
})

Deno.test("_createConstArrowFunctionPattern - escapes asterisk in function name", () => {
	const pattern = _createConstArrowFunctionPattern("test*star")
	const code = "const test*star = () => true"
	assertMatch(code, pattern)
})

Deno.test("_createConstArrowFunctionPattern - matches with newline before arrow", () => {
	const pattern = _createConstArrowFunctionPattern("multiline")
	const code = `const multiline = (param: string)
		=> param.toUpperCase()`
	assertMatch(code, pattern)
})

Deno.test("_createConstArrowFunctionPattern - matches empty parameter list", () => {
	const pattern = _createConstArrowFunctionPattern("noop")
	const code = "const noop = () => {}"
	assertMatch(code, pattern)
})

Deno.test("_createConstArrowFunctionPattern - does not match partial name match", () => {
	const pattern = _createConstArrowFunctionPattern("test")
	const code = "const testFunction = () => {}"
	assertEquals(pattern.test(code), false)
})

Deno.test("_createConstArrowFunctionPattern - does not match if name is substring", () => {
	const pattern = _createConstArrowFunctionPattern("Function")
	const code = "const myFunction = () => {}"
	assertEquals(pattern.test(code), false)
})
