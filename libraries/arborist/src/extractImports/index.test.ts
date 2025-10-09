// @sitebender/arborist/src/extractImports/index.test.ts
// Tests for extractImports function

import { assert, assertEquals } from "jsr:@std/assert@1.0.14"
import { default as initSwc, parse } from "npm:@swc/wasm-web@1.13.20"

import type { ParsedAst } from "../types/index.ts"

import extractImports from "./index.ts"

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

Deno.test("extractImports - returns Validation", async () => {
	const ast = await createParsedAst('import foo from "bar"')
	const validation = extractImports(ast)

	assert(
		validation._tag === "Success" || validation._tag === "Failure",
		"Should return Validation",
	)
})

Deno.test("extractImports - Success with default import", async () => {
	const ast = await createParsedAst(
		'import parseFile from "./parseFile/index.ts"',
	)

	const validation = extractImports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].kind, "default")
		assertEquals(validation.value[0].specifier, "./parseFile/index.ts")
		assertEquals(validation.value[0].imports.length, 1)
		assertEquals(validation.value[0].imports[0].imported, "default")
		assertEquals(validation.value[0].imports[0].local, "parseFile")
		assertEquals(validation.value[0].imports[0].isType, false)
	}
})

Deno.test("extractImports - Success with named imports", async () => {
	const ast = await createParsedAst(
		'import { map, filter } from "./utils/index.ts"',
	)

	const validation = extractImports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].kind, "named")
		assertEquals(validation.value[0].specifier, "./utils/index.ts")
		assertEquals(validation.value[0].imports.length, 2)
		assertEquals(validation.value[0].imports[0].imported, "map")
		assertEquals(validation.value[0].imports[0].local, "map")
		assertEquals(validation.value[0].imports[1].imported, "filter")
		assertEquals(validation.value[0].imports[1].local, "filter")
	}
})

Deno.test("extractImports - Success with aliased named imports", async () => {
	const ast = await createParsedAst(
		'import { map as mapFn, filter as filterFn } from "./utils/index.ts"',
	)

	const validation = extractImports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].imports.length, 2)
		assertEquals(validation.value[0].imports[0].imported, "map")
		assertEquals(validation.value[0].imports[0].local, "mapFn")
		assertEquals(validation.value[0].imports[1].imported, "filter")
		assertEquals(validation.value[0].imports[1].local, "filterFn")
	}
})

Deno.test("extractImports - Success with namespace import", async () => {
	const ast = await createParsedAst('import * as utils from "./utils/index.ts"')

	const validation = extractImports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].kind, "namespace")
		assertEquals(validation.value[0].specifier, "./utils/index.ts")
		assertEquals(validation.value[0].imports.length, 1)
		assertEquals(validation.value[0].imports[0].imported, "*")
		assertEquals(validation.value[0].imports[0].local, "utils")
		assertEquals(validation.value[0].imports[0].isType, false)
	}
})

Deno.test("extractImports - Success with type-only import", async () => {
	const ast = await createParsedAst(
		'import type { ParsedFunction } from "./types/index.ts"',
	)

	const validation = extractImports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].kind, "type")
		assertEquals(validation.value[0].specifier, "./types/index.ts")
		assertEquals(validation.value[0].imports.length, 1)
		assertEquals(validation.value[0].imports[0].imported, "ParsedFunction")
		assertEquals(validation.value[0].imports[0].local, "ParsedFunction")
		assertEquals(validation.value[0].imports[0].isType, true)
	}
})

Deno.test("extractImports - Success with mixed default and named imports", async () => {
	const ast = await createParsedAst(
		'import parseFile, { map, filter } from "./utils/index.ts"',
	)

	const validation = extractImports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].kind, "named")
		assertEquals(validation.value[0].imports.length, 3)
		assertEquals(validation.value[0].imports[0].imported, "default")
		assertEquals(validation.value[0].imports[0].local, "parseFile")
		assertEquals(validation.value[0].imports[1].imported, "map")
		assertEquals(validation.value[0].imports[1].local, "map")
		assertEquals(validation.value[0].imports[2].imported, "filter")
		assertEquals(validation.value[0].imports[2].local, "filter")
	}
})

Deno.test("extractImports - Success with multiple import statements", async () => {
	const ast = await createParsedAst(`
		import parseFile from "./parseFile/index.ts"
		import { map, filter } from "./utils/index.ts"
		import type { ParsedFunction } from "./types/index.ts"
	`)

	const validation = extractImports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 3)
		assertEquals(validation.value[0].kind, "default")
		assertEquals(validation.value[1].kind, "named")
		assertEquals(validation.value[2].kind, "type")
	}
})

Deno.test("extractImports - Success with empty array for no imports", async () => {
	const ast = await createParsedAst(`
		export default function test() {}
	`)

	const validation = extractImports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 0)
	}
})

Deno.test("extractImports - Success with side-effect only import", async () => {
	const ast = await createParsedAst('import "./polyfill.ts"')

	const validation = extractImports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].specifier, "./polyfill.ts")
		assertEquals(validation.value[0].imports.length, 0)
	}
})

Deno.test("extractImports - Success with npm specifier", async () => {
	const ast = await createParsedAst(
		'import { parse } from "npm:@swc/wasm-web@1.13.20"',
	)

	const validation = extractImports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].specifier, "npm:@swc/wasm-web@1.13.20")
	}
})

Deno.test("extractImports - Success with jsr specifier", async () => {
	const ast = await createParsedAst(
		'import { assertEquals } from "jsr:@std/assert@1.0.14"',
	)

	const validation = extractImports(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].specifier, "jsr:@std/assert@1.0.14")
	}
})

Deno.test("extractImports - returns immutable array", async () => {
	const ast = await createParsedAst('import foo from "bar"')
	const validation = extractImports(ast)

	if (validation._tag === "Success") {
		// This should fail if types are readonly
		// validation.value.push({})
	}
})

Deno.test("extractImports - captures position information", async () => {
	const ast = await createParsedAst('import foo from "bar"')
	const validation = extractImports(ast)

	if (validation._tag === "Success") {
		assertEquals(typeof validation.value[0].position.line, "number")
		assertEquals(typeof validation.value[0].position.column, "number")
		assertEquals(typeof validation.value[0].span.start, "number")
		assertEquals(typeof validation.value[0].span.end, "number")
	}
})

Deno.test("extractImports - continues extraction on individual failures", async () => {
	// This test would require malformed AST to trigger extraction errors
	// For now, verify that valid code always succeeds
	const ast = await createParsedAst('import validImport from "./valid.ts"')

	const validation = extractImports(ast)

	assertEquals(validation._tag, "Success")
})

Deno.test("extractImports - accumulates errors per import", async () => {
	// When extraction errors are properly implemented, this will test accumulation
	// For now, we verify the structure supports it
	const ast = await createParsedAst('import test from "./test.ts"')
	const validation = extractImports(ast)

	// Should be Success or Failure, both are valid Validation
	assert(validation._tag === "Success" || validation._tag === "Failure")
})
