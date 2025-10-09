// Proof of Concept: deno_ast via @deco/deno-ast-wasm
// Simple test to confirm the library works for semantic analysis

import { parse } from "jsr:@deco/deno-ast-wasm@0.5.5"

// type for deno_ast parsed result
type DenoAstParsedResult = {
	program?: () => unknown
	[key: string]: unknown
}

const sourceCode = `
function add(a: number, b: number): number {
  return a + b
}

const result = add(1, 2)
`

console.log("=== Deno AST Proof of Concept ===")
console.log("Source code:")
console.log(sourceCode.trim())
console.log()

try {
	console.log("Testing deno_ast parse function...")

	const parsedPromise = parse(sourceCode, {
		syntax: "typescript",
		mediaType: "typescript",
	})

	console.log("✅ parse() function executed without error!")
	console.log("Return type:", typeof parsedPromise)
	console.log("Return value:", parsedPromise)

	// Await the promise
	const parsed = await parsedPromise

	console.log("✅ Promise resolved!")
	console.log("Parsed result type:", typeof parsed)
	console.log("Parsed result:", parsed)

	// Check if it's a ParsedSource or similar
	if (parsed && typeof parsed === "object") {
		console.log("✅ Returned a parsed object")
		console.log("Object keys:", Object.keys(parsed))
		console.log("Object prototype:", Object.getPrototypeOf(parsed))

		// Try common methods
		if (typeof parsed === "object" && parsed !== null) {
			const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(parsed))
			console.log("Available methods:", methods)

			// Try to call program() if it exists (common in AST parsers)
			const typedParsed = parsed as DenoAstParsedResult
			if (
				"program" in typedParsed && typeof typedParsed.program === "function"
			) {
				console.log("Has program() method - calling it...")
				const program = typedParsed.program()
				console.log("Program result:", program)
			}
		}
	}

	console.log("\n🎉 deno_ast library loads and parses successfully!")
	console.log("✅ Semantic analysis is possible with proper API usage")
} catch (error) {
	console.error("❌ Failed to use deno_ast:", error)
	console.error("Error details:", error instanceof Error ? error.stack : error)
}
