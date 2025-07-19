#!/usr/bin/env deno run --allow-read --allow-write

/**
 * Script to test PROPER transformation on Table - removing unused imports
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

function extractUsedImports(
	interfaceBody: string,
	allImports: string[],
): string[] {
	// Find which imports are actually used in the interface body
	const usedImports: string[] = []

	for (const importLine of allImports) {
		// Extract imported type names from import statements
		const typeMatch = importLine.match(/import type (?:\{ (.+) \}|(\w+)) from/)
		if (typeMatch) {
			const importedTypes = typeMatch[1]
				? typeMatch[1].split(",").map((t) => t.trim())
				: [typeMatch[2]]

			// Check if any imported type is used in interface body
			for (const typeName of importedTypes) {
				if (interfaceBody.includes(typeName)) {
					usedImports.push(importLine)
					break
				}
			}
		}
	}

	return usedImports
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
	const usedImports = extractUsedImports(interfaceBody, importLines)

	// Build new content
	let result = ""

	// 1. Add non-import lines (comments, etc.)
	const cleanNonImportLines = nonImportLines.filter((line) =>
		line.trim() !== ""
	)
	if (cleanNonImportLines.length > 0) {
		result += cleanNonImportLines.join("\n") + "\n"
	}

	// 2. Add used imports
	if (usedImports.length > 0) {
		result += usedImports.join("\n") + "\n"
	}

	// 3. Add ancestor Props imports
	for (const ancestorTypeName of ancestorTypes) {
		const propsTypeName = `${ancestorTypeName}Props`
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

	result += "\n"

	// 4. Generate Props interface
	if (interfaceBody.trim()) {
		// Interface has properties
		result += `export interface ${typeInfo.typeName}Props {\n`
		result += interfaceBody + '\n'
		result += '}\n\n'
	} else {
		// Empty interface - add never property to satisfy linter while maintaining pattern
		result += `export interface ${typeInfo.typeName}Props {\n`
		result += `\t// No additional properties beyond inherited ones\n`
		result += `\t[key: string]: never\n`
		result += '}\n\n'
	}

	// 5. Generate type composition
	result += `
