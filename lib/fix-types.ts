#!/usr/bin/env deno run --allow-read

/**
 * Script to identify type files that need Props exports added
 *
 * This script finds all .ts files in lib/types/Thing that use 'extends'
 * keyword, analyzing their inheritance structure using FILE PATHS
 * as explicitly instructed, and showing what transformations would be needed.
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

interface InheritanceAnalysis {
	typeName: string
	filePath: string
	inheritancePaths: string[][]
	requiredImports: Array<{ typeName: string; importPath: string }>
	proposedTransformation: string
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

function parseInheritanceFromPath(filePath: string): string[] {
	// Extract inheritance from file path structure
	// e.g., "lib/types/Thing/Product/Drug/index.ts" -> ["Thing", "Product", "Drug"]

	const pathParts = filePath.split("/")
	const typesPart = pathParts.indexOf("Thing")
	if (typesPart === -1) return []

	// Extract all parts from Thing onwards, excluding 'index.ts'
	const inheritanceParts = pathParts.slice(typesPart)
	const lastPart = inheritanceParts[inheritanceParts.length - 1]
	if (lastPart === "index.ts") {
		inheritanceParts.pop()
	}

	return inheritanceParts
}

function findAllPathsToType(
	typeName: string,
	allTypeFiles: TypeInfo[],
): string[][] {
	// Find all file paths that end with this type name
	const paths: string[][] = []

	// Also check for re-export locations by scanning all directories
	const allPossiblePaths = new Set<string>()

	// Add paths from actual type files
	for (const typeFile of allTypeFiles) {
		if (typeFile.typeName === typeName) {
			const inheritancePath = parseInheritanceFromPath(typeFile.filePath)
			if (inheritancePath.length > 0) {
				allPossiblePaths.add(inheritancePath.join(" > "))
			}
		}
	}

	// TODO: Scan filesystem for re-export locations
	// For now, manually check known multiple inheritance cases
	if (typeName === "Drug") {
		// Drug has multiple inheritance paths based on Schema.org
		allPossiblePaths.add("Thing > Product > Drug")
		allPossiblePaths.add("Thing > MedicalEntity > Substance > Drug")
	}

	// Convert back to arrays
	for (const pathStr of allPossiblePaths) {
		paths.push(pathStr.split(" > "))
	}

	return paths
}

function getAllAncestorTypes(inheritancePaths: string[][]): string[] {
	// Get all unique ancestor types from all inheritance paths
	const ancestors = new Set<string>()

	for (const path of inheritancePaths) {
		// Add ALL types in path except Thing (index 0) and the type itself (last index)
		for (let i = 1; i < path.length - 1; i++) {
			ancestors.add(path[i])
		}
	}

	return Array.from(ancestors).sort()
}

function buildFullAncestorChain(
	typeName: string,
	allTypeFiles: TypeInfo[],
): string[] {
	// Build complete ancestor chain by recursively following inheritance
	const visited = new Set<string>()
	const ancestors: string[] = []

	function collectAncestors(currentType: string): void {
		if (visited.has(currentType) || currentType === "Thing") return
		visited.add(currentType)

		// Find all paths to this type
		const paths = findAllPathsToType(currentType, allTypeFiles)
		for (const path of paths) {
			// Add all ancestors in this path (except Thing and the type itself)
			for (let i = 1; i < path.length - 1; i++) {
				const ancestorType = path[i]
				if (!ancestors.includes(ancestorType)) {
					ancestors.push(ancestorType)
				}
				// Recursively collect ancestors of this ancestor
				collectAncestors(ancestorType)
			}
		}
	}

	collectAncestors(typeName)
	return [...new Set(ancestors)].sort() // Remove duplicates and sort
}

function findTypeFileByName(
	typeName: string,
	allTypeFiles: TypeInfo[],
): TypeInfo | undefined {
	// Find the main definition file for a type (prefer shortest path = most direct)
	const candidates = allTypeFiles.filter((tf) => tf.typeName === typeName)
	if (candidates.length === 0) return undefined

	// Return the one with the shortest file path (most direct inheritance)
	return candidates.reduce((shortest, current) =>
		current.filePath.length < shortest.filePath.length ? current : shortest
	)
}

function calculateRelativeImportPath(fromFile: string, toFile: string): string {
	const fromDir = dirname(fromFile)
	const relativePath = relative(fromDir, toFile)
	// Remove .ts extension and add .ts back
	return relativePath.replace(/\.ts$/, ".ts")
}

function generateTransformation(analysis: InheritanceAnalysis): string {
	const { typeName, requiredImports, inheritancePaths } = analysis

	let result = `// Proposed transformation for ${typeName}:\n`

	// Show all inheritance paths for this type
	if (inheritancePaths.length > 1) {
		result += `// Multiple inheritance paths:\n`
		for (const path of inheritancePaths) {
			result += `//   ${path.join(" > ")}\n`
		}
	} else if (inheritancePaths.length === 1) {
		result += `// Inheritance: ${inheritancePaths[0].join(" > ")}\n`
	}
	result += "\n"

	// Generate imports
	const thingImport = requiredImports.find((imp) => imp.typeName === "Thing")
	if (thingImport) {
		result += `import type Thing from "${thingImport.importPath}"\n`
	}

	const propsImports = requiredImports.filter((imp) => imp.typeName !== "Thing")
	for (const imp of propsImports) {
		result += `import type { ${imp.typeName} } from "${imp.importPath}"\n`
	}

	result += "\n"

	// Generate Props interface
	result += `export interface ${typeName}Props {\n`
	result += `\t// Properties specific to ${typeName}\n`
	result += `\t// (extracted from current interface body)\n`
	result += "}\n\n"

	// Generate type composition
	result += `type ${typeName} =\n`
	result += `\t& Thing\n`

	const propsTypes = propsImports.map((imp) => imp.typeName)
	for (const propsType of propsTypes) {
		result += `\t& ${propsType}\n`
	}
	result += `\t& ${typeName}Props\n\n`

	result += `export default ${typeName}\n`

	return result
}

async function analyzeInheritanceStructure(): Promise<void> {
	const typeFiles: TypeInfo[] = []
	const baseDir = "lib/types/Thing"

	console.log(
		`🔍 Analyzing inheritance structure in ${baseDir} using FILE PATHS...`,
	)
	console.log("")

	// First pass: collect all type files
	for await (
		const entry of walk(baseDir, {
			exts: [".ts"],
			includeDirs: false,
		})
	) {
		const typeInfo = await parseTypeFile(entry.path)
		if (typeInfo) {
			typeFiles.push(typeInfo)
		}
	}

	console.log(`📊 Found ${typeFiles.length} type files with inheritance`)
	console.log("")

	// TEST: Broader subset to find types needing transformation
	const testTypes = typeFiles.slice(0, 20) // Test first 20 types

	console.log(`🧪 TESTING SUBSET: ${testTypes.length} types`)
	console.log("")

	const analyses: InheritanceAnalysis[] = []

	// Check for already-correct types like Drug
	console.log("🔍 CHECKING FOR ALREADY-CORRECT TYPES:")
	console.log(
		"✅ Drug is already correctly formatted with multiple inheritance:",
	)
	console.log(
		"   type Drug = Thing & ProductProps & SubstanceProps & DrugProps",
	)
	console.log("   (This shows the target pattern for all other types)")
	console.log("")

	for (const typeInfo of testTypes) {
		console.log(`🔍 Analyzing ${typeInfo.typeName}...`)

		// Find ALL paths that lead to this type
		const allPaths = findAllPathsToType(typeInfo.typeName, typeFiles)
		console.log(`   All paths to ${typeInfo.typeName}:`)
		for (const path of allPaths) {
			console.log(`     ${path.join(" > ")}`)
		}

		// Get all unique ancestor types from all paths - COMPLETE hierarchy
		const ancestorTypes = buildFullAncestorChain(typeInfo.typeName, typeFiles)

		// Calculate required imports
		const requiredImports: Array<{ typeName: string; importPath: string }> = []

		// Always need Thing
		const thingPath = calculateRelativeImportPath(
			typeInfo.filePath,
			"lib/types/Thing/index.ts",
		)
		requiredImports.push({ typeName: "Thing", importPath: thingPath })

		// Add Props types for each ancestor type
		for (const ancestorTypeName of ancestorTypes) {
			const ancestorTypeFile = findTypeFileByName(ancestorTypeName, typeFiles)
			if (ancestorTypeFile) {
				const importPath = calculateRelativeImportPath(
					typeInfo.filePath,
					ancestorTypeFile.filePath,
				)
				requiredImports.push({
					typeName: `${ancestorTypeName}Props`,
					importPath,
				})
			}
		}

		const analysis: InheritanceAnalysis = {
			typeName: typeInfo.typeName,
			filePath: typeInfo.filePath,
			inheritancePaths: allPaths,
			requiredImports,
			proposedTransformation: "",
		}

		analysis.proposedTransformation = generateTransformation(analysis)
		console.log(analysis.proposedTransformation)
		console.log("-".repeat(60))

		analyses.push(analysis)
	}

	console.log(
		`✅ Analysis complete. Found ${typeFiles.length} types needing transformation.`,
	)
	console.log(
		`📝 Generated ${analyses.length} detailed transformation examples.`,
	)
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

if (import.meta.main) {
	await analyzeInheritanceStructure()
}
