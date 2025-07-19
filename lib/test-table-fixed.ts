#!/usr/bin/env deno run --allow-read --allow-write

/**
 * Script to test transformation on Table with PROPER hierarchy analysis
 */

import { walk } from "https://deno.land/std@0.208.0/fs/walk.ts"
import { dirname, relative } from "https://deno.land/std@0.208.0/path/mod.ts"

interface TypeInfo {
	filePath: string
	typeName: string
	extendsType: string
	currentContent: string
}

async function parseTypeFile(filePath: string): Promise<TypeInfo | null> {
	try {
		const content = await Deno.readTextFile(filePath)

		// Look for pattern: export default interface X extends Y {
		const interfaceMatch = content.match(
			/export default interface (\w+) extends (\w+) \{/,
		)
		if (!interfaceMatch) return null

		const typeName = interfaceMatch[1]
		const extendsType = interfaceMatch[2]

		return {
			filePath,
			typeName,
			extendsType,
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
	return relativePath.replace(/\.ts$/, ".ts")
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

	// Build new content
	let result = ""

	// 1. Keep all existing imports exactly as they are
	result += beforeInterface

	// 2. Add missing ancestor Props imports if needed
	for (const ancestorTypeName of ancestorTypes) {
		const propsTypeName = `${ancestorTypeName}Props`
		// Only add if not already imported
		if (!beforeInterface.includes(propsTypeName)) {
			const ancestorPath = hierarchy.get(ancestorTypeName)
			if (ancestorPath) {
				const ancestorFilePath = `lib/types/${ancestorPath.join("/")}/index.ts`
				const importPath = calculateRelativeImportPath(
					typeInfo.filePath,
					ancestorFilePath,
				)
				result += `\nimport type { ${propsTypeName} } from "${importPath}"`
			}
		}
	}

	result += "\n\n"

	// 3. Generate Props interface
	result += `export interface ${typeInfo.typeName}Props {\n`
	if (interfaceBody.trim()) {
		result += interfaceBody + "\n"
	} else {
		result += `\t// Properties specific to ${typeInfo.typeName}\n`
	}
	result += "}\n\n"

	// 4. Generate type composition
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

async function testTableTransformation(): Promise<void> {
	const tableFile = "lib/types/Thing/CreativeWork/WebPageElement/Table/index.ts"

	console.log("🎯 Testing CORRECTED transformation on Table")
	console.log(`📁 File: ${tableFile}`)
	console.log("")

	// Build complete hierarchy
	const hierarchy = await buildCompleteTypeHierarchy()

	// Parse the file
	const typeInfo = await parseTypeFile(tableFile)

	if (!typeInfo) {
		console.log("❌ Could not parse Table file")
		return
	}

	console.log(
		`✅ Found interface: ${typeInfo.typeName} extends ${typeInfo.extendsType}`,
	)

	// Get complete hierarchy path for Table
	const hierarchyPath = hierarchy.get(typeInfo.typeName) || []
	console.log(`📍 Complete path: ${hierarchyPath.join(" > ")}`)

	// Get ALL ancestor types from complete hierarchy
	const ancestorTypes = getAllAncestorsForType(typeInfo.typeName, hierarchy)
	console.log(
		`📋 Required ancestor Props: ${
			ancestorTypes.map((t) => t + "Props").join(", ")
		}`,
	)
	console.log("")

	// Transform
	try {
		const transformed = generateTransformedContent(
			typeInfo,
			ancestorTypes,
			hierarchy,
		)
		console.log("✅ CORRECTED TRANSFORMATION:")
		console.log("═".repeat(80))
		console.log(transformed)
		console.log("═".repeat(80))
		console.log("")

		if (Deno.args.includes("--write")) {
			await Deno.writeTextFile(tableFile, transformed)
			console.log("💾 File written successfully!")
		} else {
			console.log(
				"🤔 To write: deno run --allow-read --allow-write lib/test-table-fixed.ts --write",
			)
		}
	} catch (error) {
		console.log(
			`❌ TRANSFORMATION FAILED: ${
				error instanceof Error ? error.message : String(error)
			}`,
		)
	}
}

if (import.meta.main) {
	await testTableTransformation()
}
