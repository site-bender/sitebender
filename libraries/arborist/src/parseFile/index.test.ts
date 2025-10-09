// @sitebender/arborist/src/parseFile/index.test.ts
// Tests for parseFile function

import { assert, assertEquals, assertExists } from "jsr:@std/assert@1.0.14"
import * as fc from "npm:fast-check@3.23.1"

import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import fold from "@sitebender/toolsmith/monads/result/fold/index.ts"

import type { ParsedAst, ParseError } from "../types/index.ts"
import parseFile from "./index.ts"

Deno.test({
	name: "parseFile - parses valid TypeScript file → Ok(ParsedAst)",
	sanitizeResources: false, // SWC WASM initialization creates global resources
	sanitizeOps: false, // SWC WASM async ops may span tests
	async fn() {
		const result = await parseFile(
			"src/parseFile/test-fixtures/valid.ts",
		)

		assert(isOk(result), "Expected Ok result for valid TypeScript file")

		const ast = fold<ParseError, ParsedAst | null>(
			function handleError(_err) {
				return null
			},
		)(function handleSuccess(parsedAst: ParsedAst) {
			return parsedAst
		})(result)

		assertExists(ast, "AST should exist")
		assertEquals(
			ast.filePath,
			"src/parseFile/test-fixtures/valid.ts",
			"File path should match input",
		)
		assertExists(ast.module, "Should have SWC module")
		assertExists(ast.sourceText, "Should have source text")
		assertEquals(
			typeof ast.sourceText,
			"string",
			"Source text should be string",
		)
	},
})

Deno.test({
	name: "parseFile - invalid syntax → Error with InvalidSyntax kind",
	sanitizeResources: false, // SWC WASM initialization creates global resources
	sanitizeOps: false, // SWC WASM async ops may span tests
	async fn() {
		const result = await parseFile(
			"src/parseFile/test-fixtures/invalid-syntax.ts",
		)

		assert(isError(result), "Expected Error result for invalid syntax")

		const err = fold<ParseError, ParseError | null>(
			function handleError(error: ParseError) {
				return error
			},
		)(function handleSuccess(_ast: ParsedAst) {
			return null
		})(result)

		assertExists(err, "Error should exist")
		assertEquals(err.kind, "InvalidSyntax", "Should be InvalidSyntax kind")
		assertEquals(err.operation, "parseFile", "Should be parseFile operation")
		assertExists(err.message, "Should have error message")
		assertExists(err.suggestion, "Should have helpful suggestion")
	},
})

Deno.test({
	name: "parseFile - missing file → Error with FileNotFound kind + suggestion",
	sanitizeResources: false, // SWC WASM initialization creates global resources
	sanitizeOps: false, // SWC WASM async ops may span tests
	async fn() {
		const result = await parseFile("does-not-exist.ts")

		assert(isError(result), "Expected Error result for missing file")

		const err = fold<ParseError, ParseError | null>(
			function handleError(error: ParseError) {
				return error
			},
		)(function handleSuccess(_ast: ParsedAst) {
			return null
		})(result)

		assertExists(err, "Error should exist")
		assertEquals(err.kind, "FileNotFound", "Should be FileNotFound kind")
		assertEquals(err.file, "does-not-exist.ts", "Should reference correct file")
		assertExists(err.message, "Should have error message")
		assertExists(err.suggestion, "Should have helpful suggestion")
	},
})

Deno.test({
	name: "parseFile - property: always returns Result, never throws",
	sanitizeResources: false, // SWC WASM initialization creates global resources
	sanitizeOps: false, // SWC WASM async ops may span tests
	fn() {
		fc.assert(
			fc.asyncProperty(fc.string(), async (path: string) => {
				const result = await parseFile(path)

				// Must be either Ok or Error, never throws
				assert(
					isOk(result) || isError(result),
					"Result must be Ok or Error",
				)
			}),
			{ numRuns: 10 }, // Limit runs since file I/O is slow
		)
	},
})

Deno.test({
	name: "parseFile - property: same file gives same result (pure)",
	sanitizeResources: false, // SWC WASM initialization creates global resources
	sanitizeOps: false, // SWC WASM async ops may span tests
	async fn() {
		const path = "src/parseFile/test-fixtures/valid.ts"

		const result1 = await parseFile(path)
		const result2 = await parseFile(path)

		// Same input should give same output (referential transparency)
		assertEquals(isOk(result1), isOk(result2))

		if (isOk(result1) && isOk(result2)) {
			const ast1 = fold<ParseError, ParsedAst | null>(
				function handleError(_err) {
					return null
				},
			)(function handleSuccess(ast: ParsedAst) {
				return ast
			})(result1)

			const ast2 = fold<ParseError, ParsedAst | null>(
				function handleError(_err) {
					return null
				},
			)(function handleSuccess(ast: ParsedAst) {
				return ast
			})(result2)

			assertExists(ast1, "First AST should exist")
			assertExists(ast2, "Second AST should exist")
			assertEquals(ast1.filePath, ast2.filePath, "File paths should match")
			assertEquals(
				ast1.sourceText,
				ast2.sourceText,
				"Source text should match",
			)
		}
	},
})

Deno.test({
	name: "parseFile - returns immutable ParsedAst",
	sanitizeResources: false, // SWC WASM initialization creates global resources
	sanitizeOps: false, // SWC WASM async ops may span tests
	async fn() {
		const result = await parseFile(
			"src/parseFile/test-fixtures/valid.ts",
		)

		assert(isOk(result), "Should parse successfully")

		const ast = fold<ParseError, ParsedAst | null>(
			function handleError(_err) {
				return null
			},
		)(function handleSuccess(parsedAst: ParsedAst) {
			return parsedAst
		})(result)

		assertExists(ast, "AST should exist")
		assert(typeof ast.filePath === "string", "Should have filePath")
		assert(typeof ast.sourceText === "string", "Should have sourceText")
		assertExists(ast.module, "Should have module")

		// The real immutability test is at compile time via TypeScript
		// These would fail to compile:
		// ast.filePath = "x"      // Error: Cannot assign to read-only property
		// ast.sourceText = "y"    // Error: Cannot assign to read-only property
	},
})
