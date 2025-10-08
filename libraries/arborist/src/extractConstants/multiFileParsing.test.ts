// @sitebender/arborist/src/extractConstants/multiFileParsing.test.ts
// Tests to verify that the SWC WASM span offset accumulation bug is fixed
// This test parses multiple files in sequence without reinitializing SWC

import { assertEquals } from "jsr:@std/assert@1.0.14"
import { default as initSwc, parse } from "npm:@swc/wasm-web@1.13.20"

import type { ParsedAst } from "../types/index.ts"

import extractConstants from "./index.ts"

// Initialize SWC WASM once for all tests
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

Deno.test("extractConstants - multi-file parsing without SWC reinitialization", async () => {
	// Parse first file
	const ast1 = await createParsedAst(`
		const FIRST_VALUE = 42
		export const FIRST_STRING = "hello"
	`)

	const validation1 = extractConstants(ast1)
	assertEquals(validation1._tag, "Success")
	if (validation1._tag === "Success") {
		assertEquals(validation1.value.length, 2)
		assertEquals(validation1.value[0].name, "FIRST_VALUE")
		assertEquals(validation1.value[0].value, "42")
		assertEquals(validation1.value[1].name, "FIRST_STRING")
		assertEquals(validation1.value[1].value, '"hello"')
	}

	// Parse second file (without reinitializing SWC)
	const ast2 = await createParsedAst(`
		const SECOND_VALUE = 100
		export const SECOND_STRING = "world"
	`)

	const validation2 = extractConstants(ast2)
	assertEquals(validation2._tag, "Success")
	if (validation2._tag === "Success") {
		assertEquals(validation2.value.length, 2)
		assertEquals(validation2.value[0].name, "SECOND_VALUE")
		assertEquals(validation2.value[0].value, "100")
		assertEquals(validation2.value[1].name, "SECOND_STRING")
		assertEquals(validation2.value[1].value, '"world"')
	}

	// Parse third file with complex values
	const ast3 = await createParsedAst(`
		const CONFIG = { port: 3000, host: "localhost" }
		const ITEMS = [1, 2, 3]
		const COMPUTED = 10 * 20
	`)

	const validation3 = extractConstants(ast3)
	assertEquals(validation3._tag, "Success")
	if (validation3._tag === "Success") {
		assertEquals(validation3.value.length, 3)
		assertEquals(validation3.value[0].name, "CONFIG")
		assertEquals(
			validation3.value[0].value,
			'{ port: 3000, host: "localhost" }',
		)
		assertEquals(validation3.value[1].name, "ITEMS")
		assertEquals(validation3.value[1].value, "[1, 2, 3]")
		assertEquals(validation3.value[2].name, "COMPUTED")
		assertEquals(validation3.value[2].value, "10 * 20")
	}
})

Deno.test("extractConstants - multi-file with type annotations", async () => {
	// Parse first file with type annotation
	const ast1 = await createParsedAst(`
		const PORT: number = 8080
	`)

	const validation1 = extractConstants(ast1)
	assertEquals(validation1._tag, "Success")
	if (validation1._tag === "Success") {
		assertEquals(validation1.value[0].name, "PORT")
		assertEquals(validation1.value[0].type, "number")
		assertEquals(validation1.value[0].value, "8080")
	}

	// Parse second file with different type annotation
	const ast2 = await createParsedAst(`
		const NAME: string = "test"
	`)

	const validation2 = extractConstants(ast2)
	assertEquals(validation2._tag, "Success")
	if (validation2._tag === "Success") {
		assertEquals(validation2.value[0].name, "NAME")
		assertEquals(validation2.value[0].type, "string")
		assertEquals(validation2.value[0].value, '"test"')
	}

	// Parse third file with complex type annotation
	const ast3 = await createParsedAst(`
		const ITEMS: ReadonlyArray<string> = ["a", "b"]
	`)

	const validation3 = extractConstants(ast3)
	assertEquals(validation3._tag, "Success")
	if (validation3._tag === "Success") {
		assertEquals(validation3.value[0].name, "ITEMS")
		assertEquals(validation3.value[0].type, "ReadonlyArray<string>")
		assertEquals(validation3.value[0].value, '["a", "b"]')
	}
})

Deno.test("extractConstants - multi-file with various literal types", async () => {
	// Parse file with null
	const ast1 = await createParsedAst(`const NULL_VALUE = null`)
	const validation1 = extractConstants(ast1)
	assertEquals(validation1._tag, "Success")
	if (validation1._tag === "Success") {
		assertEquals(validation1.value[0].value, "null")
	}

	// Parse file with undefined
	const ast2 = await createParsedAst(`const UNDEF_VALUE = undefined`)
	const validation2 = extractConstants(ast2)
	assertEquals(validation2._tag, "Success")
	if (validation2._tag === "Success") {
		assertEquals(validation2.value[0].value, "undefined")
	}

	// Parse file with boolean
	const ast3 = await createParsedAst(`const BOOL_VALUE = true`)
	const validation3 = extractConstants(ast3)
	assertEquals(validation3._tag, "Success")
	if (validation3._tag === "Success") {
		assertEquals(validation3.value[0].value, "true")
	}

	// Parse file with template literal
	const ast4 = await createParsedAst("const TEMPLATE = `Hello, World!`")
	const validation4 = extractConstants(ast4)
	assertEquals(validation4._tag, "Success")
	if (validation4._tag === "Success") {
		assertEquals(validation4.value[0].value, "`Hello, World!`")
	}
})
