import type { FunctionSignature, TestCase } from "../../types/index.ts"

/**
 * Generates import statements for a test file
 * @param signature Function signature with type information
 * @param tests Array of test cases that may require imports
 * @returns Combined import statements as a string
 */
export default function generateImports(
	signature: FunctionSignature,
	tests: Array<TestCase>,
): string {
	const imports: Array<string> = []

	// Import the function being tested
	const relativePath = generateRelativePath(signature.path)
	imports.push(`import ${signature.name} from "${relativePath}"`)

	// Check if we need type imports from signature
	if (signature.imports) {
		// Group imports by path
		const importsByPath = signature.imports.reduce(
			(acc, imp) => {
				if (!acc.has(imp.path)) {
					acc.set(imp.path, [])
				}
				acc.get(imp.path)?.push({
					name: imp.name,
					isType: imp.isType,
					isDefault: imp.isDefault,
				})
				return acc
			},
			new Map<
				string,
				Array<{ name: string; isType: boolean; isDefault: boolean }>
			>(),
		)

		// Type-only imports
		const typeImports = signature.imports.filter((i) => i.isType)

		// Add custom type imports from required imports
		const requiredImports = signature.requiredImports || []
		requiredImports.forEach((imp) => {
			importsByPath.set(imp.path, [{
				name: imp.name,
				isType: true,
				isDefault: imp.isDefault,
			}])
		})

		// Generate import statements
		Array.from(importsByPath.entries()).forEach(([path, items]) => {
			const defaultImport = items.find((i) => i.isDefault)
			const namedImports = items.filter((i) => !i.isDefault)

			const isTypeImport = typeImports.some((i) => i.path === path)
			const importPrefix = isTypeImport ? "import type " : "import "

			const importParts: Array<string> = []

			if (defaultImport) {
				importParts.push(defaultImport.name)
			}

			if (namedImports.length > 0) {
				const namedPart = `{ ${namedImports.map((i) => i.name).join(", ")} }`
				importParts.push(namedPart)
			}

			const importStatement = `${importPrefix}${
				importParts.join(", ")
			} from "${path}"`
			imports.push(importStatement)
		})
	}

	imports.push(
		`import { describe, it } from "https://deno.land/std@0.212.0/testing/bdd.ts"`,
	)
	imports.push(
		`import { assertEquals, assertThrows, assertExists } from "https://deno.land/std@0.212.0/assert/mod.ts"`,
	)

	const hasPropertyTests = tests.some((test) =>
		test.properties && test.properties.length > 0
	)
	if (hasPropertyTests) {
		imports.push(`import * as fc from "npm:fast-check@3.15.0"`)
		// Add deepEqual for property tests
		imports.push(
			`import { equal as deepEqual } from "https://deno.land/std@0.212.0/assert/equal.ts"`,
		)
	}

	return imports.join("\n")
}

/**
 * Converts an import path from source file to test file location
 */
function convertImportPathForTest(
	importPath: string,
	_sourcePath: string,
): string {
	// If it's a relative import, we need to adjust it for the test file location
	if (importPath.startsWith("../") || importPath.startsWith("./")) {
		// This is a simplified version - might need more sophisticated path resolution
		// For now, assume test is in a parallel tests/ directory
		if (importPath.startsWith("../")) {
			// Add extra ../ to go up from tests directory
			return "../" + importPath
		}
		return importPath
	}

	// Absolute imports remain the same
	return importPath
}

/**
 * Generates relative path from test file to source file
 */
function generateRelativePath(sourcePath: string): string {
	// Convert absolute path to relative from test location
	// Assuming test is in tests/libraries/... and source is in libraries/...
	const pathParts = sourcePath.split("/")
	const librariesIndex = pathParts.indexOf("libraries")

	if (librariesIndex === -1) {
		// Fallback: use the full path
		return sourcePath
	}

	// Build relative path from test to source
	const relativeSegments = pathParts.slice(librariesIndex)
	const upLevels = relativeSegments.length + 1 // Go up from test dir
	const upPath = Array(upLevels).fill("..").join("/")

	return `${upPath}/${sourcePath}`
}
