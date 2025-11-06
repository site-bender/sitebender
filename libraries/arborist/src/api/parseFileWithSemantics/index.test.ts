// @sitebender/arborist/src/api/parseFileWithSemantics/index.test.ts
// Tests for parseFileWithSemantics function (semantic analysis via deno_ast WASM)

import { assert, assertEquals, assertExists } from "jsr:@std/assert@1.0.14"
import * as fc from "npm:fast-check@3.23.1"

import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import fold from "@sitebender/toolsmith/monads/result/fold/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import and from "@sitebender/toolsmith/logic/and/index.ts"

import type { ParseError } from "../../types/index.ts"
import type { SemanticAst } from "../../types/semantics/index.ts"
import parseFileWithSemantics from "./index.ts"

//++ Tests for parseFileWithSemantics - Semantic parsing using deno_ast WASM
Deno.test({
	name:
		"parseFileWithSemantics - success path: parses valid TypeScript file → Ok(SemanticAst)",
	sanitizeResources: false, // WASM initialization creates global resources
	sanitizeOps: false, // WASM async ops may span tests
	async fn() {
		const result = await parseFileWithSemantics(
			"src/parseFile/test-fixtures/valid.ts",
		)

		assert(isOk(result), "Expected Ok result for valid TypeScript file")

		const ast = fold<ParseError, SemanticAst | null>(
			function handleError(_err) {
				return null
			},
		)(function handleSuccess(semanticAst: SemanticAst) {
			return semanticAst
		})(result)

		assertExists(ast, "SemanticAst should exist")
		assertEquals(
			ast!.filePath,
			"src/parseFile/test-fixtures/valid.ts",
			"File path should match input",
		)
		assertExists(ast!.module, "Should have deno_ast module")
		assertExists(ast!.sourceText, "Should have source text")
		assert(
			isEqual(typeof ast!.sourceText)("string"),
			"Source text should be string",
		)
		assertExists(ast!.semanticInfo, "Should have semantic information")
	},
})

Deno.test({
	name:
		"parseFileWithSemantics - success path: provides semantic information structure",
	sanitizeResources: false,
	sanitizeOps: false,
	async fn() {
		const result = await parseFileWithSemantics(
			"src/parseFile/test-fixtures/valid.ts",
		)

		assert(isOk(result), "Should parse successfully")

		const ast = fold<ParseError, SemanticAst | null>(
			function handleError(_err) {
				return null
			},
		)(function handleSuccess(semanticAst: SemanticAst) {
			return semanticAst
		})(result)

		assertExists(ast, "AST should exist")
		assertExists(ast!.semanticInfo, "Should have semanticInfo")

		// Verify semantic info structure
		const info = ast!.semanticInfo
		assertExists(info.inferredTypes, "Should have inferredTypes")
		assertExists(info.purity, "Should have purity analysis")
		assertExists(info.complexity, "Should have complexity metrics")
		assertExists(
			info.mathematicalProperties,
			"Should have mathematical properties",
		)
		assertExists(info.symbolTable, "Should have symbol table")
		assertExists(info.diagnostics, "Should have diagnostics")
		assertExists(info.typeDependencies, "Should have type dependencies")
	},
})

Deno.test({
	name:
		"parseFileWithSemantics - success path: purity analysis structure is correct",
	sanitizeResources: false,
	sanitizeOps: false,
	async fn() {
		const result = await parseFileWithSemantics(
			"src/parseFile/test-fixtures/valid.ts",
		)

		assert(isOk(result), "Should parse successfully")

		const ast = fold<ParseError, SemanticAst | null>(
			function handleError(_err) {
				return null
			},
		)(function handleSuccess(semanticAst: SemanticAst) {
			return semanticAst
		})(result)

		assertExists(ast, "AST should exist")
		const purity = ast!.semanticInfo.purity

		assert(
			isEqual(typeof purity.isPure)("boolean"),
			"isPure should be boolean",
		)
		assertExists(purity.reasons, "Should have reasons array")
		assertExists(purity.sideEffects, "Should have sideEffects array")
	},
})

Deno.test({
	name:
		"parseFileWithSemantics - success path: complexity metrics structure is correct",
	sanitizeResources: false,
	sanitizeOps: false,
	async fn() {
		const result = await parseFileWithSemantics(
			"src/parseFile/test-fixtures/valid.ts",
		)

		assert(isOk(result), "Should parse successfully")

		const ast = fold<ParseError, SemanticAst | null>(
			function handleError(_err) {
				return null
			},
		)(function handleSuccess(semanticAst: SemanticAst) {
			return semanticAst
		})(result)

		assertExists(ast, "AST should exist")
		const complexity = ast!.semanticInfo.complexity

		assert(
			isEqual(typeof complexity.cyclomatic)("number"),
			"cyclomatic should be number",
		)
		assert(
			isEqual(typeof complexity.cognitive)("number"),
			"cognitive should be number",
		)
		assertExists(complexity.halstead, "Should have halstead metrics")
		assert(
			isEqual(typeof complexity.halstead.volume)("number"),
			"halstead.volume should be number",
		)
		assert(
			isEqual(typeof complexity.halstead.difficulty)("number"),
			"halstead.difficulty should be number",
		)
		assert(
			isEqual(typeof complexity.halstead.effort)("number"),
			"halstead.effort should be number",
		)
	},
})

Deno.test({
	name:
		"parseFileWithSemantics - error path: invalid syntax → Error with InvalidSyntax kind",
	sanitizeResources: false,
	sanitizeOps: false,
	async fn() {
		const result = await parseFileWithSemantics(
			"src/parseFile/test-fixtures/invalid-syntax.ts",
		)

		assert(isError(result), "Expected Error result for invalid syntax")

		const err = fold<ParseError, ParseError | null>(
			function handleError(error: ParseError) {
				return error
			},
		)(function handleSuccess(_ast: SemanticAst) {
			return null
		})(result)

		assertExists(err, "Error should exist")
		assertEquals(err.kind, "InvalidSyntax", "Should be InvalidSyntax kind")
		assertEquals(
			err.operation,
			"parseFile",
			"Should be parseFile operation",
		)
		assertExists(err.message, "Should have error message")
		assertExists(err.suggestion, "Should have helpful suggestion")
		assertEquals(
			err.file,
			"src/parseFile/test-fixtures/invalid-syntax.ts",
			"Should reference correct file",
		)
	},
})

Deno.test({
	name: "parseFileWithSemantics - error path: missing file → Error",
	sanitizeResources: false,
	sanitizeOps: false,
	async fn() {
		const result = await parseFileWithSemantics("does-not-exist.ts")

		assert(isError(result), "Expected Error result for missing file")

		const err = fold<ParseError, ParseError | null>(
			function handleError(error: ParseError) {
				return error
			},
		)(function handleSuccess(_ast: SemanticAst) {
			return null
		})(result)

		assertExists(err, "Error should exist")
		assertEquals(err.file, "does-not-exist.ts", "Should reference correct file")
		assertExists(err.message, "Should have error message")
		assertExists(err.suggestion, "Should have helpful suggestion")
	},
})

Deno.test({
	name: "parseFileWithSemantics - error path: provides helpful suggestions",
	sanitizeResources: false,
	sanitizeOps: false,
	async fn() {
		const result = await parseFileWithSemantics(
			"src/parseFile/test-fixtures/invalid-syntax.ts",
		)

		assert(isError(result), "Should return Error for invalid syntax")

		const err = fold<ParseError, ParseError | null>(
			function handleError(error: ParseError) {
				return error
			},
		)(function handleSuccess(_ast: SemanticAst) {
			return null
		})(result)

		assertExists(err, "Error should exist")
		assertExists(err.suggestion, "Should have suggestion")
		assert(
			err.suggestion.includes("TypeScript"),
			"Suggestion should mention TypeScript",
		)
		assert(
			err.suggestion.includes("WASM"),
			"Suggestion should mention WASM module",
		)
	},
})

Deno.test({
	name:
		"parseFileWithSemantics - property: always returns Result, never throws",
	sanitizeResources: false,
	sanitizeOps: false,
	fn() {
		fc.assert(
			fc.asyncProperty(fc.string(), async (path: string) => {
				const result = await parseFileWithSemantics(path)

				// Must be either Ok or Error, never throws
				assert(
					isOk(result) || isError(result),
					"Result must be Ok or Error",
				)
			}),
			{ numRuns: 10 }, // Limit runs since file I/O and WASM are slow
		)
	},
})

Deno.test({
	name:
		"parseFileWithSemantics - property: same file gives same result (referential transparency)",
	sanitizeResources: false,
	sanitizeOps: false,
	async fn() {
		const path = "src/parseFile/test-fixtures/valid.ts"

		const result1 = await parseFileWithSemantics(path)
		const result2 = await parseFileWithSemantics(path)

		// Same input should give same output (pure function behavior)
		assertEquals(isOk(result1), isOk(result2))

		if (and(isOk(result1))(isOk(result2))) {
			const ast1 = fold<ParseError, SemanticAst | null>(
				function handleError(_err) {
					return null
				},
			)(function handleSuccess(ast: SemanticAst) {
				return ast
			})(result1)

			const ast2 = fold<ParseError, SemanticAst | null>(
				function handleError(_err) {
					return null
				},
			)(function handleSuccess(ast: SemanticAst) {
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
	name: "parseFileWithSemantics - returns immutable SemanticAst",
	sanitizeResources: false,
	sanitizeOps: false,
	async fn() {
		const result = await parseFileWithSemantics(
			"src/parseFile/test-fixtures/valid.ts",
		)

		assert(isOk(result), "Should parse successfully")

		const ast = fold<ParseError, SemanticAst | null>(
			function handleError(_err) {
				return null
			},
		)(function handleSuccess(semanticAst: SemanticAst) {
			return semanticAst
		})(result)

		assertExists(ast, "AST should exist")
		assert(isEqual(typeof ast!.filePath)("string"), "Should have filePath")
		assert(isEqual(typeof ast!.sourceText)("string"), "Should have sourceText")
		assertExists(ast!.module, "Should have module")
		assertExists(ast!.semanticInfo, "Should have semanticInfo")

		// The real immutability test is at compile time via TypeScript
		// These would fail to compile:
		// ast.filePath = "x"              // Error: Cannot assign to read-only property
		// ast.sourceText = "y"            // Error: Cannot assign to read-only property
		// ast.semanticInfo.purity = {}    // Error: Cannot assign to read-only property
	},
})

Deno.test({
	name:
		"parseFileWithSemantics - edge case: handles various TypeScript features",
	sanitizeResources: false,
	sanitizeOps: false,
	async fn() {
		const result = await parseFileWithSemantics(
			"src/parseFile/test-fixtures/valid.ts",
		)

		assert(isOk(result), "Should parse TypeScript with various features")

		const ast = fold<ParseError, SemanticAst | null>(
			function handleError(_err) {
				return null
			},
		)(function handleSuccess(semanticAst: SemanticAst) {
			return semanticAst
		})(result)

		assertExists(ast, "AST should exist")
		assert(ast!.sourceText.length > 0, "Should have non-empty source text")
	},
})

Deno.test({
	name:
		"parseFileWithSemantics - semantic info provides complete analysis structure",
	sanitizeResources: false,
	sanitizeOps: false,
	async fn() {
		const result = await parseFileWithSemantics(
			"src/parseFile/test-fixtures/valid.ts",
		)

		assert(isOk(result), "Should parse successfully")

		const ast = fold<ParseError, SemanticAst | null>(
			function handleError(_err) {
				return null
			},
		)(function handleSuccess(semanticAst: SemanticAst) {
			return semanticAst
		})(result)

		assertExists(ast, "AST should exist")
		const info = ast!.semanticInfo

		// Verify all semantic analysis components are present
		assertExists(info.inferredTypes, "Should provide type inference")
		assertExists(info.purity, "Should provide purity analysis")
		assertExists(info.complexity, "Should provide complexity metrics")
		assertExists(
			info.mathematicalProperties,
			"Should provide mathematical properties",
		)
		assertExists(info.symbolTable, "Should provide symbol table")
		assertExists(info.diagnostics, "Should provide diagnostics")
		assertExists(info.typeDependencies, "Should provide type dependencies")

		// Verify types are correct
		assertEquals(
			info.inferredTypes instanceof Map,
			true,
			"inferredTypes should be a Map",
		)
		assertEquals(
			info.symbolTable instanceof Map,
			true,
			"symbolTable should be a Map",
		)
		assertEquals(
			info.typeDependencies instanceof Map,
			true,
			"typeDependencies should be a Map",
		)
		assertEquals(
			Array.isArray(info.diagnostics),
			true,
			"diagnostics should be an array",
		)
	},
})
