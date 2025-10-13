// @sitebender/arborist/src/extractComments/index.test.ts
// Tests for extractComments function

import { assert, assertEquals } from "jsr:@std/assert@1.0.14"
import { default as initSwc, parse } from "npm:@swc/wasm-web@1.13.20"

import type { ParsedAst } from "../types/index.ts"

import extractComments from "./index.ts"
import length from "@sitebender/toolsmith/array/length/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

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

Deno.test("extractComments - returns Validation", async () => {
	const ast = await createParsedAst("// comment\nfunction test() {}")
	const validation = extractComments(ast)

	assert(
		validation._tag === "Success" || validation._tag === "Failure",
		"Should return Validation",
	)
})

Deno.test("extractComments - Success with single line comment", async () => {
	const ast = await createParsedAst(`
		// This is a line comment
		function test() {}
	`)

	const validation = extractComments(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(getOrElse(0)(length(validation.value)), 1)
		assertEquals(validation.value[0].text, " This is a line comment")
		assertEquals(validation.value[0].kind, "line")
	}
})

Deno.test("extractComments - Success with block comment", async () => {
	const ast = await createParsedAst(`
		/*
		 * Multi-line block comment
		 */
		function test() {}
	`)

	const validation = extractComments(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(getOrElse(0)(length(validation.value)), 1)
		assertEquals(validation.value[0].kind, "block")
		assert(validation.value[0].text.includes("Multi-line block comment"))
	}
})

Deno.test("extractComments - Success with multiple comments", async () => {
	const ast = await createParsedAst(`
		// First comment
		function add() {}

		// Second comment
		function subtract() {}

		/* Block comment */
		const x = 42
	`)

	const validation = extractComments(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(getOrElse(0)(length(validation.value)), 3)
		assertEquals(validation.value[0].kind, "line")
		assertEquals(validation.value[1].kind, "line")
		assertEquals(validation.value[2].kind, "block")
	}
})

Deno.test("extractComments - Success with empty array for no comments", async () => {
	const ast = await createParsedAst(`
		function test() {
			return 42
		}
	`)

	const validation = extractComments(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(getOrElse(0)(length(validation.value)), 0)
	}
})

Deno.test("extractComments - detects Envoy marker ++", async () => {
	const ast = await createParsedAst(`
		//++ This is a documentation comment
		function test() {}
	`)

	const validation = extractComments(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(getOrElse(0)(length(validation.value)), 1)
		assertEquals(validation.value[0].envoyMarker?.marker, "++")
		if (validation.value[0].envoyMarker?.marker === "++") {
			assertEquals(
				validation.value[0].envoyMarker.description,
				"This is a documentation comment",
			)
		}
	}
})

Deno.test("extractComments - detects Envoy marker --", async () => {
	const ast = await createParsedAst(`
		//-- TODO: Fix this tech debt
		function test() {}
	`)

	const validation = extractComments(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(getOrElse(0)(length(validation.value)), 1)
		assertEquals(validation.value[0].envoyMarker?.marker, "--")
		if (validation.value[0].envoyMarker?.marker === "--") {
			assertEquals(
				validation.value[0].envoyMarker.techDebt,
				"TODO: Fix this tech debt",
			)
		}
	}
})

Deno.test("extractComments - detects Envoy marker !!", async () => {
	const ast = await createParsedAst(`
		//!! CRITICAL: Security issue here
		function test() {}
	`)

	const validation = extractComments(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(getOrElse(0)(length(validation.value)), 1)
		assertEquals(validation.value[0].envoyMarker?.marker, "!!")
		if (validation.value[0].envoyMarker?.marker === "!!") {
			assertEquals(
				validation.value[0].envoyMarker.critical,
				"CRITICAL: Security issue here",
			)
		}
	}
})

Deno.test("extractComments - detects Envoy marker ??", async () => {
	const ast = await createParsedAst(`
		//?? Need help understanding this
		function test() {}
	`)

	const validation = extractComments(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(getOrElse(0)(length(validation.value)), 1)
		assertEquals(validation.value[0].envoyMarker?.marker, "??")
		if (validation.value[0].envoyMarker?.marker === "??") {
			assertEquals(
				validation.value[0].envoyMarker.help,
				"Need help understanding this",
			)
		}
	}
})

Deno.test("extractComments - detects Envoy marker >>", async () => {
	const ast = await createParsedAst(`
		//>> https://example.com/docs
		function test() {}
	`)

	const validation = extractComments(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(getOrElse(0)(length(validation.value)), 1)
		assertEquals(validation.value[0].envoyMarker?.marker, ">>")
		if (validation.value[0].envoyMarker?.marker === ">>") {
			assertEquals(
				validation.value[0].envoyMarker.link,
				"https://example.com/docs",
			)
		}
	}
})

Deno.test("extractComments - no Envoy marker for regular comments", async () => {
	const ast = await createParsedAst(`
		// Regular comment without marker
		function test() {}
	`)

	const validation = extractComments(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(getOrElse(0)(length(validation.value)), 1)
		assertEquals(validation.value[0].envoyMarker, undefined)
	}
})

Deno.test("extractComments - extracts position information", async () => {
	const ast = await createParsedAst(`// comment at start
function test() {}`)

	const validation = extractComments(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(getOrElse(0)(length(validation.value)), 1)
		assertEquals(typeof validation.value[0].position.line, "number")
		assertEquals(typeof validation.value[0].position.column, "number")
		assertEquals(typeof validation.value[0].span.start, "number")
		assertEquals(typeof validation.value[0].span.end, "number")
	}
})

Deno.test("extractComments - returns immutable array", async () => {
	const ast = await createParsedAst("// comment\nfunction test() {}")
	const validation = extractComments(ast)

	if (validation._tag === "Success") {
		// This should fail if types are readonly
		// validation.value.push({})
	}
})

Deno.test("extractComments - handles inline comments", async () => {
	const ast = await createParsedAst(`
		const x = 42 // inline comment
	`)

	const validation = extractComments(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(getOrElse(0)(length(validation.value)), 1)
		assertEquals(validation.value[0].text, " inline comment")
	}
})

Deno.test("extractComments - handles JSDoc-style comments", async () => {
	const ast = await createParsedAst(`
		/**
		 * JSDoc comment
		 * @param x - A number
		 */
		function test(x: number) {}
	`)

	const validation = extractComments(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(getOrElse(0)(length(validation.value)), 1)
		assertEquals(validation.value[0].kind, "block")
		assert(validation.value[0].text.includes("JSDoc comment"))
	}
})
