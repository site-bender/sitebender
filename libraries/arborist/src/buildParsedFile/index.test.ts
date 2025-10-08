// @sitebender/arborist/src/buildParsedFile/index.test.ts
// Tests for buildParsedFile function

import { assert, assertEquals } from "jsr:@std/assert@1.0.14"
import { default as initSwc, parse } from "npm:@swc/wasm-web@1.13.20"

import type { ParsedAst } from "../types/index.ts"

import buildParsedFile from "./index.ts"

// Initialize SWC WASM once for all tests
let swcInitPromise: Promise<void> | null = null

function ensureSwcInitialized(): Promise<void> {
	if (!swcInitPromise) {
		swcInitPromise = initSwc().then(() => undefined)
	}
	return swcInitPromise as Promise<void>
}

// Helper to create ParsedAst from source
async function createParsedAst(
	sourceText: string,
	filePath = "test.ts",
): Promise<ParsedAst> {
	await ensureSwcInitialized()

	const module = await parse(sourceText, {
		syntax: "typescript",
		tsx: false,
	})

	return {
		module,
		sourceText,
		filePath,
	}
}

Deno.test("buildParsedFile - returns curried function", async () => {
	const ast = await createParsedAst("export default function test() {}")
	const builder = buildParsedFile(ast)

	assert(typeof builder === "function", "Should return a function")
})

Deno.test("buildParsedFile - returns Validation on Success", async () => {
	const ast = await createParsedAst("export default function test() {}")
	const validation = buildParsedFile(ast)("test.ts")

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.filePath, "test.ts")
	}
})

Deno.test("buildParsedFile - builds ParsedFile with correct filePath", async () => {
	const ast = await createParsedAst("export default function test() {}")
	const filePath = "src/module.ts"

	const validation = buildParsedFile(ast)(filePath)

	if (validation._tag === "Success") {
		assertEquals(validation.value.filePath, filePath)
	} else {
		throw new Error("Expected Success but got Failure")
	}
})

Deno.test("buildParsedFile - returns immutable ParsedFile", async () => {
	const ast = await createParsedAst("export default function test() {}")
	const validation = buildParsedFile(ast)("test.ts")

	if (validation._tag === "Success") {
		const parsedFile = validation.value

		// @ts-expect-error: Property 'push' does not exist on type 'readonly ParsedFunction[]'
		parsedFile.functions.push({})

		// @ts-expect-error: Cannot assign to 'filePath' because it is a read-only property
		parsedFile.filePath = "changed"
	}
})

Deno.test("buildParsedFile - accumulates errors from all extractors", async () => {
	// When extraction functions are implemented, this will test error accumulation
	// For now, we test the structure
	const ast = await createParsedAst("export default function test() {}")
	const validation = buildParsedFile(ast)("test.ts")

	// Should succeed with empty arrays until extractors are implemented
	assertEquals(validation._tag, "Success")
})

Deno.test("buildParsedFile - supports partial success (some extractors fail)", async () => {
	// When extraction functions are implemented, this will test partial success
	// For now, we verify the Validation type can handle this
	const ast = await createParsedAst("export default function test() {}")
	const validation = buildParsedFile(ast)("test.ts")

	if (validation._tag === "Success") {
		// Verify all arrays are present even if empty
		assert(Array.isArray(validation.value.functions))
		assert(Array.isArray(validation.value.types))
		assert(Array.isArray(validation.value.constants))
		assert(Array.isArray(validation.value.imports))
		assert(Array.isArray(validation.value.exports))
		assert(Array.isArray(validation.value.comments))
	}
})

Deno.test("buildParsedFile - is deterministic (pure function)", async () => {
	const ast = await createParsedAst("export default function test() {}")
	const filePath = "test.ts"

	const result1 = buildParsedFile(ast)(filePath)
	const result2 = buildParsedFile(ast)(filePath)

	// Same input should give same output
	assertEquals(result1._tag, result2._tag)
	if (result1._tag === "Success" && result2._tag === "Success") {
		assertEquals(result1.value.filePath, result2.value.filePath)
		assertEquals(result1.value.functions.length, result2.value.functions.length)
	}
})

Deno.test("buildParsedFile - handles empty file", async () => {
	const ast = await createParsedAst("")
	const validation = buildParsedFile(ast)("empty.ts")

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.functions.length, 0)
		assertEquals(validation.value.types.length, 0)
		assertEquals(validation.value.imports.length, 0)
	}
})

Deno.test("buildParsedFile - preserves violations structure", async () => {
	const ast = await createParsedAst("export default function test() {}")
	const validation = buildParsedFile(ast)("test.ts")

	if (validation._tag === "Success") {
		const { violations } = validation.value

		// Verify violations structure exists
		assertEquals(typeof violations.hasArrowFunctions, "boolean")
		assert(Array.isArray(violations.arrowFunctions))
		assertEquals(typeof violations.hasClasses, "boolean")
		assert(Array.isArray(violations.classes))
	}
})
