import type { FunctionSignature, TestCase } from "../../types/index.ts"

/**
 * Generates import statements for test files
 * @param signature Function signature information
 * @param tests Array of test cases
 * @returns Array of import statement strings
 */
export default function generateImports(
	signature: FunctionSignature,
	tests: Array<TestCase>
): Array<string> {
	const imports: Array<string> = []
	
	imports.push(`import ${signature.name} from "../src/${signature.name}"`)
	imports.push(`import { describe, it } from "https://deno.land/std/testing/bdd.ts"`)
	imports.push(`import { assertEquals, assertThrows } from "https://deno.land/std/assert/mod.ts"`)
	
	const hasPropertyTests = tests.some((t) => t.properties && t.properties.length > 0)
	if (hasPropertyTests) {
		imports.push(`import * as fc from "npm:fast-check"`)
	}
	
	return imports
}