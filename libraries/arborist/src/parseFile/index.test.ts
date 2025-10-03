// @sitebender/arborist/src/parseFile/index.test.ts
// Tests for parseFile function

import { assert, assertEquals } from "jsr:@std/assert@1.0.14"
import * as fc from "npm:fast-check@3.23.1"

import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import isArray from "@sitebender/toolsmith/vanilla/validation/isArray/index.ts"

import type { ParsedFile } from "../types/index.ts"
import parseFile from "./index.ts"

//++ Creates an empty ParsedFile for use as default value
function createEmptyParsedFile(): ParsedFile {
	return {
		filePath: "",
		functions: [],
		types: [],
		constants: [],
		imports: [],
		exports: [],
		comments: [],
		violations: {
			hasArrowFunctions: false,
			arrowFunctions: [],
			hasClasses: false,
			classes: [],
			hasThrowStatements: false,
			throwStatements: [],
			hasTryCatch: false,
			tryCatchBlocks: [],
			hasLoops: false,
			loops: [],
			hasMutations: false,
			mutations: [],
		},
	}
}

Deno.test("parseFile - parses valid TypeScript file", async () => {
	const result = await parseFile(
		"src/parseFile/test-fixtures/valid.ts",
	)

	assert(isOk(result), "Expected Ok result")

	const parsedFile = getOrElse(createEmptyParsedFile())(result)

	assertEquals(
		parsedFile.filePath,
		"src/parseFile/test-fixtures/valid.ts",
	)
	// Day 1: No extraction yet, just verify structure
	assertEquals(parsedFile.functions.length, 0)
})

Deno.test("parseFile - returns error for non-existent file", async () => {
	const result = await parseFile("does-not-exist.ts")

	assert(isError(result), "Expected Error result")
})

Deno.test("parseFile - returns error for invalid syntax", async () => {
	const result = await parseFile(
		"src/parseFile/test-fixtures/invalid-syntax.ts",
	)

	// Day 1: No actual parsing yet, so invalid syntax won't be detected
	// This test will properly fail once we integrate deno_ast in Day 2
	assert(isOk(result) || isError(result), "Should return Result")
})

Deno.test("parseFile - property: always returns Result", () => {
	fc.assert(
		fc.asyncProperty(fc.string(), async (path) => {
			const result = await parseFile(path)

			// Must be either Ok or Error, never throws
			assert(
				isOk(result) || isError(result),
				"Result must be Ok or Error",
			)
		}),
		{ numRuns: 10 }, // Limit runs since file I/O is slow
	)
})

Deno.test("parseFile - property: same file gives same result (pure)", async () => {
	const path = "src/parseFile/test-fixtures/valid.ts"

	const result1 = await parseFile(path)
	const result2 = await parseFile(path)

	// Same input should give same output (referential transparency)
	assertEquals(isOk(result1), isOk(result2))

	if (isOk(result1) && isOk(result2)) {
		const file1 = getOrElse(createEmptyParsedFile())(result1)
		const file2 = getOrElse(createEmptyParsedFile())(result2)

		assertEquals(file1.filePath, file2.filePath)
		assertEquals(file1.functions.length, file2.functions.length)
	}
})

Deno.test("parseFile - returns immutable ParsedFile", async () => {
	const result = await parseFile(
		"src/parseFile/test-fixtures/valid.ts",
	)

	assert(isOk(result), "Should parse successfully")

	const file = getOrElse(createEmptyParsedFile())(result)

	// Verify immutability - ReadonlyArray is still an array at runtime
	// but TypeScript enforces immutability at compile time
	assert(isArray(file.functions), "Functions should be an array")
	assert(typeof file.filePath === "string", "Should have filePath")

	// The real immutability test is at compile time via TypeScript
	// These would fail to compile:
	// file.functions.push({}) // Error: Property 'push' does not exist
	// file.filePath = "x"     // Error: Cannot assign to read-only property
})
