// Test the WASM module works
import { parse_with_semantics } from "./pkg/arborist_deno_ast_wasm.js"

function test() {
	console.log("Testing WASM module...")

	// Bundler target doesn't need explicit initialization
	console.log("✅ WASM loaded (bundler target)")

	// Test parsing
	const result = parse_with_semantics("function test() {}", "test.ts")
	console.log("✅ parse_with_semantics called successfully")
	console.log("Result:", result)
}

test()
