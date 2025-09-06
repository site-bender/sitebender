#!/usr/bin/env -S deno run --allow-read --allow-write --allow-env

import { generateDocsWithCompiler } from "./src/index.ts"
import { ensureDir } from "https://deno.land/std@0.210.0/fs/ensure_dir.ts"

const OUTPUT_PATH = "./sample-docs"

console.log("=".repeat(70))
console.log("📚 @sitebender/toolkit Sample Documentation")
console.log("=".repeat(70))

// Ensure output directory exists
await ensureDir(OUTPUT_PATH)

// Select some interesting functions from toolkit
const sampleFunctions = [
	// Array functions
	{ path: "../toolkit/src/simple/array/map/index.ts", name: "map" },
	{ path: "../toolkit/src/simple/array/filter/index.ts", name: "filter" },
	{ path: "../toolkit/src/simple/array/reduce/index.ts", name: "reduce" },
	{ path: "../toolkit/src/simple/array/sort/index.ts", name: "sort" },
	{ path: "../toolkit/src/simple/array/flatten/index.ts", name: "flatten" },
	
	// String functions
	{ path: "../toolkit/src/simple/string/trim/index.ts", name: "trim" },
	{ path: "../toolkit/src/simple/string/split/index.ts", name: "split" },
	{ path: "../toolkit/src/simple/string/capitalize/index.ts", name: "capitalize" },
	
	// Math functions
	{ path: "../toolkit/src/simple/math/add/index.ts", name: "add" },
	{ path: "../toolkit/src/simple/math/multiply/index.ts", name: "multiply" },
	{ path: "../toolkit/src/simple/math/subtract/index.ts", name: "subtract" },
	
	// Chainable functions
	{ path: "../toolkit/src/chainable/pipe/index.ts", name: "pipe" },
	{ path: "../toolkit/src/chainable/compose/index.ts", name: "compose" },
	{ path: "../toolkit/src/chainable/curry/index.ts", name: "curry" },
]

// Generate master documentation file
let masterDoc = `# @sitebender/toolkit Documentation Samples

Generated with @sitebender/scribe using TypeScript Compiler API

## Functions Analyzed

`

for (const func of sampleFunctions) {
	console.log(`\n📄 Generating documentation for: ${func.name}`)
	
	try {
		const result = await generateDocsWithCompiler(func.path, {
			format: "markdown",
			includeExamples: true,
			includeProperties: true
		})
		
		if (result.ok) {
			// Write individual doc file
			const outputPath = `${OUTPUT_PATH}/${func.name}.md`
			await Deno.writeTextFile(outputPath, result.value.content)
			
			// Add to master doc
			masterDoc += `\n### ${func.name}\n\n`
			masterDoc += result.value.content.replace(/^## .+\n\n/, "") // Remove duplicate header
			masterDoc += "\n---\n"
			
			// Display properties
			const props = result.value.metadata.properties
			const sig = result.value.metadata.signature
			
			console.log(`   ✅ Generated: ${outputPath}`)
			console.log(`   📊 Properties:`)
			console.log(`      - Pure: ${props.isPure}`)
			console.log(`      - Curried: ${props.isCurried}${props.curryLevels ? ` (${props.curryLevels} levels)` : ""}`)
			console.log(`      - Complexity: ${props.complexity}`)
			console.log(`   🔍 Signature: ${sig.name}${sig.generics ? `<${sig.generics.map(g => g.name).join(", ")}>` : ""}`)
		} else {
			console.log(`   ❌ Error: ${result.error.message}`)
			masterDoc += `\n### ${func.name}\n\n`
			masterDoc += `Error: ${result.error.message}\n\n---\n`
		}
	} catch (error) {
		console.log(`   ❌ Exception: ${error}`)
	}
}

// Write master documentation
const masterPath = `${OUTPUT_PATH}/README.md`
await Deno.writeTextFile(masterPath, masterDoc)

console.log("\n" + "=".repeat(70))
console.log("✅ Sample Documentation Generated!")
console.log("=".repeat(70))
console.log(`📁 Output directory: ${OUTPUT_PATH}`)
console.log(`📄 Master document: ${masterPath}`)
console.log("\nView the documentation with:")
console.log(`   cat ${masterPath}`)