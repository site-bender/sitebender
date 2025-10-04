// @sitebender/arborist/src/analyzeFunctionBody/index.test.ts
// Tests for analyzeFunctionBody function

import { assert, assertEquals } from "jsr:@std/assert@1.0.14"
import initSwc, { parse } from "npm:@swc/wasm-web@1.13.20"

import analyzeFunctionBody from "./index.ts"

// Initialize SWC once for all tests
let swcInitialized = false

async function ensureSwcInitialized(): Promise<void> {
	if (!swcInitialized) {
		await initSwc()
		swcInitialized = true
	}
}

//++ Helper to parse and get first function body
async function getFunctionBody(source: string): Promise<unknown> {
	await ensureSwcInitialized()
	const ast = await parse(source, {
		syntax: "typescript",
		tsx: false,
	})

	// Find first function declaration in the module
	// Using unknown since SWC types aren't available at compile time
	const astBody = ast.body as Array<unknown>
	const functionDecl = astBody.find((node: unknown) => {
		const nodeObj = node as Record<string, unknown>
		return nodeObj.type === "FunctionDeclaration"
	})

	const declObj = functionDecl as Record<string, unknown> | undefined
	return declObj?.body
}

Deno.test("analyzeFunctionBody - detects return statement", async () => {
	const body = await getFunctionBody(`
		function test() {
			return 42
		}
	`)

	const result = analyzeFunctionBody(body)

	assertEquals(result.hasReturn, true)
	assertEquals(result.hasThrow, false)
	assertEquals(result.hasAwait, false)
	assertEquals(result.hasTryCatch, false)
	assertEquals(result.hasLoops, false)
	assertEquals(result.cyclomaticComplexity, 1)
})

Deno.test("analyzeFunctionBody - detects no return", async () => {
	const body = await getFunctionBody(`
		function test() {
			const x = 42
		}
	`)

	const result = analyzeFunctionBody(body)

	assertEquals(result.hasReturn, false)
})

Deno.test("analyzeFunctionBody - detects throw statement", async () => {
	const body = await getFunctionBody(`
		function test() {
			throw new Error("test")
		}
	`)

	const result = analyzeFunctionBody(body)

	assertEquals(result.hasThrow, true)
})

Deno.test("analyzeFunctionBody - detects await expression", async () => {
	const body = await getFunctionBody(`
		async function test() {
			await Promise.resolve(42)
		}
	`)

	const result = analyzeFunctionBody(body)

	assertEquals(result.hasAwait, true)
})

Deno.test("analyzeFunctionBody - detects try-catch", async () => {
	const body = await getFunctionBody(`
		function test() {
			try {
				doSomething()
			} catch (err) {
				handleError(err)
			}
		}
	`)

	const result = analyzeFunctionBody(body)

	assertEquals(result.hasTryCatch, true)
})

Deno.test("analyzeFunctionBody - detects for loop", async () => {
	const body = await getFunctionBody(`
		function test() {
			for (let i = 0; i < 10; i++) {
				console.log(i)
			}
		}
	`)

	const result = analyzeFunctionBody(body)

	assertEquals(result.hasLoops, true)
})

Deno.test("analyzeFunctionBody - detects while loop", async () => {
	const body = await getFunctionBody(`
		function test() {
			while (true) {
				break
			}
		}
	`)

	const result = analyzeFunctionBody(body)

	assertEquals(result.hasLoops, true)
})

Deno.test("analyzeFunctionBody - calculates cyclomatic complexity for simple function", async () => {
	const body = await getFunctionBody(`
		function test() {
			return 42
		}
	`)

	const result = analyzeFunctionBody(body)

	assertEquals(result.cyclomaticComplexity, 1)
})

Deno.test("analyzeFunctionBody - calculates cyclomatic complexity with if statement", async () => {
	const body = await getFunctionBody(`
		function test(x: number) {
			if (x > 0) {
				return x
			}
			return 0
		}
	`)

	const result = analyzeFunctionBody(body)

	assertEquals(result.cyclomaticComplexity, 2)
})

Deno.test("analyzeFunctionBody - calculates cyclomatic complexity with multiple branches", async () => {
	const body = await getFunctionBody(`
		function test(x: number) {
			if (x > 0) {
				return x
			} else if (x < 0) {
				return -x
			}
			return 0
		}
	`)

	const result = analyzeFunctionBody(body)

	// 1 (base) + 1 (if) + 1 (else if) = 3
	assertEquals(result.cyclomaticComplexity, 3)
})

Deno.test("analyzeFunctionBody - handles empty function body", async () => {
	const body = await getFunctionBody(`
		function test() {}
	`)

	const result = analyzeFunctionBody(body)

	assertEquals(result.hasReturn, false)
	assertEquals(result.hasThrow, false)
	assertEquals(result.hasAwait, false)
	assertEquals(result.hasTryCatch, false)
	assertEquals(result.hasLoops, false)
	assertEquals(result.cyclomaticComplexity, 1)
})

Deno.test("analyzeFunctionBody - detects all features in complex function", async () => {
	const body = await getFunctionBody(`
		async function test() {
			try {
				for (let i = 0; i < 10; i++) {
					if (i > 5) {
						await doSomething()
						return i
					}
				}
				throw new Error("not found")
			} catch (err) {
				return -1
			}
		}
	`)

	const result = analyzeFunctionBody(body)

	assertEquals(result.hasReturn, true)
	assertEquals(result.hasThrow, true)
	assertEquals(result.hasAwait, true)
	assertEquals(result.hasTryCatch, true)
	assertEquals(result.hasLoops, true)
	assert(result.cyclomaticComplexity > 1, "Should have complexity > 1")
})
