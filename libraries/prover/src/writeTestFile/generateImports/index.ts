import type { TestCase } from "../../types/index.ts"
import getRelativeImportPath from "./getRelativeImportPath/index.ts"

/**
 * Generates import statements for test files
 * @param functionPath Path to the function file
 * @param functionName Name of the function
 * @param tests Array of test cases
 * @returns Generated import statements as string
 */
export default function generateImports(
	functionPath: string,
	functionName: string,
	tests: Array<TestCase>,
): string {
	const imports: Array<string> = []

	const relativePath = getRelativeImportPath(functionPath)
	imports.push(`import ${functionName} from "${relativePath}"`)

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
	}

	return imports.join("\n")
}
