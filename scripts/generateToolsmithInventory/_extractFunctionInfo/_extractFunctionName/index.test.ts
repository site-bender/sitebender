import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"

import _extractFunctionName from "./index.ts"

Deno.test("_extractFunctionName - extracts name from export default function", () => {
	const content = `export default function myFunction() {
		return 42
	}`
	const result = _extractFunctionName(content)
	assertEquals(result, "myFunction")
})

Deno.test("_extractFunctionName - extracts name with generics", () => {
	const content = `export default function map<T, U>(fn: (item: T) => U) {
		// implementation
	}`
	const result = _extractFunctionName(content)
	assertEquals(result, "map")
})

Deno.test("_extractFunctionName - extracts name from export default identifier", () => {
	const content = `const myFunction = () => {}
export default myFunction`
	const result = _extractFunctionName(content)
	assertEquals(result, "myFunction")
})

Deno.test("_extractFunctionName - extracts name with multiline signature", () => {
	const content = `export default function process(
		data: string,
		options: Options
	): Result {
		// implementation
	}`
	const result = _extractFunctionName(content)
	assertEquals(result, "process")
})

Deno.test("_extractFunctionName - returns null for no export default", () => {
	const content = `function myFunction() {
		return 42
	}`
	const result = _extractFunctionName(content)
	assertEquals(result, null)
})

Deno.test("_extractFunctionName - returns null for named export", () => {
	const content = `export function myFunction() {
		return 42
	}`
	const result = _extractFunctionName(content)
	assertEquals(result, null)
})

Deno.test("_extractFunctionName - returns null for re-export", () => {
	const content = `export { default } from "./other"`
	const result = _extractFunctionName(content)
	assertEquals(result, null)
})

Deno.test("_extractFunctionName - extracts async function name", () => {
	const content = `export default async function fetchData() {
		// implementation
	}`
	const result = _extractFunctionName(content)
	assertEquals(result, "fetchData")
})

Deno.test("_extractFunctionName - extracts name with complex types", () => {
	const content = `export default function transform<T extends BaseType>(
		input: T
	): TransformResult<T> {
		// implementation
	}`
	const result = _extractFunctionName(content)
	assertEquals(result, "transform")
})

Deno.test("_extractFunctionName - handles identifier on same line", () => {
	const content = `const helper = () => {}; export default helper`
	const result = _extractFunctionName(content)
	assertEquals(result, "helper")
})

Deno.test("_extractFunctionName - handles identifier on next line", () => {
	const content = `const util = () => {}

export default util`
	const result = _extractFunctionName(content)
	assertEquals(result, "util")
})

Deno.test("_extractFunctionName - returns null for empty content", () => {
	const content = ""
	const result = _extractFunctionName(content)
	assertEquals(result, null)
})

Deno.test("_extractFunctionName - returns null for constants", () => {
	const content = `export default 42`
	const result = _extractFunctionName(content)
	assertEquals(result, null)
})

Deno.test("_extractFunctionName - returns null for object export", () => {
	const content = `export default { key: "value" }`
	const result = _extractFunctionName(content)
	assertEquals(result, null)
})

Deno.test("_extractFunctionName - extracts function name with comments", () => {
	const content = `// This is a helper function
export default function helper() {
	// implementation
}`
	const result = _extractFunctionName(content)
	assertEquals(result, "helper")
})
