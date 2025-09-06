#!/usr/bin/env -S deno run --allow-read --allow-write

import { generateDocs } from "./src/index.ts"

// Get the directory where this script is located
const scriptDir = new URL(".", import.meta.url).pathname

console.log("=".repeat(60))
console.log("@sitebender/scribe Library Demo")
console.log("=".repeat(60))

// Example files to document (resolved relative to script location)
const examples = [
	{
		path: `${scriptDir}examples/add.ts`,
		description: "Pure, curried function",
	},
	{
		path: `${scriptDir}examples/factorial.ts`,
		description: "Recursive function",
	},
	{
		path: `${scriptDir}examples/impure.ts`,
		description: "Impure async function",
	},
]

for (const example of examples) {
	console.log(`\n${"=".repeat(60)}`)
	console.log(`Documenting: ${example.path}`)
	console.log(`Type: ${example.description}`)
	console.log("=".repeat(60))

	const result = await generateDocs(example.path, {
		format: "markdown",
		includeExamples: true,
		includeProperties: true,
	})

	if (result.ok) {
		console.log("\n✅ Documentation generated successfully!\n")
		console.log(result.value.content)

		// Also show detected properties
		console.log("\n📊 Detected Properties:")
		const props = result.value.metadata.properties
		console.log(`   - Pure: ${props.isPure}`)
		console.log(
			`   - Curried: ${props.isCurried}${
				props.curryLevels ? ` (${props.curryLevels} levels)` : ""
			}`,
		)
		console.log(`   - Complexity: ${props.complexity}`)
		console.log(`   - Deterministic: ${props.deterministic}`)
	} else {
		console.log("\n❌ Error:", result.error.message)
	}
}

// Demonstrate inline documentation generation
console.log("\n" + "=".repeat(60))
console.log("Inline Code Analysis")
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
const result = await generateDocs(tempFile, { format: "markdown" })

if (result.ok) {
	console.log("\n✅ Binary Search Documentation:\n")
	console.log(result.value.content)
} else {
	console.log("\n❌ Error:", result.error.message)
}

// Clean up
await Deno.remove(tempFile)

console.log("\n" + "=".repeat(60))
console.log("Demo complete!")
console.log("=".repeat(60))
console.log("\n🎯 Key Features Demonstrated:")
console.log("   - Automatic signature extraction")
console.log("   - Purity detection")
console.log("   - Currying detection")
console.log("   - Complexity analysis")
console.log("   - Markdown generation")
console.log("\n📝 Note: This is Phase 1 implementation.")
console.log("   Phase 2 will add:")
console.log("   - Mathematical property detection")
console.log("   - Example extraction from tests")
console.log("   - HTML/JSON output formats")
console.log("   - Related function discovery")
