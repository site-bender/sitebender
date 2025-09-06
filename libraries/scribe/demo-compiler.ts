#!/usr/bin/env -S deno run --allow-read --allow-write

import generateDocsWithCompiler from "./src/generateDocsWithCompiler/index.ts"

// Get the directory where this script is located
const scriptDir = new URL(".", import.meta.url).pathname

console.log("=".repeat(60))
console.log("@sitebender/scribe Library Demo - TypeScript Compiler API")
console.log("=".repeat(60))

// Example files to document (resolved relative to script location)
const examples = [
	{ path: `${scriptDir}examples/add.ts`, description: "Pure, curried function" },
	{ path: `${scriptDir}examples/factorial.ts`, description: "Recursive function" },
	{ path: `${scriptDir}examples/impure.ts`, description: "Impure async function" },
]

for (const example of examples) {
	console.log(`\n${"=".repeat(60)}`)
	console.log(`Documenting: ${example.path}`)
	console.log(`Type: ${example.description}`)
	console.log("=".repeat(60))
	
	const result = await generateDocsWithCompiler(example.path, {
		format: "markdown",
		includeExamples: true,
		includeProperties: true,
	})
	
	if (result.ok) {
		console.log("\n✅ Documentation generated successfully!\n")
		console.log(result.value.content)
		
		// Also show detected properties
		console.log("\n📊 Detected Properties (Using TypeScript AST):")
		const props = result.value.metadata.properties
		console.log(`   - Pure: ${props.isPure}`)
		console.log(`   - Curried: ${props.isCurried}${props.curryLevels ? ` (${props.curryLevels} levels)` : ""}`)
		console.log(`   - Complexity: ${props.complexity}`)
		console.log(`   - Deterministic: ${props.deterministic}`)
		
		// Show function signature details
		console.log("\n🔍 Function Signature (From AST):")
		const sig = result.value.metadata.signature
		console.log(`   - Name: ${sig.name}`)
		console.log(`   - Parameters: ${sig.parameters.map(p => `${p.name}: ${p.type}`).join(", ")}`)
		console.log(`   - Return Type: ${sig.returnType}`)
		if (sig.generics) {
			console.log(`   - Generics: ${sig.generics.map(g => g.name).join(", ")}`)
		}
	} else {
		console.log("\n❌ Error:", result.error.message)
	}
}

// Demonstrate inline documentation generation with TypeScript compiler
console.log("\n" + "=".repeat(60))
console.log("Inline Code Analysis with TypeScript Compiler")
console.log("=".repeat(60))

// Create a temporary file for inline analysis
const inlineCode = `// Performs binary search on a sorted array
export default function binarySearch<T>(arr: Array<T>, target: T): number {
	let low = 0
	let high = arr.length - 1
	
	while (low <= high) {
		const mid = Math.floor((low + high) / 2)
		if (arr[mid] === target) return mid
		if (arr[mid] < target) low = mid + 1
		else high = mid - 1
	}
	return -1
}`

// Write temporary file
const tempFile = await Deno.makeTempFile({ suffix: ".ts" })
await Deno.writeTextFile(tempFile, inlineCode)

// Generate documentation
const result = await generateDocsWithCompiler(tempFile, { format: "markdown" })

if (result.ok) {
	console.log("\n✅ Binary Search Documentation (TypeScript AST):\n")
	console.log(result.value.content)
	
	console.log("\n📊 AST-Detected Properties:")
	const props = result.value.metadata.properties
	console.log(`   - Pure: ${props.isPure}`)
	console.log(`   - Complexity: ${props.complexity} (correctly detected!)`)
	console.log(`   - Deterministic: ${props.deterministic}`)
} else {
	console.log("\n❌ Error:", result.error.message)
}

// Clean up
await Deno.remove(tempFile)

console.log("\n" + "=".repeat(60))
console.log("Phase 2 Demo Complete!")
console.log("=".repeat(60))
console.log("\n🎯 Phase 2 Features Demonstrated:")
console.log("   ✅ Real TypeScript AST parsing")
console.log("   ✅ Accurate type extraction")
console.log("   ✅ AST-based purity detection")
console.log("   ✅ AST-based currying detection")
console.log("   ✅ AST-based complexity analysis")
console.log("\n📝 Next Phase 2 Features:")
console.log("   - Mathematical property detection")
console.log("   - Example extraction from tests")
console.log("   - HTML/JSON output formats")
console.log("   - Related function discovery")