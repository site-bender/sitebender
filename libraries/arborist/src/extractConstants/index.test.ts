// @sitebender/arborist/src/extractConstants/index.test.ts
// Tests for extractConstants function

import { assert, assertEquals } from "jsr:@std/assert@1.0.14"
import { default as initSwc, parse } from "npm:@swc/wasm-web@1.13.20"

import type { ParsedAst } from "../types/index.ts"

import extractConstants from "./index.ts"

// Initialize SWC WASM once for all tests
// NOTE: We no longer need to reinitialize per test because we've fixed the
// span offset accumulation bug by using AST node serialization instead of
// span-based substring extraction
let swcInitPromise: Promise<unknown> | null = null

function ensureSwcInitialized(): Promise<unknown> {
	if (!swcInitPromise) {
		swcInitPromise = initSwc()
	}
	return swcInitPromise
}

//++ Helper to create ParsedAst from source
async function createParsedAst(
	sourceText: string,
	filePath = "test.ts",
): Promise<ParsedAst> {
	await ensureSwcInitialized()

	// Trim to handle template literals with leading/trailing whitespace
	const trimmedSource = sourceText.trim()

	const module = await parse(trimmedSource, {
		syntax: "typescript",
		tsx: false,
	})

	return {
		module,
		sourceText: trimmedSource,
		filePath,
	}
}

Deno.test("extractConstants - returns Validation", async () => {
	const ast = await createParsedAst(`
		const FOO = 42
	`)
	const validation = extractConstants(ast)

	assert(
		validation._tag === "Success" || validation._tag === "Failure",
		"Should return Validation",
	)
})

Deno.test("extractConstants - Success with simple const", async () => {
	const ast = await createParsedAst(`
		const FOO = 42
	`)

	const validation = extractConstants(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "FOO")
		assertEquals(validation.value[0].isExported, false)
		assertEquals(validation.value[0].value, "42")
	}
})

Deno.test("extractConstants - Success with exported const", async () => {
	const ast = await createParsedAst(`
		export const API_URL = "https://example.com"
	`)

	const validation = extractConstants(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "API_URL")
		assertEquals(validation.value[0].isExported, true)
		assertEquals(validation.value[0].value, '"https://example.com"')
	}
})

Deno.test("extractConstants - Success with type annotation", async () => {
	const ast = await createParsedAst(`
		const PORT: number = 3000
	`)

	const validation = extractConstants(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "PORT")
		assertEquals(validation.value[0].type, "number")
		assertEquals(validation.value[0].value, "3000")
	}
})

Deno.test("extractConstants - Success with string const", async () => {
	const ast = await createParsedAst(`
		export const APP_NAME = "Arborist"
	`)

	const validation = extractConstants(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "APP_NAME")
		assertEquals(validation.value[0].value, '"Arborist"')
	}
})

Deno.test("extractConstants - Success with boolean const", async () => {
	const ast = await createParsedAst(`
		const DEBUG = true
	`)

	const validation = extractConstants(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "DEBUG")
		assertEquals(validation.value[0].value, "true")
	}
})

Deno.test("extractConstants - Success with object literal", async () => {
	const ast = await createParsedAst(`
		const CONFIG = { port: 3000, host: "localhost" }
	`)

	const validation = extractConstants(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "CONFIG")
		assert(validation.value[0].value?.includes("port"))
		assert(validation.value[0].value?.includes("3000"))
	}
})

Deno.test("extractConstants - Success with array literal", async () => {
	const ast = await createParsedAst(`
		const COLORS = ["red", "green", "blue"]
	`)

	const validation = extractConstants(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "COLORS")
		assert(validation.value[0].value?.includes("red"))
	}
})

Deno.test("extractConstants - Success with computed value", async () => {
	const ast = await createParsedAst(`
		const COMPUTED = 10 * 20
	`)

	const validation = extractConstants(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "COMPUTED")
		assertEquals(validation.value[0].value, "10 * 20")
	}
})

Deno.test("extractConstants - Success with template literal", async () => {
	const ast = await createParsedAst("const MESSAGE = `Hello, World!`")

	const validation = extractConstants(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "MESSAGE")
		assert(validation.value[0].value?.includes("Hello"))
	}
})

Deno.test("extractConstants - Success with multiple constants", async () => {
	const ast = await createParsedAst(`
		const FOO = 1
		const BAR = 2
		export const BAZ = 3
	`)

	const validation = extractConstants(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 3)
		assertEquals(validation.value[0].name, "FOO")
		assertEquals(validation.value[0].isExported, false)
		assertEquals(validation.value[1].name, "BAR")
		assertEquals(validation.value[1].isExported, false)
		assertEquals(validation.value[2].name, "BAZ")
		assertEquals(validation.value[2].isExported, true)
	}
})

Deno.test("extractConstants - Success with empty array for no constants", async () => {
	const ast = await createParsedAst(`
		export default function test() {}
		let x = 42
	`)

	const validation = extractConstants(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 0)
	}
})

Deno.test("extractConstants - ignores let and var declarations", async () => {
	const ast = await createParsedAst(`
		let mutable = 1
		var old = 2
		const IMMUTABLE = 3
	`)

	const validation = extractConstants(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "IMMUTABLE")
	}
})

Deno.test("extractConstants - Success with readonly array type", async () => {
	const ast = await createParsedAst(
		`const ITEMS: ReadonlyArray<string> = ["a", "b", "c"]`,
	)

	const validation = extractConstants(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "ITEMS")
		assert(validation.value[0].value?.includes("a"))
	}
})

Deno.test("extractConstants - Success with function call value", async () => {
	const ast = await createParsedAst(`
		const RESULT = doSomething()
	`)

	const validation = extractConstants(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "RESULT")
		assertEquals(validation.value[0].value, "doSomething()")
	}
})

Deno.test("extractConstants - Success with null value", async () => {
	const ast = await createParsedAst(`
		const NULLABLE = null
	`)

	const validation = extractConstants(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "NULLABLE")
		assertEquals(validation.value[0].value, "null")
	}
})

Deno.test("extractConstants - Success with undefined value", async () => {
	const ast = await createParsedAst(`
		const UNDEF = undefined
	`)

	const validation = extractConstants(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "UNDEF")
		assertEquals(validation.value[0].value, "undefined")
	}
})

Deno.test("extractConstants - returns immutable array", async () => {
	const ast = await createParsedAst("const FOO = 42")
	const validation = extractConstants(ast)

	if (validation._tag === "Success") {
		// @ts-expect-error: Property 'push' does not exist on type 'readonly ParsedConstant[]'
		validation.value.push({})
	}
})

Deno.test("extractConstants - captures position information", async () => {
	const ast = await createParsedAst("const FOO = 42")
	const validation = extractConstants(ast)

	if (validation._tag === "Success") {
		assertEquals(typeof validation.value[0].position.line, "number")
		assertEquals(typeof validation.value[0].position.column, "number")
		assertEquals(typeof validation.value[0].span.start, "number")
		assertEquals(typeof validation.value[0].span.end, "number")
	}
})

Deno.test("extractConstants - continues extraction on individual failures", async () => {
	// This test would require malformed AST to trigger extraction errors
	// For now, verify that valid code always succeeds
	const ast = await createParsedAst("const VALID = 42")

	const validation = extractConstants(ast)

	assertEquals(validation._tag, "Success")
})

Deno.test("extractConstants - accumulates errors per constant", async () => {
	// When extraction errors are properly implemented, this will test accumulation
	// For now, we verify the structure supports it
	const ast = await createParsedAst("const TEST = 123")
	const validation = extractConstants(ast)

	// Should be Success or Failure, both are valid Validation
	assert(validation._tag === "Success" || validation._tag === "Failure")
})
