#!/usr/bin/env deno run --allow-read --allow-write

/**
 * Script to transform type files from old interface extends pattern
 * to new Props interface + type composition pattern
 *
 * DANGEROUS: This modifies files! Test on subset first.
 */

import { walk } from "https://deno.land/std@0.208.0/fs/walk.ts"
import { dirname, relative } from "https://deno.land/std@0.208.0/path/mod.ts"

interface TypeInfo {
	filePath: string
	typeName: string
	extendsType: string
	hasOwnProperties: boolean
	currentContent: string
}

interface TransformationResult {
	typeName: string
	filePath: string
	ancestorTypes: string[]
	newContent: string
	success: boolean
	error?: string
}

async function parseTypeFile(filePath: string): Promise<TypeInfo | null> {
	try {
		const content = await Deno.readTextFile(filePath)

		// Check if this is a re-export file
		if (
			content.trim().startsWith("export type { default }") ||
			content.trim().startsWith("export { default }")
		) {
			return null // Skip re-export files
		}

		// Look for pattern: export default interface X extends Y {
		const interfaceMatch = content.match(
			/export default interface (\w+) extends (\w+) \{/,
		)
		if (!interfaceMatch) return null

		const typeName = interfaceMatch[1]
		const extendsType = interfaceMatch[2]

		// Check if interface has its own properties (non-empty body)
		const interfaceBody = content.substring(
			content.indexOf("{") + 1,
			content.lastIndexOf("}"),
		)
		const hasOwnProperties = interfaceBody.trim().length > 20 // More than just comments/whitespace

		return {
			filePath,
			typeName,
			extendsType,
			hasOwnProperties,
			currentContent: content,
		}
	} catch (error) {
		console.error(
			`❗ Error parsing ${filePath}:`,
			error instanceof Error ? error.message : String(error),
		)
		return null
	}
}

async function buildCompleteTypeHierarchy(): Promise<Map<string, string[]>> {
	const hierarchy = new Map<string, string[]>()

	// Walk ALL directories under Thing to build complete hierarchy from filesystem
	for await (
		const entry of walk("lib/types/Thing", {
			includeDirs: true,
			includeFiles: false,
		})
	) {
		if (entry.isDirectory) {
			const pathParts = entry.path.split("/")
			const thingIndex = pathParts.indexOf("Thing")
			if (thingIndex !== -1) {
				// Extract inheritance path from directory structure
				const inheritancePath = pathParts.slice(thingIndex)
				if (inheritancePath.length > 1) { // More than just "Thing"
					const typeName = inheritancePath[inheritancePath.length - 1]
					hierarchy.set(typeName, inheritancePath)
				}
			}
		}
	}

	// Also scan index.ts files to catch any types defined directly
	for await (
		const entry of walk("lib/types/Thing", {
			exts: [".ts"],
			includeDirs: false,
		})
	) {
		if (entry.name === "index.ts") {
			const pathParts = entry.path.split("/")
			const thingIndex = pathParts.indexOf("Thing")
			if (thingIndex !== -1) {
				// Remove 'index.ts' and extract path
				const dirParts = pathParts.slice(thingIndex, -1)
				if (dirParts.length > 1) {
					const typeName = dirParts[dirParts.length - 1]
					if (!hierarchy.has(typeName)) {
						hierarchy.set(typeName, dirParts)
					}
				}
			}
		}
	}

	return hierarchy
}

function getAllAncestorsForType(
	typeName: string,
	hierarchy: Map<string, string[]>,
): string[] {
	const path = hierarchy.get(typeName)
	if (!path) return []

	// Return all types in path except Thing (first) and the type itself (last)
	const ancestors: string[] = []
	for (let i = 1; i < path.length - 1; i++) {
		ancestors.push(path[i])
	}

	return ancestors.sort()
}

function calculateRelativeImportPath(fromFile: string, toFile: string): string {
	const fromDir = dirname(fromFile)
	const relativePath = relative(fromDir, toFile)
	// Remove .ts extension and add .ts back
	return relativePath.replace(/\.ts$/, ".ts")
}

function extractInterfaceBody(content: string): string {
	const interfaceStart = content.indexOf("{")
	const interfaceEnd = content.lastIndexOf("}")
	if (interfaceStart === -1 || interfaceEnd === -1) return ""

	return content.substring(interfaceStart + 1, interfaceEnd).trim()
}

function generateTransformedContent(
	typeInfo: TypeInfo,
	ancestorTypes: string[],
	hierarchy: Map<string, string[]>,
): string {
	const content = typeInfo.currentContent

	// Find the interface declaration line
	const interfaceMatch = content.match(
		/export default interface (\w+) extends (\w+) \{/,
	)
	if (!interfaceMatch) {
		throw new Error(
			`Could not find interface declaration in ${typeInfo.typeName}`,
		)
	}

	const interfaceStartPos = content.indexOf(interfaceMatch[0])
	const beforeInterface = content.substring(0, interfaceStartPos).trim()

	// Find the matching closing brace for the interface
	let braceCount = 0
	let interfaceEndPos = -1
	let inInterface = false

	for (let i = interfaceStartPos; i < content.length; i++) {
		if (content[i] === "{") {
			braceCount++
			inInterface = true
		} else if (content[i] === "}") {
			braceCount--
			if (inInterface && braceCount === 0) {
				interfaceEndPos = i
				break
			}
		}
	}

	if (interfaceEndPos === -1) {
		throw new Error(`Could not find end of interface in ${typeInfo.typeName}`)
	}

	// Extract interface body (everything between the braces)
	const interfaceBodyStart = content.indexOf("{", interfaceStartPos) + 1
	const interfaceBody = content.substring(interfaceBodyStart, interfaceEndPos)
		.trim()

	// Separate imports from other content
	const lines = beforeInterface.split("\n")
	const importLines: string[] = []
	const nonImportLines: string[] = []

	for (const line of lines) {
		if (line.trim().startsWith("import ")) {
			importLines.push(line)
		} else {
			nonImportLines.push(line)
		}
	}

	// Find which imports are actually used in interface body
	function isImportUsed(importLine: string, body: string): boolean {
		const typeMatch = importLine.match(/import type (?:\{ (.+) \}|(\w+)) from/)
		if (typeMatch) {
			const importedTypes = typeMatch[1]
				? typeMatch[1].split(",").map((t) => t.trim())
				: [typeMatch[2]]

			for (const typeName of importedTypes) {
				if (body.includes(typeName)) return true
			}
		}
		return false
	}

	const usedImports = importLines.filter((imp) =>
		isImportUsed(imp, interfaceBody)
	)

	// Build new content
	let result = ""

	// 1. Add non-import lines (comments, etc.)
	const cleanNonImportLines = nonImportLines.filter((line) =>
		line.trim() !== ""
	)
	if (cleanNonImportLines.length > 0) {
		result += cleanNonImportLines.join("\n") + "\n"
	}

	// 2. Add used imports from original
	if (usedImports.length > 0) {
		result += usedImports.join("\n") + "\n"
	}

	// 3. Add Thing import (always needed)
	const thingPath = calculateRelativeImportPath(
		typeInfo.filePath,
		"lib/types/Thing/index.ts",
	)
	result += `import type Thing from "${thingPath}"\n`

	// 4. Add ancestor Props imports (only if they would exist)
	for (const ancestorTypeName of ancestorTypes) {
		const propsTypeName = `${ancestorTypeName}Props`
		// Only add if not already imported
		if (!usedImports.some((imp) => imp.includes(propsTypeName))) {
			const ancestorPath = hierarchy.get(ancestorTypeName)
			if (ancestorPath) {
				const ancestorFilePath = `lib/types/${ancestorPath.join("/")}/index.ts`
				const importPath = calculateRelativeImportPath(
					typeInfo.filePath,
					ancestorFilePath,
				)
				result += `import type { ${propsTypeName} } from "${importPath}"\n`
			}
		}
	}

	result += "\n"

	// 5. Generate Props interface
	if (interfaceBody.trim()) {
		// Interface has properties
		result += `export interface ${typeInfo.typeName}Props {\n`
		result += interfaceBody + "\n"
		result += "}\n\n"
	} else {
		// Empty interface - use empty object with lint ignore
		result += `// deno-lint-ignore no-empty-interface\n`
		result += `export interface ${typeInfo.typeName}Props {}\n\n`
	}

	// 6. Generate type composition
	result += `type ${typeInfo.typeName} =\n`
	result += "\t& Thing\n"

	// Add all ancestor Props
	for (const ancestorTypeName of ancestorTypes) {
		result += `\t& ${ancestorTypeName}Props\n`
	}
	result += `\t& ${typeInfo.typeName}Props\n\n`

	result += `export default ${typeInfo.typeName}\n`

	return result
}

async function transformType(
	typeInfo: TypeInfo,
	hierarchy: Map<string, string[]>,
): Promise<TransformationResult> {
	try {
		// Get all ancestor types from complete hierarchy
		const ancestorTypes = getAllAncestorsForType(typeInfo.typeName, hierarchy)

		// Generate new content
		const newContent = generateTransformedContent(
			typeInfo,
			ancestorTypes,
			hierarchy,
		)

		return {
			typeName: typeInfo.typeName,
			filePath: typeInfo.filePath,
			ancestorTypes,
			newContent,
			success: true,
		}
	} catch (error) {
		return {
			typeName: typeInfo.typeName,
			filePath: typeInfo.filePath,
			ancestorTypes: [],
			newContent: "",
			success: false,
			error: error instanceof Error ? error.message : String(error),
		}
	}
}

async function runTransformation(testMode = true, maxFiles = 3): Promise<void> {
	console.log(
		`🔧 ${
			testMode ? "TEST MODE" : "PRODUCTION MODE"
		}: Transforming type files...`,
	)
	console.log("")

	// Build complete hierarchy from ALL paths under Thing
	const completeHierarchy = await buildCompleteTypeHierarchy()
	console.log(`📊 Found ${completeHierarchy.size} total types in hierarchy`)

	// Find only the types that still need conversion (old pattern)
	const typeFiles: TypeInfo[] = []
	for await (
		const entry of walk("lib/types/Thing", {
			exts: [".ts"],
			includeDirs: false,
		})
	) {
		const typeInfo = await parseTypeFile(entry.path)
		if (typeInfo) {
			typeFiles.push(typeInfo)
		}
	}

	console.log(`📝 Found ${typeFiles.length} types needing conversion`)

	// TEST: Only process Table to verify fix
	const testFile = "lib/types/Thing/CreativeWork/WebPageElement/Table/index.ts"
	const filesToProcess = testMode
		? typeFiles.filter((tf) => tf.filePath === testFile).slice(0, 1)
		: typeFiles
	console.log(`🎯 Processing ${filesToProcess.length} files`)
	console.log("")

	const results: TransformationResult[] = []

	for (const typeInfo of filesToProcess) {
		console.log(`🔄 Transforming ${typeInfo.typeName}...`)
		console.log(`📁 File: ${typeInfo.filePath}`)

		const result = await transformType(typeInfo, completeHierarchy)
		results.push(result)

		if (result.success) {
			console.log(`   ✅ Generated transformation for ${result.typeName}`)
			console.log(
				`   📁 Ancestor Props: ${
					result.ancestorTypes.map((t) => t + "Props").join(", ")
				}`,
			)

			if (!testMode) {
				// Write the transformed content to file
				await Deno.writeTextFile(result.filePath, result.newContent)
				console.log(`   💾 File updated: ${result.filePath}`)
			} else {
				console.log(`   📋 COMPLETE PREVIEW:`)
				console.log("=".repeat(80))
				console.log(result.newContent)
				console.log("=".repeat(80))
			}
		} else {
			console.log(`   ❌ Failed: ${result.error}`)
		}
	}

	// Summary
	const successful = results.filter((r) => r.success).length
	const failed = results.filter((r) => !r.success).length

	console.log("📊 TRANSFORMATION SUMMARY:")
	console.log(`   ✅ Successful: ${successful}`)
	console.log(`   ❌ Failed: ${failed}`)
	console.log(`   📁 Total processed: ${results.length}`)

	if (testMode) {
		console.log("")
		console.log("🧪 TEST MODE COMPLETE - No files were modified")
		console.log(
			"   To run in production mode: deno run --allow-read --allow-write lib/transform-types.ts --production",
		)
	}
}

if (import.meta.main) {
	const args = Deno.args
	const testMode = !args.includes("--production")
	const maxFiles = testMode ? 3 : Infinity

	await runTransformation(testMode, maxFiles)
}
