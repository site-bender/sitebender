import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"

import _stripComments from "./index.ts"

Deno.test("_stripComments - removes single-line comments", () => {
	const content = `
		const x = 5 // This is a comment
		const y = 10 // Another comment
		return x + y
	`
	const result = _stripComments(content)
	assertEquals(result.includes("This is a comment"), false)
	assertEquals(result.includes("Another comment"), false)
	assertEquals(result.includes("const x = 5"), true)
	assertEquals(result.includes("const y = 10"), true)
	assertEquals(result.includes("return x + y"), true)
})

Deno.test("_stripComments - removes multi-line comments", () => {
	const content = `
		/* This is a
		   multi-line
		   comment */
		function test() {
			return true
		}
	`
	const result = _stripComments(content)
	assertEquals(result.includes("This is a"), false)
	assertEquals(result.includes("multi-line"), false)
	assertEquals(result.includes("comment"), false)
	assertEquals(result.includes("function test()"), true)
	assertEquals(result.includes("return true"), true)
})

Deno.test("_stripComments - removes mixed comment types", () => {
	const content = `
		// Single line comment
		function example() {
			/* Multi-line
			   comment */
			const value = 42 // inline comment
			return value
		}
	`
	const result = _stripComments(content)
	assertEquals(result.includes("Single line comment"), false)
	assertEquals(result.includes("Multi-line"), false)
	assertEquals(result.includes("inline comment"), false)
	assertEquals(result.includes("function example()"), true)
	assertEquals(result.includes("const value = 42"), true)
})

Deno.test("_stripComments - handles nested multi-line comments", () => {
	const content = `
		/* First comment /* nested */ end */
		const code = "here"
	`
	// Note: Standard JS doesn't support truly nested comments
	// This will remove up to the first */ it encounters
	const result = _stripComments(content)
	assertEquals(result.includes("First comment"), false)
	assertEquals(result.includes('const code = "here"'), true)
})

Deno.test("_stripComments - preserves comment patterns inside strings", () => {
	const content = `
		const url = "http://example.com"
		const comment = "// This is not a comment"
		const block = "/* Not a block comment */"
	`
	const result = _stripComments(content)
	assertEquals(result.includes('"http://example.com"'), true) // URL is fully preserved
	assertEquals(result.includes('"// This is not a comment"'), true) // String with // is preserved
	assertEquals(result.includes('"/* Not a block comment */"'), true) // String with /* */ is preserved
})

Deno.test("_stripComments - handles empty content", () => {
	assertEquals(_stripComments(""), "")
})

Deno.test("_stripComments - handles escaped quotes in strings", () => {
	const content = `
		const escaped = "This is a \\"quoted\\" string // not a comment"
		// This is a real comment
		const template = \`Template with // comment pattern\`
	`
	const result = _stripComments(content)
	assertEquals(
		result.includes('"This is a \\"quoted\\" string // not a comment"'),
		true,
	)
	assertEquals(result.includes("This is a real comment"), false)
	assertEquals(result.includes("`Template with // comment pattern`"), true)
})

Deno.test("_stripComments - handles mixed quotes correctly", () => {
	const content = `
		const single = 'String with "double" quotes // not removed'
		const double = "String with 'single' quotes /* not removed */"
		/* Real comment */ const code = "value"
	`
	const result = _stripComments(content)
	assertEquals(
		result.includes("'String with \"double\" quotes // not removed'"),
		true,
	)
	assertEquals(
		result.includes("\"String with 'single' quotes /* not removed */\""),
		true,
	)
	assertEquals(result.includes("Real comment"), false)
	assertEquals(result.includes('const code = "value"'), true)
})

Deno.test("_stripComments - handles content with no comments", () => {
	const content = `
		function add(a, b) {
			return a + b
		}
	`
	const result = _stripComments(content)
	assertEquals(result, content)
})

Deno.test("_stripComments - removes JSDoc comments", () => {
	const content = `
		/**
		 * This is a JSDoc comment
		 * @param {number} x - The parameter
		 * @returns {number} The result
		 */
		function double(x) {
			return x * 2
		}
	`
	const result = _stripComments(content)
	assertEquals(result.includes("JSDoc comment"), false)
	assertEquals(result.includes("@param"), false)
	assertEquals(result.includes("@returns"), false)
	assertEquals(result.includes("function double(x)"), true)
})

Deno.test("_stripComments - handles multiple single-line comments in a row", () => {
	const content = `
		// Comment 1
		// Comment 2
		// Comment 3
		const x = 5
	`
	const result = _stripComments(content)
	assertEquals(result.includes("Comment 1"), false)
	assertEquals(result.includes("Comment 2"), false)
	assertEquals(result.includes("Comment 3"), false)
	assertEquals(result.includes("const x = 5"), true)
})

Deno.test("_stripComments - handles comment at end of file", () => {
	const content = `const x = 5
// Final comment`
	const result = _stripComments(content)
	assertEquals(result.includes("Final comment"), false)
	assertEquals(result.includes("const x = 5"), true)
})

Deno.test("_stripComments - preserves URLs in strings", () => {
	// URLs inside strings should be preserved
	const content = `
		const api = "https://api.example.com/endpoint"
		fetch("http://localhost:3000")
	`
	const result = _stripComments(content)
	// URLs should be fully preserved
	assertEquals(result.includes('"https://api.example.com/endpoint"'), true)
	assertEquals(result.includes('"http://localhost:3000"'), true)
	assertEquals(result.includes("api.example.com"), true)
	assertEquals(result.includes("localhost:3000"), true)
})

Deno.test("_stripComments - handles star patterns in non-comments", () => {
	const content = `
		const regex = /a*/g
		const math = 5 * 3
		/* real comment */
		const multiply = (a, b) => a * b
	`
	const result = _stripComments(content)
	assertEquals(result.includes("real comment"), false)
	assertEquals(result.includes("/a*/g"), true)
	assertEquals(result.includes("5 * 3"), true)
	assertEquals(result.includes("a * b"), true)
})

Deno.test("_stripComments - removes inline multi-line comments", () => {
	const content = `const x = /* inline */ 5`
	const result = _stripComments(content)
	assertEquals(result.includes("inline"), false)
	assertEquals(result.includes("const x ="), true)
	assertEquals(result.includes("5"), true)
})
