import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"

import _extractSignature from "./index.ts"

Deno.test("_extractSignature - extracts simple export default function", () => {
	const content = `export default function myFunction() {
		return 42
	}`
	const result = _extractSignature(content)("myFunction")
	assertEquals(result, "function myFunction() ")
})

Deno.test("_extractSignature - extracts function with parameters", () => {
	const content =
		`export default function calculate(a: number, b: number): number {
		return a + b
	}`
	const result = _extractSignature(content)("calculate")
	assertEquals(result, "function calculate(a: number, b: number): number ")
})

Deno.test("_extractSignature - extracts generic function", () => {
	const content = `export default function map<T, U>(fn: (item: T) => U) {
		return function withArray(array: T[]): U[] {
			// implementation
		}
	}`
	const result = _extractSignature(content)("map")
	assertEquals(result, "function map<T, U>(fn: (item: T) => U) ")
})

Deno.test("_extractSignature - extracts multiline function signature", () => {
	const content = `export default function process(
		data: string,
		options: ProcessOptions
	): Result {
		// implementation
	}`
	const result = _extractSignature(content)("process")
	assertEquals(
		result,
		"function process(\n\t\tdata: string,\n\t\toptions: ProcessOptions\n\t): Result ",
	)
})

Deno.test("_extractSignature - extracts const arrow function", () => {
	const content = `const myArrow = (x: number, y: number) => x + y`
	const result = _extractSignature(content)("myArrow")
	assertEquals(result, "function myArrow(x: number, y: number)")
})

Deno.test("_extractSignature - extracts arrow function with single param", () => {
	const content = `const double = (n: number) => n * 2`
	const result = _extractSignature(content)("double")
	assertEquals(result, "function double(n: number)")
})

Deno.test("_extractSignature - extracts arrow function with no params", () => {
	const content = `const getNow = () => Date.now()`
	const result = _extractSignature(content)("getNow")
	assertEquals(result, "function getNow()")
})

Deno.test("_extractSignature - returns fallback for non-matching function", () => {
	const content = `export default function otherFunction() {
		return "hello"
	}`
	const result = _extractSignature(content)("myFunction")
	assertEquals(result, "function myFunction(...)")
})

Deno.test("_extractSignature - returns fallback for empty content", () => {
	const content = ""
	const result = _extractSignature(content)("anyFunction")
	assertEquals(result, "function anyFunction(...)")
})

Deno.test("_extractSignature - handles function with complex return type", () => {
	// Should now handle complex return types with nested braces correctly
	const content =
		`export default function getData(): Promise<{ id: number; name: string }> {
		// implementation
	}`
	const result = _extractSignature(content)("getData")
	assertEquals(
		result,
		"function getData(): Promise<{ id: number; name: string }> ",
	)
})

Deno.test("_extractSignature - handles function with default parameters", () => {
	const content =
		`export default function greet(name: string = "World"): string {
		return \`Hello \${name}\`
	}`
	const result = _extractSignature(content)("greet")
	assertEquals(result, 'function greet(name: string = "World"): string ')
})

Deno.test("_extractSignature - handles function with rest parameters", () => {
	const content = `export default function sum(...numbers: number[]): number {
		// implementation
	}`
	const result = _extractSignature(content)("sum")
	assertEquals(result, "function sum(...numbers: number[]): number ")
})

Deno.test("_extractSignature - curried function works correctly", () => {
	const content = `export default function test() { return 42 }`
	const extractFromContent = _extractSignature(content)

	assertEquals(extractFromContent("test"), "function test() ")
	assertEquals(extractFromContent("other"), "function other(...)")
})

Deno.test("_extractSignature - handles arrow function with destructuring", () => {
	const content = `const extract = ({ name, age }: User) => name`
	const result = _extractSignature(content)("extract")
	assertEquals(result, "function extract({ name, age }: User)")
})

Deno.test("_extractSignature - handles function with comments before", () => {
	const content = `// This is a helper function
	export default function helper(value: string): boolean {
		return !!value
	}`
	const result = _extractSignature(content)("helper")
	assertEquals(result, "function helper(value: string): boolean ")
})

Deno.test("_extractSignature - handles async function", () => {
	const content =
		`export default async function fetchData(url: string): Promise<Data> {
		// implementation
	}`
	const result = _extractSignature(content)("fetchData")
	assertEquals(result, "async function fetchData(url: string): Promise<Data> ")
})

Deno.test("_extractSignature - handles function with union types", () => {
	const content =
		`export default function process(value: string | number): boolean {
		// implementation
	}`
	const result = _extractSignature(content)("process")
	assertEquals(result, "function process(value: string | number): boolean ")
})

Deno.test("_extractSignature - matches exact function name only", () => {
	const content = `export default function testFunction() {
		return 42
	}`
	const result = _extractSignature(content)("test")
	assertEquals(result, "function test(...)")
})

Deno.test("_extractSignature - handles nested generic types", () => {
	const content =
		`export default function transform<T>(): Map<string, Array<T>> {
		// implementation
	}`
	const result = _extractSignature(content)("transform")
	assertEquals(result, "function transform<T>(): Map<string, Array<T>> ")
})

Deno.test("_extractSignature - handles function type in return", () => {
	const content =
		`export default function getHandler(): (event: Event) => void {
		// implementation
	}`
	const result = _extractSignature(content)("getHandler")
	assertEquals(result, "function getHandler(): (event: Event) => void ")
})

Deno.test("_extractSignature - handles tuple return type", () => {
	const content = `export default function getPair(): [string, number] {
		// implementation
	}`
	const result = _extractSignature(content)("getPair")
	assertEquals(result, "function getPair(): [string, number] ")
})
