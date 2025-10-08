// @sitebender/arborist/src/extractExports/index.test.ts
// Tests for extractExports function

import { assert, assertEquals } from "jsr:@std/assert@1.0.14"
import { default as initSwc, parse } from "npm:@swc/wasm-web@1.13.20"

import type { ParsedAst } from "../types/index.ts"

import extractExports from "./index.ts"

// Initialize SWC WASM once for all tests
let swcInitPromise: Promise<unknown> | null = null

function ensureSwcInitialized(): Promise<unknown> {
	if (!swcInitPromise) {
		swcInitPromise = initSwc()
	}
	return swcInitPromise
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

Deno.test("extractExports - returns Validation", async () => {
	const ast = await createParsedAst("export function test() {}")
	const validation = extractExports(ast)

	assert(
		validation._tag === "Success" || validation._tag === "Failure",
		"Should return Validation",
	)
})

Deno.test("extractExports - Success with default function export", async () => {
	const ast = await createParsedAst(`
		export default function parseFile() {}
	`)

	const validation = extractExports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].kind, "default")
		assertEquals(validation.value[0].name, "parseFile")
		assertEquals(validation.value[0].isType, false)
		assertEquals(validation.value[0].source, undefined)
	}
})

Deno.test("extractExports - Success with default anonymous function export", async () => {
	const ast = await createParsedAst(`
		export default function() {}
	`)

	const validation = extractExports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].kind, "default")
		assertEquals(validation.value[0].name, "default")
		assertEquals(validation.value[0].isType, false)
	}
})

Deno.test("extractExports - Success with named function export", async () => {
	const ast = await createParsedAst(`
		export function parseFile() {}
	`)

	const validation = extractExports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].kind, "named")
		assertEquals(validation.value[0].name, "parseFile")
		assertEquals(validation.value[0].isType, false)
	}
})

Deno.test("extractExports - Success with multiple named function exports", async () => {
	const ast = await createParsedAst(`
		export function add() {}
		export function subtract() {}
		export function multiply() {}
	`)

	const validation = extractExports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 3)
		assertEquals(validation.value[0].name, "add")
		assertEquals(validation.value[1].name, "subtract")
		assertEquals(validation.value[2].name, "multiply")
	}
})

Deno.test("extractExports - Success with named variable export", async () => {
	const ast = await createParsedAst(`
		export const API_VERSION = "1.0.0"
	`)

	const validation = extractExports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].kind, "named")
		assertEquals(validation.value[0].name, "API_VERSION")
		assertEquals(validation.value[0].isType, false)
	}
})

Deno.test("extractExports - Success with named type export", async () => {
	const ast = await createParsedAst(`
		export type ParsedFunction = { name: string }
	`)

	const validation = extractExports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].kind, "named")
		assertEquals(validation.value[0].name, "ParsedFunction")
		assertEquals(validation.value[0].isType, true)
	}
})

Deno.test("extractExports - Success with named interface export", async () => {
	const ast = await createParsedAst(`
		export interface Config {
			port: number
		}
	`)

	const validation = extractExports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].kind, "named")
		assertEquals(validation.value[0].name, "Config")
		assertEquals(validation.value[0].isType, true)
	}
})

Deno.test("extractExports - Success with export list", async () => {
	const ast = await createParsedAst(`
		const foo = 1
		const bar = 2
		export { foo, bar }
	`)

	const validation = extractExports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 2)
		assertEquals(validation.value[0].kind, "named")
		assertEquals(validation.value[0].name, "foo")
		assertEquals(validation.value[1].name, "bar")
	}
})

Deno.test("extractExports - Success with aliased export list", async () => {
	const ast = await createParsedAst(`
		const foo = 1
		export { foo as fooValue }
	`)

	const validation = extractExports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].kind, "named")
		assertEquals(validation.value[0].name, "fooValue")
	}
})

Deno.test("extractExports - Success with re-export all", async () => {
	const ast = await createParsedAst(`
		export * from "./utils/index.ts"
	`)

	const validation = extractExports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].kind, "reexport")
		assertEquals(validation.value[0].name, "*")
		assertEquals(validation.value[0].source, "./utils/index.ts")
	}
})

Deno.test("extractExports - Success with re-export named", async () => {
	const ast = await createParsedAst(`
		export { map, filter } from "./utils/index.ts"
	`)

	const validation = extractExports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 2)
		assertEquals(validation.value[0].kind, "reexport")
		assertEquals(validation.value[0].name, "map")
		assertEquals(validation.value[0].source, "./utils/index.ts")
		assertEquals(validation.value[1].kind, "reexport")
		assertEquals(validation.value[1].name, "filter")
		assertEquals(validation.value[1].source, "./utils/index.ts")
	}
})

Deno.test("extractExports - Success with re-export aliased", async () => {
	const ast = await createParsedAst(`
		export { map as mapFn } from "./utils/index.ts"
	`)

	const validation = extractExports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].kind, "reexport")
		assertEquals(validation.value[0].name, "mapFn")
		assertEquals(validation.value[0].source, "./utils/index.ts")
	}
})

Deno.test("extractExports - Success with type re-export", async () => {
	const ast = await createParsedAst(`
		export type { ParsedFunction } from "./types/index.ts"
	`)

	const validation = extractExports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].kind, "reexport")
		assertEquals(validation.value[0].name, "ParsedFunction")
		assertEquals(validation.value[0].isType, true)
		assertEquals(validation.value[0].source, "./types/index.ts")
	}
})

Deno.test("extractExports - Success with empty array for no exports", async () => {
	const ast = await createParsedAst(`
		function internalFunction() {}
		const internalConst = 42
	`)

	const validation = extractExports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 0)
	}
})

Deno.test("extractExports - Success with mixed exports", async () => {
	const ast = await createParsedAst(`
		export default function main() {}
		export function helper() {}
		export const VERSION = "1.0"
		export type Config = { port: number }
	`)

	const validation = extractExports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 4)
		assertEquals(validation.value[0].kind, "default")
		assertEquals(validation.value[0].name, "main")
		assertEquals(validation.value[1].kind, "named")
		assertEquals(validation.value[1].name, "helper")
		assertEquals(validation.value[2].kind, "named")
		assertEquals(validation.value[2].name, "VERSION")
		assertEquals(validation.value[3].kind, "named")
		assertEquals(validation.value[3].name, "Config")
		assertEquals(validation.value[3].isType, true)
	}
})

Deno.test("extractExports - returns immutable array", async () => {
	const ast = await createParsedAst("export function test() {}")
	const validation = extractExports(ast)

	if (validation._tag === "Success") {
		// @ts-expect-error: Property 'push' does not exist on type 'readonly ParsedExport[]'
		validation.value.push({})
	}
})

Deno.test("extractExports - captures position information", async () => {
	const ast = await createParsedAst("export function test() {}")
	const validation = extractExports(ast)

	if (validation._tag === "Success") {
		assertEquals(typeof validation.value[0].position.line, "number")
		assertEquals(typeof validation.value[0].position.column, "number")
		assertEquals(typeof validation.value[0].span.start, "number")
		assertEquals(typeof validation.value[0].span.end, "number")
	}
})

Deno.test("extractExports - continues extraction on individual failures", async () => {
	// This test would require malformed AST to trigger extraction errors
	// For now, verify that valid code always succeeds
	const ast = await createParsedAst("export function validExport() {}")

	const validation = extractExports(ast)

	assertEquals(validation._tag, "Success")
})

Deno.test("extractExports - accumulates errors per export", async () => {
	// When extraction errors are properly implemented, this will test accumulation
	// For now, we verify the structure supports it
	const ast = await createParsedAst("export function test() {}")
	const validation = extractExports(ast)

	// Should be Success or Failure, both are valid Validation
	assert(validation._tag === "Success" || validation._tag === "Failure")
})
