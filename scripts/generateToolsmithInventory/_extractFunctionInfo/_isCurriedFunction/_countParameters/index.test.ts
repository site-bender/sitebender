import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"

import _countParameters from "./index.ts"

Deno.test("_countParameters - counts zero parameters", () => {
	const result = _countParameters("")
	assertEquals(result, 0)
})

Deno.test("_countParameters - counts single simple parameter", () => {
	const result = _countParameters("x")
	assertEquals(result, 1)
})

Deno.test("_countParameters - counts single typed parameter", () => {
	const result = _countParameters("x: number")
	assertEquals(result, 1)
})

Deno.test("_countParameters - counts two parameters", () => {
	const result = _countParameters("a, b")
	assertEquals(result, 2)
})

Deno.test("_countParameters - counts two typed parameters", () => {
	const result = _countParameters("a: string, b: number")
	assertEquals(result, 2)
})

Deno.test("_countParameters - counts three parameters", () => {
	const result = _countParameters("x, y, z")
	assertEquals(result, 3)
})

Deno.test("_countParameters - handles destructured object as single parameter", () => {
	const result = _countParameters("{ name, age }: User")
	assertEquals(result, 1)
})

Deno.test("_countParameters - handles nested destructuring as single parameter", () => {
	const result = _countParameters("{ user: { name, age }, config }: Options")
	assertEquals(result, 1)
})

Deno.test("_countParameters - handles array destructuring as single parameter", () => {
	const result = _countParameters("[first, second, third]: string[]")
	assertEquals(result, 1)
})

Deno.test("_countParameters - handles mixed destructuring with regular params", () => {
	const result = _countParameters("{ name, age }: User, count: number")
	assertEquals(result, 2)
})

Deno.test("_countParameters - handles rest parameter", () => {
	const result = _countParameters("...args: number[]")
	assertEquals(result, 1)
})

Deno.test("_countParameters - handles optional parameter", () => {
	const result = _countParameters("name?: string")
	assertEquals(result, 1)
})

Deno.test("_countParameters - handles default parameter", () => {
	const result = _countParameters('name: string = "World"')
	assertEquals(result, 1)
})

Deno.test("_countParameters - handles complex type annotations", () => {
	const result = _countParameters("fn: (a: number, b: number) => number")
	assertEquals(result, 1)
})

Deno.test("_countParameters - handles generic types", () => {
	const result = _countParameters("data: Array<string, number>")
	assertEquals(result, 1)
})

Deno.test("_countParameters - handles union types", () => {
	const result = _countParameters("value: string | number | boolean")
	assertEquals(result, 1)
})

Deno.test("_countParameters - handles multiple params with complex types", () => {
	const result = _countParameters(
		"mapper: (item: T) => U, array: T[], initial: U",
	)
	assertEquals(result, 3)
})

Deno.test("_countParameters - handles params with object type literals", () => {
	const result = _countParameters(
		"options: { timeout: number; retry: boolean }",
	)
	assertEquals(result, 1)
})

Deno.test("_countParameters - ignores commas in strings", () => {
	const result = _countParameters('separator: ",", value: string')
	assertEquals(result, 2)
})

Deno.test("_countParameters - handles whitespace", () => {
	const result = _countParameters("  a  ,  b  ,  c  ")
	assertEquals(result, 3)
})

Deno.test("_countParameters - handles newlines", () => {
	const result = _countParameters(`
		data: string,
		options: Options
	`)
	assertEquals(result, 2)
})

Deno.test("_countParameters - handles empty with whitespace", () => {
	const result = _countParameters("   ")
	assertEquals(result, 0)
})

// Tests for trailing comma handling
Deno.test("_countParameters - handles single parameter with trailing comma", () => {
	const result = _countParameters("isSample: boolean = false,")
	assertEquals(result, 1)
})

Deno.test("_countParameters - handles multiple parameters with trailing comma", () => {
	const result = _countParameters("a: string, b: number,")
	assertEquals(result, 2)
})

Deno.test("_countParameters - handles multiline parameter with trailing comma", () => {
	const result = _countParameters(`
		isSample: boolean = false,
	`)
	assertEquals(result, 1)
})

Deno.test("_countParameters - handles multiple multiline parameters with trailing comma", () => {
	const result = _countParameters(`
		data: string,
		options: Options,
	`)
	assertEquals(result, 2)
})

Deno.test("_countParameters - handles destructured parameter with trailing comma", () => {
	const result = _countParameters("{ name, age }: User,")
	assertEquals(result, 1)
})

Deno.test("_countParameters - handles only comma", () => {
	const result = _countParameters(",")
	assertEquals(result, 0)
})

Deno.test("_countParameters - handles only spaces and comma", () => {
	const result = _countParameters("  ,  ")
	assertEquals(result, 0)
})
