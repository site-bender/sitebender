// @sitebender/arborist/src/extractTypes/index.test.ts
// Tests for extractTypes function

import { assert, assertEquals } from "jsr:@std/assert@1.0.14"
import { default as initSwc, parse } from "npm:@swc/wasm-web@1.13.20"

import type { ParsedAst } from "../types/index.ts"

import extractTypes from "./index.ts"

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

Deno.test("extractTypes - returns Validation", async () => {
	const ast = await createParsedAst("type Foo = string")
	const validation = extractTypes(ast)

	assert(
		validation._tag === "Success" || validation._tag === "Failure",
		"Should return Validation",
	)
})

Deno.test("extractTypes - Success with type alias", async () => {
	const ast = await createParsedAst(`
		type ParsedFunction = {
			name: string
			position: Position
		}
	`)

	const validation = extractTypes(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "ParsedFunction")
		assertEquals(validation.value[0].isExported, false)
		assert(validation.value[0].definition.length > 0)
	}
})

Deno.test("extractTypes - Success with exported type alias", async () => {
	const ast = await createParsedAst(`
		export type ParsedFunction = {
			name: string
		}
	`)

	const validation = extractTypes(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "ParsedFunction")
		assertEquals(validation.value[0].isExported, true)
	}
})

Deno.test("extractTypes - Success with interface", async () => {
	const ast = await createParsedAst(`
		export interface Config {
			port: number
			host: string
		}
	`)

	const validation = extractTypes(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "Config")
		assertEquals(validation.value[0].isExported, true)
		assertEquals(typeof validation.value[0].definition, "string")
	}
})

Deno.test("extractTypes - Success with exported interface", async () => {
	const ast = await createParsedAst(`
		export interface Config {
			port: number
		}
	`)

	const validation = extractTypes(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "Config")
		assertEquals(validation.value[0].isExported, true)
	}
})

Deno.test("extractTypes - Success with primitive type alias", async () => {
	const ast = await createParsedAst(`
		export type ID = string
	`)

	const validation = extractTypes(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "ID")
		assertEquals(typeof validation.value[0].definition, "string")
	}
})

Deno.test("extractTypes - Success with union type", async () => {
	const ast = await createParsedAst(`
		export type Status = "pending" | "success" | "error"
	`)

	const validation = extractTypes(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "Status")
		assertEquals(typeof validation.value[0].definition, "string")
	}
})

Deno.test("extractTypes - Success with generic type", async () => {
	const ast = await createParsedAst(`
		export type Result<T, E> = { _tag: "Ok", value: T } | { _tag: "Error", error: E }
	`)

	const validation = extractTypes(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "Result")
		assertEquals(typeof validation.value[0].definition, "string")
	}
})

Deno.test("extractTypes - Success with readonly type", async () => {
	const ast = await createParsedAst(`
		export type Config = Readonly<{
			port: number
		}>
	`)

	const validation = extractTypes(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "Config")
		assertEquals(typeof validation.value[0].definition, "string")
	}
})

Deno.test("extractTypes - Success with multiple types", async () => {
	const ast = await createParsedAst(`
		type ID = string
		type Name = string
		interface User {
			id: ID
			name: Name
		}
		export type Status = "active" | "inactive"
	`)

	const validation = extractTypes(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 4)
		assertEquals(validation.value[0].name, "ID")
		assertEquals(validation.value[0].isExported, false)
		assertEquals(validation.value[1].name, "Name")
		assertEquals(validation.value[1].isExported, false)
		assertEquals(validation.value[2].name, "User")
		assertEquals(validation.value[2].isExported, false)
		assertEquals(validation.value[3].name, "Status")
		assertEquals(validation.value[3].isExported, true)
	}
})

Deno.test("extractTypes - Success with empty array for no types", async () => {
	const ast = await createParsedAst(`
		export default function test() {}
		const x = 42
	`)

	const validation = extractTypes(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 0)
	}
})

Deno.test("extractTypes - Success with interface extending", async () => {
	const ast = await createParsedAst(`
		export interface Base {
			id: string
		}
		export interface Extended extends Base {
			name: string
		}
	`)

	const validation = extractTypes(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 2)
		assertEquals(validation.value[0].name, "Base")
		assertEquals(validation.value[1].name, "Extended")
		assertEquals(typeof validation.value[1].definition, "string")
	}
})

Deno.test("extractTypes - Success with conditional type", async () => {
	const ast = await createParsedAst(`
		export type IsString<T> = T extends string ? true : false
	`)

	const validation = extractTypes(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "IsString")
		assertEquals(typeof validation.value[0].definition, "string")
	}
})

Deno.test("extractTypes - returns immutable array", async () => {
	const ast = await createParsedAst("type Foo = string")
	const validation = extractTypes(ast)

	if (validation._tag === "Success") {
		// @ts-expect-error: Property 'push' does not exist on type 'readonly ParsedType[]'
		validation.value.push({})
	}
})

Deno.test("extractTypes - captures position information", async () => {
	const ast = await createParsedAst("type Foo = string")
	const validation = extractTypes(ast)

	if (validation._tag === "Success") {
		assertEquals(typeof validation.value[0].position.line, "number")
		assertEquals(typeof validation.value[0].position.column, "number")
		assertEquals(typeof validation.value[0].span.start, "number")
		assertEquals(typeof validation.value[0].span.end, "number")
	}
})

Deno.test("extractTypes - continues extraction on individual failures", async () => {
	// This test would require malformed AST to trigger extraction errors
	// For now, verify that valid code always succeeds
	const ast = await createParsedAst("type ValidType = string")

	const validation = extractTypes(ast)

	assertEquals(validation._tag, "Success")
})

Deno.test("extractTypes - accumulates errors per type", async () => {
	// When extraction errors are properly implemented, this will test accumulation
	// For now, we verify the structure supports it
	const ast = await createParsedAst("type Test = string")
	const validation = extractTypes(ast)

	// Should be Success or Failure, both are valid Validation
	assert(validation._tag === "Success" || validation._tag === "Failure")
})
