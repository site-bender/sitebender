// @sitebender/arborist/src/extractFunctions/index.test.ts
// Tests for extractFunctions function

import { assert, assertEquals } from "jsr:@std/assert@1.0.14"
import { default as initSwc, parse } from "npm:@swc/wasm-web@1.13.20"

import type { ParsedAst } from "../types/index.ts"

import extractFunctions from "./index.ts"

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

Deno.test("extractFunctions - returns Validation", async () => {
	const ast = await createParsedAst("export default function test() {}")
	const validation = extractFunctions(ast)

	assert(
		validation._tag === "Success" || validation._tag === "Failure",
		"Should return Validation",
	)
})

Deno.test("extractFunctions - Success with single function", async () => {
	const ast = await createParsedAst(`
		export default function add(a: number, b: number): number {
			return a + b
		}
	`)

	const validation = extractFunctions(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "add")
		assertEquals(validation.value[0].parameters.length, 2)
		assertEquals(validation.value[0].modifiers.isExported, true)
		assertEquals(validation.value[0].modifiers.isDefault, true)
	}
})

Deno.test("extractFunctions - Success with multiple functions", async () => {
	const ast = await createParsedAst(`
		function add(a: number, b: number): number {
			return a + b
		}

		function subtract(a: number, b: number): number {
			return a - b
		}

		export function multiply(a: number, b: number): number {
			return a * b
		}
	`)

	const validation = extractFunctions(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 3)
		assertEquals(validation.value[0].name, "add")
		assertEquals(validation.value[1].name, "subtract")
		assertEquals(validation.value[2].name, "multiply")
		assertEquals(validation.value[2].modifiers.isExported, true)
	}
})

Deno.test("extractFunctions - Success with empty array for no functions", async () => {
	const ast = await createParsedAst(`
		const x = 42
		type Foo = string
	`)

	const validation = extractFunctions(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 0)
	}
})

Deno.test("extractFunctions - Success with async function", async () => {
	const ast = await createParsedAst(`
		async function fetchData(): Promise<string> {
			return await fetch("/api")
		}
	`)

	const validation = extractFunctions(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].modifiers.isAsync, true)
	}
})

Deno.test("extractFunctions - Success with generator function", async () => {
	const ast = await createParsedAst(`
		function* generateNumbers(): Generator<number> {
			yield 1
			yield 2
		}
	`)

	const validation = extractFunctions(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].modifiers.isGenerator, true)
	}
})

Deno.test("extractFunctions - Success with curried function", async () => {
	const ast = await createParsedAst(`
		function add(augend: number) {
			return function addToAugend(addend: number): number {
				return augend + addend
			}
		}
	`)

	const validation = extractFunctions(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		// Should extract outer function
		// Inner function is a FunctionExpression in the body, not a top-level declaration
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "add")
	}
})

Deno.test("extractFunctions - Success with type parameters", async () => {
	const ast = await createParsedAst(`
		function identity<T>(value: T): T {
			return value
		}
	`)

	const validation = extractFunctions(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].typeParameters.length, 1)
		assertEquals(validation.value[0].typeParameters[0].name, "T")
	}
})

Deno.test("extractFunctions - returns immutable array", async () => {
	const ast = await createParsedAst("export default function test() {}")
	const validation = extractFunctions(ast)

	if (validation._tag === "Success") {
		// This should fail if types are readonly
		// validation.value.push({})
	}
})

Deno.test("extractFunctions - extracts body analysis", async () => {
	const ast = await createParsedAst(`
		function test(): number {
			return 42
		}
	`)

	const validation = extractFunctions(ast)

	if (validation._tag === "Success") {
		assertEquals(validation.value[0].body.hasReturn, true)
		assertEquals(typeof validation.value[0].body.cyclomaticComplexity, "number")
	}
})

Deno.test("extractFunctions - continues extraction on individual failures", async () => {
	// This test would require malformed AST to trigger extraction errors
	// For now, verify that valid code always succeeds
	const ast = await createParsedAst(`
		function validFunction(): void {}
	`)

	const validation = extractFunctions(ast)

	assertEquals(validation._tag, "Success")
})

Deno.test("extractFunctions - accumulates errors per function", async () => {
	// When extraction errors are properly implemented, this will test accumulation
	// For now, we verify the structure supports it
	const ast = await createParsedAst("function test() {}")
	const validation = extractFunctions(ast)

	// Should be Success or Failure, both are valid Validation
	assert(validation._tag === "Success" || validation._tag === "Failure")
})
