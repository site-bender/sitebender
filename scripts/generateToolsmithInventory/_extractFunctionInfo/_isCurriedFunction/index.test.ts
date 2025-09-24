import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"

import _isCurriedFunction from "./index.ts"

Deno.test("_isCurriedFunction - single parameter function is curried", () => {
	const content = `export default function identity(x) {
		return x
	}`
	const result = _isCurriedFunction(content)
	assertEquals(result, true)
})

Deno.test("_isCurriedFunction - single typed parameter function is curried", () => {
	const content = `export default function double(n: number) {
		return n * 2
	}`
	const result = _isCurriedFunction(content)
	assertEquals(result, true)
})

Deno.test("_isCurriedFunction - zero parameter function is not curried", () => {
	const content = `export default function getNow() {
		return Date.now()
	}`
	const result = _isCurriedFunction(content)
	assertEquals(result, false)
})

Deno.test("_isCurriedFunction - two parameter function is not curried", () => {
	const content = `export default function add(a: number, b: number) {
		return a + b
	}`
	const result = _isCurriedFunction(content)
	assertEquals(result, false)
})

Deno.test("_isCurriedFunction - multiple parameter function is not curried", () => {
	const content =
		`export default function sum(a: number, b: number, c: number) {
		return a + b + c
	}`
	const result = _isCurriedFunction(content)
	assertEquals(result, false)
})

Deno.test("_isCurriedFunction - arrow function with single param is curried", () => {
	const content = `const double = (n: number) => n * 2
export default double`
	const result = _isCurriedFunction(content)
	assertEquals(result, true)
})

Deno.test("_isCurriedFunction - arrow function with no parens single param is curried", () => {
	const content = `const double = n => n * 2
export default double`
	const result = _isCurriedFunction(content)
	assertEquals(result, true)
})

Deno.test("_isCurriedFunction - arrow function with zero params is not curried", () => {
	const content = `const getNow = () => Date.now()
export default getNow`
	const result = _isCurriedFunction(content)
	assertEquals(result, false)
})

Deno.test("_isCurriedFunction - arrow function with two params is not curried", () => {
	const content = `const add = (a: number, b: number) => a + b
export default add`
	const result = _isCurriedFunction(content)
	assertEquals(result, false)
})

Deno.test("_isCurriedFunction - function with complex single parameter is curried", () => {
	const content = `export default function process(options: ProcessOptions) {
		return options.value * 2
	}`
	const result = _isCurriedFunction(content)
	assertEquals(result, true)
})

Deno.test("_isCurriedFunction - function with destructured single parameter is curried", () => {
	const content = `export default function extract({ name, age }: User) {
		return name
	}`
	const result = _isCurriedFunction(content)
	assertEquals(result, true)
})

Deno.test("_isCurriedFunction - function with rest parameter is curried", () => {
	// Rest parameter is still one parameter
	const content = `export default function collect(...args: number[]) {
		return args
	}`
	const result = _isCurriedFunction(content)
	assertEquals(result, true)
})

Deno.test("_isCurriedFunction - function with optional parameter is curried", () => {
	// Still one parameter, just optional
	const content = `export default function greet(name?: string) {
		return "Hello " + (name || "World")
	}`
	const result = _isCurriedFunction(content)
	assertEquals(result, true)
})

Deno.test("_isCurriedFunction - function with default parameter is curried", () => {
	// Still one parameter, just with default
	const content = `export default function greet(name: string = "World") {
		return "Hello " + name
	}`
	const result = _isCurriedFunction(content)
	assertEquals(result, true)
})

Deno.test("_isCurriedFunction - async function with single param is curried", () => {
	const content = `export default async function fetchUser(id: string) {
		// fetch implementation
	}`
	const result = _isCurriedFunction(content)
	assertEquals(result, true)
})

Deno.test("_isCurriedFunction - returns false for content without function", () => {
	const content = `// Just a comment`
	const result = _isCurriedFunction(content)
	assertEquals(result, false)
})

Deno.test("_isCurriedFunction - returns false for empty content", () => {
	const content = ``
	const result = _isCurriedFunction(content)
	assertEquals(result, false)
})

Deno.test("_isCurriedFunction - generic function with single param is curried", () => {
	const content = `export default function identity<T>(value: T): T {
		return value
	}`
	const result = _isCurriedFunction(content)
	assertEquals(result, true)
})

Deno.test("_isCurriedFunction - generic function with multiple params is not curried", () => {
	const content =
		`export default function pair<T, U>(first: T, second: U): [T, U] {
		return [first, second]
	}`
	const result = _isCurriedFunction(content)
	assertEquals(result, false)
})

Deno.test("_isCurriedFunction - function returning function with single param is still curried", () => {
	// The outer function has one parameter, so it's curried
	// (What it returns is irrelevant to whether IT is curried)
	const content = `export default function multiply(x: number) {
		return function (y: number) {
			return x * y
		}
	}`
	const result = _isCurriedFunction(content)
	assertEquals(result, true)
})

Deno.test("_isCurriedFunction - function returning function with two params is not curried", () => {
	// The outer function has two parameters, so it's not curried
	const content = `export default function combine(x: number, y: number) {
		return function (z: number) {
			return x + y + z
		}
	}`
	const result = _isCurriedFunction(content)
	assertEquals(result, false)
})

Deno.test("_isCurriedFunction - handles comments in function signature", () => {
	const content = `export default function process(
		// The data to process
		data: string
	) {
		return data.toUpperCase()
	}`
	const result = _isCurriedFunction(content)
	assertEquals(result, true)
})

Deno.test("_isCurriedFunction - handles multiline parameter list", () => {
	const content = `export default function transform(
		data: string,
		options: Options
	) {
		// implementation
	}`
	const result = _isCurriedFunction(content)
	assertEquals(result, false) // Two parameters
})

// Tests for toolsmith-style arrow functions
Deno.test("_isCurriedFunction - toolsmith style map function is curried", () => {
	const content = `const map = <T, U>(
		fn: (element: T, index: number, array: ReadonlyArray<T>) => U,
	) =>
	(
		array: ReadonlyArray<T> | null | undefined,
	): Array<U> => {
		return array.map(fn)
	}

	export default map`
	const result = _isCurriedFunction(content)
	assertEquals(result, true) // One parameter (fn)
})

Deno.test("_isCurriedFunction - toolsmith style split function is curried", () => {
	const content =
		`const split = (separator: string | RegExp) => (str: string): Array<string> =>
		str.split(separator)

	export default split`
	const result = _isCurriedFunction(content)
	assertEquals(result, true) // One parameter (separator)
})

Deno.test("_isCurriedFunction - arrow function with generics is curried", () => {
	const content = `const identity = <T>(value: T) => value

	export default identity`
	const result = _isCurriedFunction(content)
	assertEquals(result, true)
})

Deno.test("_isCurriedFunction - multiline arrow with generics and single param", () => {
	const content = `const filter = <T>(
		predicate: (item: T) => boolean
	) => (array: T[]): T[] => {
		return array.filter(predicate)
	}

	export default filter`
	const result = _isCurriedFunction(content)
	assertEquals(result, true)
})

Deno.test("_isCurriedFunction - arrow function with multiple params is not curried", () => {
	const content = `const combine = <T>(first: T, second: T) => [first, second]

	export default combine`
	const result = _isCurriedFunction(content)
	assertEquals(result, false)
})
