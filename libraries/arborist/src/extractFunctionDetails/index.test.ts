// @sitebender/arborist/src/extractFunctionDetails/index.test.ts
// Tests for extractFunctionDetails function

import { assertEquals } from "jsr:@std/assert@1.0.14"
import initSwc, { parse } from "npm:@swc/wasm-web@1.13.20"

import find from "@sitebender/toolsmith/array/find/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import type { Serializable } from "@sitebender/toolsmith/types/index.ts"
import length from "@sitebender/toolsmith/array/length/index.ts"

import extractFunctionDetails from "./index.ts"

// Initialize SWC once at module load (immutable promise)
const swcInitPromise: Promise<void> = initSwc().then(() => undefined)

function ensureSwcInitialized(): Promise<void> {
	return swcInitPromise
}

//++ Helper to parse and get first function or export declaration
//++ Handles both direct functions and export-wrapped functions
async function getFunctionNode(source: string): Promise<unknown> {
	await ensureSwcInitialized()
	const ast = await parse(source, {
		syntax: "typescript",
		tsx: false,
	})

	const astBody = ast.body as Array<unknown>

	// Use Toolsmith find instead of OOP method
	// Look for FunctionDeclaration, ExportDeclaration, or ExportDefaultDeclaration
	const result = find(
		function isFunctionOrExport(node: unknown): boolean {
			const nodeObj = node as Record<string, unknown>
			const nodeType = nodeObj.type as string

			return nodeType === "FunctionDeclaration" ||
				nodeType === "ExportDeclaration" ||
				nodeType === "ExportDefaultDeclaration"
		},
	)(astBody as ReadonlyArray<Serializable>)

	// Extract the actual node from the Result
	return getOrElse(null as unknown)(result)
}

Deno.test({
	name: "extractFunctionDetails - extracts simple function name",
	sanitizeResources: false,
	sanitizeOps: false,
	async fn() {
		const node = await getFunctionNode(`
		function add(a: number, b: number): number {
			return a + b
		}
	`)

		const result = extractFunctionDetails(node)

		assertEquals(result.name, "add")
	},
})

Deno.test("extractFunctionDetails - extracts parameters", async () => {
	const node = await getFunctionNode(`
		function add(a: number, b: number): number {
			return a + b
		}
	`)

	const result = extractFunctionDetails(node)

	assertEquals(getOrElse(0)(length(result.parameters)), 2)
	assertEquals(result.parameters[0].name, "a")
	assertEquals(result.parameters[0].type, "number")
	assertEquals(result.parameters[0].optional, false)
	assertEquals(result.parameters[1].name, "b")
	assertEquals(result.parameters[1].type, "number")
})

Deno.test("extractFunctionDetails - extracts optional parameter", async () => {
	const node = await getFunctionNode(`
		function greet(name: string, title?: string): string {
			return title ? title + " " + name : name
		}
	`)

	const result = extractFunctionDetails(node)

	assertEquals(getOrElse(0)(length(result.parameters)), 2)
	assertEquals(result.parameters[1].optional, true)
})

Deno.test("extractFunctionDetails - extracts return type", async () => {
	const node = await getFunctionNode(`
		function add(a: number, b: number): number {
			return a + b
		}
	`)

	const result = extractFunctionDetails(node)

	assertEquals(result.returnType, "number")
})

Deno.test("extractFunctionDetails - detects exported function", async () => {
	const node = await getFunctionNode(`
		export function add(a: number, b: number): number {
			return a + b
		}
	`)

	const result = extractFunctionDetails(node)

	assertEquals(result.modifiers.isExported, true)
	assertEquals(result.modifiers.isDefault, false)
})

Deno.test("extractFunctionDetails - detects default export", async () => {
	const node = await getFunctionNode(`
		export default function add(a: number, b: number): number {
			return a + b
		}
	`)

	const result = extractFunctionDetails(node)

	assertEquals(result.modifiers.isExported, true)
	assertEquals(result.modifiers.isDefault, true)
})

Deno.test("extractFunctionDetails - detects async function", async () => {
	const node = await getFunctionNode(`
		async function fetchData(): Promise<string> {
			return await fetch("/api")
		}
	`)

	const result = extractFunctionDetails(node)

	assertEquals(result.modifiers.isAsync, true)
})

Deno.test("extractFunctionDetails - detects generator function", async () => {
	const node = await getFunctionNode(`
		function* generateNumbers(): Generator<number> {
			yield 1
			yield 2
		}
	`)

	const result = extractFunctionDetails(node)

	assertEquals(result.modifiers.isGenerator, true)
})

Deno.test("extractFunctionDetails - detects non-arrow function", async () => {
	const node = await getFunctionNode(`
		function add(a: number, b: number): number {
			return a + b
		}
	`)

	const result = extractFunctionDetails(node)

	assertEquals(result.modifiers.isArrow, false)
})

Deno.test("extractFunctionDetails - extracts position", async () => {
	const node = await getFunctionNode(`
		function add(a: number, b: number): number {
			return a + b
		}
	`)

	const result = extractFunctionDetails(node)

	// Position should be present
	assertEquals(typeof result.position.line, "number")
	assertEquals(typeof result.position.column, "number")
})

Deno.test("extractFunctionDetails - extracts span", async () => {
	const node = await getFunctionNode(`
		function add(a: number, b: number): number {
			return a + b
		}
	`)

	const result = extractFunctionDetails(node)

	// Span should be present
	assertEquals(typeof result.span.start, "number")
	assertEquals(typeof result.span.end, "number")
})

Deno.test("extractFunctionDetails - analyzes function body", async () => {
	const node = await getFunctionNode(`
		function test(): number {
			return 42
		}
	`)

	const result = extractFunctionDetails(node)

	assertEquals(result.body.hasReturn, true)
	assertEquals(result.body.cyclomaticComplexity, 1)
})

Deno.test("extractFunctionDetails - handles function with no parameters", async () => {
	const node = await getFunctionNode(`
		function getValue(): number {
			return 42
		}
	`)

	const result = extractFunctionDetails(node)

	assertEquals(getOrElse(0)(length(result.parameters)), 0)
})

Deno.test("extractFunctionDetails - handles function with type parameters", async () => {
	const node = await getFunctionNode(`
		function identity<T>(value: T): T {
			return value
		}
	`)

	const result = extractFunctionDetails(node)

	assertEquals(getOrElse(0)(length(result.typeParameters)), 1)
	assertEquals(result.typeParameters[0].name, "T")
})
