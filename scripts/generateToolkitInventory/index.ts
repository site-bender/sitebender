#!/usr/bin/env -S deno run --allow-read --allow-write

/**
 * Generate Toolkit Inventory
 *
 * Scans libraries/toolkit/src/vanilla/ and generates a comprehensive inventory
 * of all functions for use by AI transformation agents.
 */

import { join, relative } from "https://deno.land/std@0.208.0/path/mod.ts"

interface FunctionInfo {
	signature: string
	path: string
	curried: boolean
	replaces: string[]
}

interface ToolkitInventory {
	[category: string]: {
		[functionName: string]: FunctionInfo
	}
}

const TOOLKIT_ROOT = "libraries/toolkit/src/vanilla"
const OUTPUT_PATH = ".ai-agents/data/toolkit-inventory.json"

/**
 * Recursively walks directory and finds all index.ts files
 */
async function findIndexFiles(dir: string): Promise<string[]> {
	const files: string[] = []

	try {
		for await (const entry of Deno.readDir(dir)) {
			const fullPath = join(dir, entry.name)

			if (entry.isDirectory) {
				// Recursively scan subdirectories
				const subFiles = await findIndexFiles(fullPath)
				files.push(...subFiles)
			} else if (entry.name === "index.ts") {
				files.push(fullPath)
			}
		}
	} catch (error) {
		console.warn(`Could not read directory ${dir}:`, error.message)
	}

	return files
}

/**
 * Extract function information from index.ts file content
 */
function extractFunctionInfo(content: string, filePath: string): FunctionInfo | null {
	let functionName: string | null = null
	let signature: string | null = null

	// Pattern 1: Already converted - export default function
	const exportFunctionMatch = content.match(/export\s+default\s+function\s+(\w+)\s*(<[^>]*>)?\s*\([^)]*\)[^{]*\{/s)
	if (exportFunctionMatch) {
		functionName = exportFunctionMatch[1]
		const signatureMatch = content.match(/export\s+default\s+function\s+\w+[^{]*(?=\{)/s)
		signature = signatureMatch ? signatureMatch[0].replace(/export\s+default\s+/, "") : `function ${functionName}(...)`
	}

	// Pattern 2: Current state - const functionName = (...) => ... + export default functionName
	else {
		const exportMatch = content.match(/export\s+default\s+(\w+)/)
		if (exportMatch) {
			functionName = exportMatch[1]
			// Look for the const declaration of this function
			const constMatch = content.match(new RegExp(`const\\s+${functionName}\\s*=\\s*\\([^)]*\\)\\s*=>`, 's'))
			if (constMatch) {
				signature = `function ${functionName}${constMatch[0].replace(`const ${functionName} = `, '').replace(' =>', '')}`
			} else {
				// Fallback - just use basic signature
				signature = `function ${functionName}(...)`
			}
		}
	}

	if (!functionName || !signature) {
		return null
	}

	// Determine if function is curried (returns a function)
	const isCurried = content.includes("return function") || content.includes("=> (") || content.includes("} => {") || content.includes("return (")

	// Generate relative import path
	const relativePath = relative(".", filePath).replace(/\.ts$/, ".ts")

	// Determine common patterns this function might replace
	const replaces = generateReplacePatterns(functionName, isCurried)

	return {
		signature,
		path: relativePath,
		curried: isCurried,
		replaces
	}
}

/**
 * Generate common patterns that this function might replace
 */
function generateReplacePatterns(functionName: string, isCurried: boolean): string[] {
	const patterns: string[] = []

	// Math operations
	if (functionName === "add") {
		patterns.push("(a, b) => a + b", "a + b")
	} else if (functionName === "subtract") {
		patterns.push("(a, b) => a - b", "a - b")
	} else if (functionName === "multiply") {
		patterns.push("(a, b) => a * b", "a * b")
	} else if (functionName === "divide") {
		patterns.push("(a, b) => a / b", "a / b")
	}

	// Validation
	else if (functionName === "isString") {
		patterns.push("typeof x === 'string'", "typeof value === 'string'")
	} else if (functionName === "isNumber") {
		patterns.push("typeof x === 'number'", "typeof value === 'number'")
	} else if (functionName === "isArray") {
		patterns.push("Array.isArray(x)", "Array.isArray(value)")
	} else if (functionName === "isNullish") {
		patterns.push("x == null", "value == null", "x === null || x === undefined")
	}

	// Array operations
	else if (functionName === "isEmpty") {
		patterns.push("arr.length === 0", "array.length === 0")
	} else if (functionName === "head") {
		patterns.push("arr[0]", "array[0]")
	} else if (functionName === "tail") {
		patterns.push("arr.slice(1)", "array.slice(1)")
	}

	// String operations
	else if (functionName === "toLowercase") {
		patterns.push("str.toLowerCase()", "string.toLowerCase()")
	} else if (functionName === "toUppercase") {
		patterns.push("str.toUpperCase()", "string.toUpperCase()")
	} else if (functionName === "trim") {
		patterns.push("str.trim()", "string.trim()")
	}

	return patterns
}

/**
 * Get category from file path
 */
function getCategoryFromPath(filePath: string): string {
	const parts = filePath.split("/")
	const vanillaIndex = parts.indexOf("vanilla")
	if (vanillaIndex >= 0 && vanillaIndex < parts.length - 1) {
		return parts[vanillaIndex + 1]
	}
	return "other"
}

/**
 * Main function to generate toolkit inventory
 */
async function generateInventory(): Promise<void> {
	console.log("🔍 Scanning toolkit for functions...")

	const indexFiles = await findIndexFiles(TOOLKIT_ROOT)
	console.log(`📁 Found ${indexFiles.length} index.ts files`)

	const inventory: ToolkitInventory = {}
	let processedCount = 0
	const failedFiles: string[] = []

	for (const filePath of indexFiles) {
		try {
			const content = await Deno.readTextFile(filePath)
			const functionInfo = extractFunctionInfo(content, filePath)

			if (functionInfo) {
				const category = getCategoryFromPath(filePath)
				const functionName = filePath.split("/").slice(-2, -1)[0] // Get folder name

				if (!inventory[category]) {
					inventory[category] = {}
				}

				inventory[category][functionName] = functionInfo
				processedCount++
			} else {
				failedFiles.push(filePath)
			}
		} catch (error) {
			console.warn(`⚠️  Could not process ${filePath}:`, error.message)
			failedFiles.push(filePath)
		}
	}

	console.log(`✅ Processed ${processedCount} functions`)

	if (failedFiles.length > 0) {
		console.log(`❌ Failed to process ${failedFiles.length} files:`)
		failedFiles.slice(0, 10).forEach(file => console.log(`   ${file}`))
		if (failedFiles.length > 10) {
			console.log(`   ... and ${failedFiles.length - 10} more`)
		}
	}

	// Write inventory to JSON file
	const json = JSON.stringify(inventory, null, 2)
	await Deno.writeTextFile(OUTPUT_PATH, json)

	console.log(`📝 Generated inventory: ${OUTPUT_PATH}`)
	console.log(`📊 Categories: ${Object.keys(inventory).length}`)
	console.log(`🔧 Total functions: ${Object.values(inventory).reduce((sum, cat) => sum + Object.keys(cat).length, 0)}`)
}

// Run the generator
if (import.meta.main) {
	try {
		await generateInventory()
	} catch (error) {
		console.error("❌ Failed to generate inventory:", error)
		Deno.exit(1)
	}
}
