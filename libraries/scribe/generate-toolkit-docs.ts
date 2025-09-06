#!/usr/bin/env -S deno run --allow-read --allow-write --allow-env

import { generateDocsWithCompiler } from "./src/index.ts"
import { walk } from "https://deno.land/std@0.210.0/fs/walk.ts"
import { ensureDir } from "https://deno.land/std@0.210.0/fs/ensure_dir.ts"
import { relative, dirname, join } from "https://deno.land/std@0.210.0/path/mod.ts"

const TOOLKIT_PATH = "../toolkit/src"
const OUTPUT_PATH = "./generated-docs/toolkit"

console.log("=".repeat(70))
console.log("📚 @sitebender/toolkit Documentation Generator")
console.log("=".repeat(70))

// Ensure output directory exists
await ensureDir(OUTPUT_PATH)

// Statistics
let totalFiles = 0
let successCount = 0
let errorCount = 0
const errors: Array<{ file: string; error: string }> = []

// Walk through all TypeScript files in toolkit
console.log("\n🔍 Scanning toolkit library...")

const files: string[] = []
for await (const entry of walk(TOOLKIT_PATH, {
	exts: [".ts"],
	skip: [/test/, /tests/, /\.test\.ts$/, /\.spec\.ts$/]
})) {
	// Skip test files and type definition files
	if (entry.path.includes("/types/") || entry.path.endsWith(".d.ts")) {
		continue
	}
	
	// Only process index.ts files (one function per file pattern)
	if (entry.name === "index.ts") {
		files.push(entry.path)
	}
}

console.log(`Found ${files.length} functions to document\n`)

// Generate a summary file
const summaryPath = join(OUTPUT_PATH, "README.md")
let summaryContent = `# @sitebender/toolkit Documentation

Generated on ${new Date().toISOString()}

## Table of Contents

`

// Process each file
for (const filePath of files) {
	totalFiles++
	
	// Get relative path for organization
	const relativePath = relative(TOOLKIT_PATH, filePath)
	const outputDir = join(OUTPUT_PATH, dirname(relativePath))
	
	// Extract function name from path (parent directory of index.ts)
	const pathParts = relativePath.split("/")
	const functionName = pathParts[pathParts.length - 2] || "unknown"
	
	console.log(`📄 Processing ${functionName}...`)
	
	try {
		// Generate documentation
		const result = await generateDocsWithCompiler(filePath, {
			format: "markdown",
			includeExamples: true,
			includeProperties: true
		})
		
		if (result.ok) {
			// Ensure output directory exists
			await ensureDir(outputDir)
			
			// Write documentation file
			const outputPath = join(outputDir, "README.md")
			await Deno.writeTextFile(outputPath, result.value.content)
			
			successCount++
			
			// Add to summary
			const category = pathParts[0] // simple, complex, chainable, etc.
			const subcategory = pathParts.length > 3 ? pathParts[1] : null
			
			const props = result.value.metadata.properties
			const badges = []
			if (props.isPure) badges.push("Pure")
			if (props.isCurried) badges.push(`Curried(${props.curryLevels})`)
			badges.push(props.complexity)
			
			const linkPath = relative(OUTPUT_PATH, outputPath)
			summaryContent += `- [${functionName}](./${linkPath}) ${badges.length > 0 ? `\`${badges.join(" | ")}\`` : ""}\n`
			
			console.log(`  ✅ Generated: ${outputPath}`)
			console.log(`     Properties: ${badges.join(", ")}`)
		} else {
			errorCount++
			errors.push({ file: functionName, error: result.error.message })
			console.log(`  ❌ Error: ${result.error.message}`)
		}
	} catch (error) {
		errorCount++
		errors.push({ file: functionName, error: error instanceof Error ? error.message : "Unknown error" })
		console.log(`  ❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`)
	}
	
	// Add a small delay to prevent overwhelming the system
	if (totalFiles % 10 === 0) {
		console.log(`\n📊 Progress: ${totalFiles}/${files.length} files processed...`)
		console.log(`   ✅ Success: ${successCount} | ❌ Errors: ${errorCount}\n`)
	}
}

// Write summary file
summaryContent += `

## Statistics

- **Total Functions**: ${totalFiles}
- **Successfully Documented**: ${successCount}
- **Errors**: ${errorCount}

`

if (errors.length > 0) {
	summaryContent += `## Errors\n\n`
	for (const error of errors) {
		summaryContent += `- **${error.file}**: ${error.error}\n`
	}
}

await Deno.writeTextFile(summaryPath, summaryContent)

// Final report
console.log("\n" + "=".repeat(70))
console.log("📊 Documentation Generation Complete!")
console.log("=".repeat(70))
console.log(`✅ Success: ${successCount}/${totalFiles} functions documented`)
console.log(`❌ Errors: ${errorCount}`)
console.log(`📁 Output: ${OUTPUT_PATH}`)
console.log(`📄 Summary: ${summaryPath}`)

if (errors.length > 0) {
	console.log("\n⚠️  Some files had errors:")
	for (const error of errors.slice(0, 5)) {
		console.log(`   - ${error.file}: ${error.error}`)
	}
	if (errors.length > 5) {
		console.log(`   ... and ${errors.length - 5} more`)
	}
}

console.log("\n🎯 Next Steps:")
console.log(`   1. Review generated docs in: ${OUTPUT_PATH}`)
console.log(`   2. Open the summary: ${summaryPath}`)
console.log(`   3. Check individual function docs in their respective folders`)