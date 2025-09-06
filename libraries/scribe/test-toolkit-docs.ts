#!/usr/bin/env -S deno run --allow-read --allow-write --allow-env

import { generateDocsWithCompiler } from "./src/index.ts"

console.log("Testing documentation generation on toolkit functions...\n")

// Test a few representative functions
const testFunctions = [
	"../toolkit/src/simple/array/map/index.ts",
	"../toolkit/src/simple/string/trim/index.ts",
	"../toolkit/src/simple/math/add/index.ts",
	"../toolkit/src/complex/pipe/index.ts",
]

for (const path of testFunctions) {
	console.log("=".repeat(60))
	console.log(`Testing: ${path}`)
	console.log("=".repeat(60))
	
	try {
		const result = await generateDocsWithCompiler(path, {
			format: "markdown",
			includeExamples: true,
			includeProperties: true
		})
		
		if (result.ok) {
			console.log("✅ Success!")
			console.log("\nGenerated Documentation:")
			console.log(result.value.content)
			
			console.log("\n📊 Detected Properties:")
			const props = result.value.metadata.properties
			console.log(`   - Pure: ${props.isPure}`)
			console.log(`   - Curried: ${props.isCurried}`)
			console.log(`   - Complexity: ${props.complexity}`)
		} else {
			console.log(`❌ Error: ${result.error.message}`)
		}
	} catch (error) {
		console.log(`❌ Exception: ${error}`)
	}
	
	console.log()
}