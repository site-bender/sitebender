import type { TestCase, FunctionSignature } from "../../types/index.ts"
import getRelativeImportPath from "./getRelativeImportPath/index.ts"

/**
 * Generates import statements for test files
 * @param functionPath Path to the function file
 * @param functionName Name of the function
 * @param tests Array of test cases
 * @param signature Optional function signature with import information
 * @returns Generated import statements as string
 */
export default function generateImports(
	functionPath: string,
	functionName: string,
	tests: Array<TestCase>,
	signature?: FunctionSignature
): string {
	const imports: Array<string> = []
	
	const relativePath = getRelativeImportPath(functionPath)
	imports.push(`import ${functionName} from "${relativePath}"`)
	
	// Add custom type imports if provided
	if (signature?.imports) {
		const typeImports = signature.imports.filter(imp => imp.isType)
		const valueImports = signature.imports.filter(imp => !imp.isType)
		
		// Group imports by path
		const importsByPath = new Map<string, Array<{ name: string; isDefault: boolean }>>()
		
		for (const imp of [...typeImports, ...valueImports]) {
			// Convert relative import paths for test file location
			const testRelativePath = convertImportPathForTest(imp.path, functionPath)
			
			if (!importsByPath.has(testRelativePath)) {
				importsByPath.set(testRelativePath, [])
			}
			importsByPath.get(testRelativePath)!.push({
				name: imp.name,
				isDefault: imp.isDefault
			})
		}
		
		// Generate import statements
		for (const [path, items] of importsByPath) {
			const defaultImport = items.find(i => i.isDefault)
			const namedImports = items.filter(i => !i.isDefault)
			
			let importStatement = "import "
			if (typeImports.some(i => i.path === path)) {
				importStatement += "type "
			}
			
			if (defaultImport) {
				importStatement += defaultImport.name
				if (namedImports.length > 0) {
					importStatement += ", "
				}
			}
			
			if (namedImports.length > 0) {
				importStatement += `{ ${namedImports.map(i => i.name).join(", ")} }`
			}
			
			importStatement += ` from "${path}"`
			imports.push(importStatement)
		}
	}
	
	imports.push(`import { describe, it } from "https://deno.land/std@0.212.0/testing/bdd.ts"`)
	imports.push(`import { assertEquals, assertThrows, assertExists } from "https://deno.land/std@0.212.0/assert/mod.ts"`)
	
	const hasPropertyTests = tests.some((test) => test.properties && test.properties.length > 0)
	if (hasPropertyTests) {
		imports.push(`import * as fc from "npm:fast-check@3.15.0"`)
		// Add deepEqual for property tests
		imports.push(`import { equal as deepEqual } from "https://deno.land/std@0.212.0/assert/equal.ts"`)
	}
	
	return imports.join("\n")
}

/**
 * Converts an import path from source file to test file location
 */
function convertImportPathForTest(importPath: string, _sourcePath: string): string {
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