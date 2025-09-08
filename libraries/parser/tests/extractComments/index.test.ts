import { describe, it } from "https://deno.land/std@0.208.0/testing/bdd.ts"
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import * as typescript from "npm:typescript@5.7.2"
import extractComments from "../../src/extractComments/index.ts"
import associateWithNodes from "../../src/extractComments/associateWithNodes/index.ts"

describe("extractComments", () => {
	it("should extract line comments", () => {
		const source = `
// This is a line comment
//++ This is a description comment
function test() {
	// Inside function comment
	return 42
}
`
		const sourceFile = typescript.createSourceFile(
			"test.ts",
			source,
			typescript.ScriptTarget.Latest,
			true,
		)

		const comments = extractComments(sourceFile)

		assertEquals(comments.length, 3)
		assertEquals(comments[0].kind, "line")
		assertEquals(comments[0].text, "This is a line comment")
		assertEquals(comments[1].text, "This is a description comment")
		assertEquals(comments[2].text, "Inside function comment")
	})

	it("should extract block comments", () => {
		const source = `
/*
 * This is a block comment
 * with multiple lines
 */
function test() {
	/* Inline block */ return 42
}
`
		const sourceFile = typescript.createSourceFile(
			"test.ts",
			source,
			typescript.ScriptTarget.Latest,
			true,
		)

		const comments = extractComments(sourceFile)

		assertEquals(comments.length, 2)
		assertEquals(comments[0].kind, "block")
		assertEquals(comments[1].kind, "block")
		assertEquals(comments[1].text, "Inline block")
	})

	it("should preserve full text with markers", () => {
		const source = `
//++ Description comment
//-- Tech debt comment
//?? Example comment
`
		const sourceFile = typescript.createSourceFile(
			"test.ts",
			source,
			typescript.ScriptTarget.Latest,
			true,
		)

		const comments = extractComments(sourceFile)

		assertEquals(comments[0].fullText, "//++ Description comment")
		assertEquals(comments[0].text, "Description comment")
		assertEquals(comments[1].fullText, "//-- Tech debt comment")
		assertEquals(comments[2].fullText, "//?? Example comment")
	})

	it("should extract comment positions", () => {
		const source = `// First line
// Second line

// Fourth line`

		const sourceFile = typescript.createSourceFile(
			"test.ts",
			source,
			typescript.ScriptTarget.Latest,
			true,
		)

		const comments = extractComments(sourceFile)

		assertEquals(comments[0].line, 1)
		assertEquals(comments[1].line, 2)
		assertEquals(comments[2].line, 4)
	})
})

describe("associateWithNodes", () => {
	it("should associate all comments with single function", () => {
		const comments = [
			{
				kind: "line" as const,
				text: "Description",
				fullText: "//++ Description",
				start: 0,
				end: 15,
				line: 1,
				column: 1,
			},
			{
				kind: "line" as const,
				text: "Example",
				fullText: "//?? Example",
				start: 100,
				end: 112,
				line: 10,
				column: 1,
			},
		]

		const functions = [
			{
				name: "testFunction",
				// deno-lint-ignore no-explicit-any
				node: {} as any,
				isDefault: true,
				isExported: true,
				startPos: 20,
				endPos: 90,
			},
		]

		const associated = associateWithNodes(comments, functions)

		assertEquals(associated[0].nodeId, "testFunction")
		assertEquals(associated[1].nodeId, "testFunction")
	})

	it("should use explicit function markers", () => {
		const comments = [
			{
				kind: "line" as const,
				text: "[foo] Description for foo",
				fullText: "//++ [foo] Description for foo",
				start: 0,
				end: 30,
				line: 1,
				column: 1,
			},
			{
				kind: "line" as const,
				text: "[bar] Description for bar",
				fullText: "//++ [bar] Description for bar",
				start: 200,
				end: 230,
				line: 20,
				column: 1,
			},
		]

		const functions = [
			{
				name: "foo",
				// deno-lint-ignore no-explicit-any
				node: {} as any,
				isDefault: false,
				isExported: true,
				startPos: 40,
				endPos: 100,
			},
			{
				name: "bar",
				// deno-lint-ignore no-explicit-any
				node: {} as any,
				isDefault: false,
				isExported: true,
				startPos: 120,
				endPos: 180,
			},
		]

		const associated = associateWithNodes(comments, functions)

		assertEquals(associated[0].nodeId, "foo")
		assertEquals(associated[1].nodeId, "bar")
	})

	it("should use proximity when no markers", () => {
		const comments = [
			{
				kind: "line" as const,
				text: "Comment before foo",
				fullText: "// Comment before foo",
				start: 0,
				end: 20,
				line: 1,
				column: 1,
			},
			{
				kind: "line" as const,
				text: "Comment before bar",
				fullText: "// Comment before bar",
				start: 105,
				end: 125,
				line: 10,
				column: 1,
			},
		]

		const functions = [
			{
				name: "foo",
				// deno-lint-ignore no-explicit-any
				node: {} as any,
				isDefault: false,
				isExported: true,
				startPos: 25,
				endPos: 100,
			},
			{
				name: "bar",
				// deno-lint-ignore no-explicit-any
				node: {} as any,
				isDefault: false,
				isExported: true,
				startPos: 130,
				endPos: 200,
			},
		]

		const associated = associateWithNodes(comments, functions)

		// Comment 1: ends at 20, foo starts at 25, distance = 5 -> foo
		assertEquals(associated[0].nodeId, "foo")
		// Comment 2: starts at 105 (after foo ends at 100), distance from foo = 5
		// Comment 2: ends at 125 (before bar starts at 130), distance to bar = 5
		// When equidistant, the first function in the array wins (foo)
		assertEquals(associated[1].nodeId, "foo")
	})
})
