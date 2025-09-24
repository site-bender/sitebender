import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"

import type { FunctionInfo } from "../types/index.ts"

import _extractFunctionInfo from "./index.ts"

Deno.test("_extractFunctionInfo - extracts basic function info", () => {
	const content = `export default function myFunction() {
		return 42
	}`
	const result = _extractFunctionInfo(content)("src/utils/myFunction/index.ts")
	const expected: FunctionInfo = {
		signature: "function myFunction() ",
		path: "src/utils/myFunction/index.ts",
		curried: false,
	}
	assertEquals(result, expected)
})

Deno.test("_extractFunctionInfo - extracts curried function info", () => {
	const content = `export default function map<T, U>(fn: (item: T) => U) {
		return function withArray(array: T[]): U[] {
			// implementation
		}
	}`
	const result = _extractFunctionInfo(content)(
		"libraries/toolsmith/src/vanilla/array/map/index.ts",
	)
	const expected: FunctionInfo = {
		signature: "function map<T, U>(fn: (item: T) => U) ",
		path: "libraries/toolsmith/src/vanilla/array/map/index.ts",
		curried: true,
	}
	assertEquals(result, expected)
})

Deno.test("_extractFunctionInfo - extracts arrow function info", () => {
	const content = `const process = (data: string) => data.toUpperCase()
export default process`
	const result = _extractFunctionInfo(content)("src/utils/process/index.ts")
	const expected: FunctionInfo = {
		signature: "function process(data: string)",
		path: "src/utils/process/index.ts",
		curried: true,
	}
	assertEquals(result, expected)
})

Deno.test("_extractFunctionInfo - returns null for no function", () => {
	const content = `export const CONFIG = { enabled: true }`
	const result = _extractFunctionInfo(content)("src/constants/index.ts")
	assertEquals(result, null)
})

Deno.test("_extractFunctionInfo - returns null for aliased export", () => {
	const content = `export { default } from "./standardDeviation/index.ts"`
	const result = _extractFunctionInfo(content)("src/math/std/index.ts")
	assertEquals(result, null)
})

Deno.test("_extractFunctionInfo - detects curried arrow function", () => {
	const content = `export default function curry(fn: Function) {
		return (a: any) => (b: any) => fn(a, b)
	}`
	const result = _extractFunctionInfo(content)("src/functional/curry/index.ts")
	const expected: FunctionInfo = {
		signature: "function curry(fn: Function) ",
		path: "src/functional/curry/index.ts",
		curried: true,
	}
	assertEquals(result, expected)
})

Deno.test("_extractFunctionInfo - handles complex return type", () => {
	const content = `export default function getData(): Promise<{ id: number }> {
		// implementation
	}`
	const result = _extractFunctionInfo(content)("src/api/getData/index.ts")
	const expected: FunctionInfo = {
		signature: "function getData(): Promise<{ id: number }> ",
		path: "src/api/getData/index.ts",
		curried: false,
	}
	assertEquals(result, expected)
})

Deno.test("_extractFunctionInfo - handles multiline signature", () => {
	const content = `export default function process(
		data: string,
		options: Options
	): Result {
		// implementation
	}`
	const result = _extractFunctionInfo(content)("src/process/index.ts")
	const expected: FunctionInfo = {
		signature:
			"function process(\n\t\tdata: string,\n\t\toptions: Options\n\t): Result ",
		path: "src/process/index.ts",
		curried: false,
	}
	assertEquals(result, expected)
})

Deno.test("_extractFunctionInfo - curried function works correctly", () => {
	const content = `export default function test() { return 42 }`
	const extractFromContent = _extractFunctionInfo(content)

	const result1 = extractFromContent("path1/index.ts")
	const result2 = extractFromContent("path2/test/index.ts")

	assertEquals(result1?.path, "path1/index.ts")
	assertEquals(result2?.path, "path2/test/index.ts")
	assertEquals(result1?.signature, "function test() ")
	assertEquals(result2?.signature, "function test() ")
})

Deno.test("_extractFunctionInfo - detects function with zero parameters", () => {
	const content = `export default function compose() {
		return function inner() {
			// implementation
		}
	}`
	const result = _extractFunctionInfo(content)("src/compose/index.ts")
	assertEquals(result?.curried, false)
})

Deno.test("_extractFunctionInfo - function with zero params is not curried", () => {
	const content = `export default function pipe() {
		return (x: any) => x
	}`
	const result = _extractFunctionInfo(content)("src/pipe/index.ts")
	assertEquals(result?.curried, false)
})

Deno.test("_extractFunctionInfo - handles deeply nested path", () => {
	const content = `export default function deepFunction() {
		// implementation
	}`
	const result = _extractFunctionInfo(content)("a/b/c/d/e/f/g/index.ts")
	assertEquals(result?.path, "a/b/c/d/e/f/g/index.ts")
})

Deno.test("_extractFunctionInfo - returns null for empty content", () => {
	const content = ""
	const result = _extractFunctionInfo(content)("src/empty/index.ts")
	assertEquals(result, null)
})

Deno.test("_extractFunctionInfo - returns null for type export", () => {
	const content = `export type MyType = string | number`
	const result = _extractFunctionInfo(content)("src/types/index.ts")
	assertEquals(result, null)
})

Deno.test("_extractFunctionInfo - handles function with default parameters", () => {
	const content =
		`export default function greet(name: string = "World"): string {
		return \`Hello \${name}\`
	}`
	const result = _extractFunctionInfo(content)("src/greet/index.ts")
	const expected: FunctionInfo = {
		signature: 'function greet(name: string = "World"): string ',
		path: "src/greet/index.ts",
		curried: true, // Single parameter = curried
	}
	assertEquals(result, expected)
})
