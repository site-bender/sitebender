#!/usr/bin/env -S deno run --allow-read --allow-write

interface TypeDefinition {
	location: string
	reExports: string[]
	imports: string[]
}

type InheritanceTypes = Record<string, TypeDefinition>

interface ImportStatement {
	isTypeOnly: boolean
	defaultImport?: string
	namedImports: string[]
	path: string
	fullStatement: string
}

interface ImportCategories {
	bcp47: ImportStatement[]
	dataType: ImportStatement[]
	properties: ImportStatement[]
	inheritance: ImportStatement[]
	other: ImportStatement[]
}

interface ValidationIssue {
	file: string
	type: "error" | "warning"
	message: string
}

/**
 * Parse a TypeScript import statement
 */
function parseImportStatement(statement: string): ImportStatement | null {
	const trimmed = statement.trim()
	if (!trimmed.startsWith("import")) return null

	const isTypeOnly = trimmed.includes("import type")

	// Extract the path
	const pathMatch = trimmed.match(/from\s+["']([^"']+)["']/)
	if (!pathMatch) return null
	const path = pathMatch[1]

	// Extract imports
	let defaultImport: string | undefined
	const namedImports: string[] = []

	// Check for default import
	const defaultMatch = trimmed.match(
		/import\s+(?:type\s+)?([a-zA-Z_$][a-zA-Z0-9_$]*)\s+from/,
	)
	if (defaultMatch && !trimmed.includes("{")) {
		defaultImport = defaultMatch[1]
	}

	// Check for named imports
	const namedMatch = trimmed.match(/{\s*([^}]+)\s*}/)
	if (namedMatch) {
		const namedString = namedMatch[1]
		namedImports.push(
			...namedString.split(",").map((s) => s.trim()).filter(Boolean),
		)
	}

	return {
		isTypeOnly,
		defaultImport,
		namedImports,
		path,
		fullStatement: trimmed,
	}
}

/**
 * Categorize imports based on their paths and content
 */
function categorizeImports(imports: ImportStatement[]): ImportCategories {
	const categories: ImportCategories = {
		bcp47: [],
		dataType: [],
		properties: [],
		inheritance: [],
		other: [],
	}

	for (const imp of imports) {
		if (imp.path.includes("bcp47")) {
			categories.bcp47.push(imp)
		} else if (imp.path.includes("DataType")) {
			categories.dataType.push(imp)
		} else if (
			imp.path.startsWith("../") && imp.defaultImport &&
			!imp.defaultImport.endsWith("Props")
		) {
			// Thing property imports (default imports from relative paths, not ending in Props)
			categories.properties.push(imp)
		} else if (
			imp.path.startsWith("../") &&
			(imp.defaultImport?.endsWith("Props") ||
				imp.namedImports.some((n) => n.endsWith("Props")))
		) {
			// Inheritance imports (Props imports)
			categories.inheritance.push(imp)
		} else {
			categories.other.push(imp)
		}
	}

	return categories
}

/**
 * Calculate relative path from current location to target location
 */
function calculateRelativePath(
	currentPath: string,
	targetPath: string,
): string {
	const currentSegments = currentPath.split("/").slice(0, -1) // Remove "index.ts"
	const targetSegments = targetPath.split("/").slice(0, -1) // Remove "index.ts"

	// Check if target is an actual ancestor in the same hierarchy
	const isAncestor =
		targetSegments.every((segment, index) =>
			currentSegments[index] === segment
		) && targetSegments.length < currentSegments.length

	if (isAncestor) {
		// Target is an ancestor in the same path
		const levelsUp = currentSegments.length - targetSegments.length
		return "../".repeat(levelsUp) + "index.ts"
	}

	// Target is in a different path - go up to Thing, then down to target
	const currentDepthFromThing = currentSegments.length - 1 // -1 because first segment is "Thing"
	const upToThing = "../".repeat(currentDepthFromThing)
	const downToTarget = targetSegments.slice(1).join("/") // Remove "Thing"

	if (downToTarget) {
		return upToThing + downToTarget + "/index.ts"
	} else {
		// Target is Thing itself
		return upToThing + "index.ts"
	}
}

/**
 * Generate inheritance imports from the JSON for a specific type
 */
function generateInheritanceImports(
	typeName: string,
	inheritanceTypes: InheritanceTypes,
	currentLocation: string,
): ImportStatement[] {
	const typeDef = inheritanceTypes[typeName]
	if (!typeDef) return []

	const inheritanceImports: ImportStatement[] = []

	// Add Thing import (always needed)
	const pathSegments = currentLocation.split("/").slice(0, -1) // Remove "index.ts"
	const currentDepthFromThing = pathSegments.length - 1 // -1 because first segment is "Thing"
	const thingPath = "../".repeat(currentDepthFromThing) + "index.ts"

	inheritanceImports.push({
		isTypeOnly: true,
		defaultImport: "Thing",
		namedImports: [],
		path: thingPath,
		fullStatement: `import type Thing from "${thingPath}"`,
	})

	// Process existing imports from JSON
	for (const importStatement of typeDef.imports) {
		const parsed = parseImportStatement(importStatement)
		if (parsed) {
			inheritanceImports.push(parsed)
		}
	}

	return inheritanceImports
}

/**
 * Validate property import paths against inheritance-types.json
 */
function validatePropertyImports(
	imports: ImportStatement[],
	inheritanceTypes: InheritanceTypes,
	currentLocation: string,
	validationIssues: ValidationIssue[],
): void {
	for (const imp of imports) {
		if (imp.defaultImport && !imp.defaultImport.endsWith("Props")) {
			// This is a property import, validate its path
			const typeName = imp.defaultImport
			const typeDef = inheritanceTypes[typeName]

			if (typeDef) {
				const expectedPath = calculateRelativePath(
					currentLocation,
					typeDef.location,
				)
				if (imp.path !== expectedPath) {
					validationIssues.push({
						file: currentLocation,
						type: "warning",
						message:
							`${typeName} import path "${imp.path}" should be "${expectedPath}"`,
					})
				}
			} else {
				validationIssues.push({
					file: currentLocation,
					type: "warning",
					message: `${typeName} not found in inheritance-types.json`,
				})
			}
		}
	}
}

/**
 * Merge and deduplicate imports
 */
function mergeImports(
	existingCategories: ImportCategories,
	newInheritance: ImportStatement[],
): ImportStatement[] {
	const allImports: ImportStatement[] = []

	// Add existing imports (preserve order and content)
	allImports.push(...existingCategories.bcp47)
	allImports.push(...existingCategories.dataType)
	allImports.push(...existingCategories.properties)
	allImports.push(...existingCategories.inheritance)
	allImports.push(...existingCategories.other)

	// Create set of ALL existing imports for proper deduplication
	const existingImportKeys = new Set(
		allImports.map((imp) =>
			`${imp.defaultImport || imp.namedImports.join(",")}-${imp.path}`
		),
	)

	// Add only new inheritance imports that don't already exist
	for (const newImp of newInheritance) {
		const key = `${
			newImp.defaultImport || newImp.namedImports.join(",")
		}-${newImp.path}`
		if (!existingImportKeys.has(key)) {
			allImports.push(newImp)
			existingImportKeys.add(key)
		}
	}

	// Sort imports within each category
	const finalImports: ImportStatement[] = []

	// Group by category again for final sorting
	const finalCategories = categorizeImports(allImports)

	// Add in the correct order with sorting within each group
	const addSorted = (imports: ImportStatement[]) => {
		imports.sort((a, b) => a.path.localeCompare(b.path))
		finalImports.push(...imports)
	}

	addSorted(finalCategories.bcp47)
	addSorted(finalCategories.dataType)
	addSorted(finalCategories.properties)
	addSorted(finalCategories.inheritance)
	addSorted(finalCategories.other)

	return finalImports
}

/**
 * Generate import statements as strings
 */
function generateImportStatements(imports: ImportStatement[]): string[] {
	return imports.map((imp) => imp.fullStatement)
}

/**
 * Process a single TypeScript file
 */
async function processFile(
	filePath: string,
	inheritanceTypes: InheritanceTypes,
	validationIssues: ValidationIssue[],
	dryRun: boolean,
): Promise<void> {
	const content = await Deno.readTextFile(filePath)
	const lines = content.split("\n")

	// Find import section
	const importLines: string[] = []
	let importEndIndex = 0

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim()
		if (line.startsWith("import ")) {
			importLines.push(line)
			importEndIndex = i
		} else if (importLines.length > 0 && line === "") {
			// Empty line after imports
			importEndIndex = i
			break
		} else if (importLines.length > 0) {
			// Non-import line after imports
			break
		}
	}

	// Parse existing imports
	const existingImports: ImportStatement[] = []
	for (const line of importLines) {
		const parsed = parseImportStatement(line)
		if (parsed) {
			existingImports.push(parsed)
		}
	}

	// Categorize existing imports
	const categories = categorizeImports(existingImports)

	// Extract type name from file path
	const pathParts = filePath.split("/")
	const typeName = pathParts[pathParts.length - 2] // folder name before index.ts

	// Get relative location for inheritance-types.json lookup
	const thingIndex = pathParts.indexOf("Thing")
	const relativePath = pathParts.slice(thingIndex).join("/") // e.g., "Thing/CreativeWork/index.ts"

	// Validate existing property imports
	validatePropertyImports(
		existingImports,
		inheritanceTypes,
		relativePath,
		validationIssues,
	)

	// Generate inheritance imports
	const newInheritanceImports = generateInheritanceImports(
		typeName,
		inheritanceTypes,
		relativePath,
	)

	// Merge all imports
	const mergedImports = mergeImports(categories, newInheritanceImports)
	const newImportStatements = generateImportStatements(mergedImports)

	// Check if changes are needed
	const existingImportStatements = importLines
	const hasChanges = JSON.stringify(existingImportStatements) !==
		JSON.stringify(newImportStatements)

	if (hasChanges) {
		console.log(`${dryRun ? "[DRY RUN] " : ""}Processing: ${filePath}`)

		if (dryRun) {
			console.log("  Current imports:")
			existingImportStatements.forEach((stmt) => console.log(`    ${stmt}`))
			console.log("  New imports:")
			newImportStatements.forEach((stmt) => console.log(`    ${stmt}`))
			console.log()
		} else {
			// Replace import section
			const newLines = [
				...newImportStatements,
				"", // Empty line after imports
				...lines.slice(importEndIndex + 1),
			]

			const newContent = newLines.join("\n")
			await Deno.writeTextFile(filePath, newContent)
			console.log(`  ✅ Updated ${filePath}`)
		}
	}
}

/**
 * Find all index.ts files in the Thing directory
 */
async function findTypeFiles(dir: string): Promise<string[]> {
	const files: string[] = []

	for await (const entry of Deno.readDir(dir)) {
		const fullPath = `${dir}/${entry.name}`

		if (entry.isDirectory) {
			files.push(...await findTypeFiles(fullPath))
		} else if (entry.name === "index.ts") {
			files.push(fullPath)
		}
	}

	return files
}

/**
 * Main function
 */
async function main() {
	const args = Deno.args
	const dryRun = args.includes("--dry-run") || args.includes("-d")

	console.log(`🔧 Fix Type Imports Script ${dryRun ? "(DRY RUN MODE)" : ""}`)
	console.log("=".repeat(50))

	// Load inheritance types
	const inheritanceTypesContent = await Deno.readTextFile(
		"lib/types/inheritance-types.json",
	)
	const inheritanceTypes: InheritanceTypes = JSON.parse(inheritanceTypesContent)

	console.log(
		`📚 Loaded ${Object.keys(inheritanceTypes).length} type definitions`,
	)

	// Find all Thing type files
	const typeFiles = await findTypeFiles("lib/types/Thing")
	console.log(`📁 Found ${typeFiles.length} type files`)
	console.log()

	// Process files
	const validationIssues: ValidationIssue[] = []

	for (const filePath of typeFiles) {
		await processFile(filePath, inheritanceTypes, validationIssues, dryRun)
	}

	// Report validation issues
	if (validationIssues.length > 0) {
		console.log()
		console.log("⚠️  Validation Issues:")
		console.log("=".repeat(50))

		for (const issue of validationIssues) {
			console.log(`${issue.type.toUpperCase()}: ${issue.file}`)
			console.log(`  ${issue.message}`)
		}
	}

	console.log()
	console.log(`✅ ${dryRun ? "DRY RUN " : ""}COMPLETE`)

	if (dryRun) {
		console.log("Run without --dry-run to apply changes")
	}
}

if (import.meta.main) {
	main().catch(console.error)
}
