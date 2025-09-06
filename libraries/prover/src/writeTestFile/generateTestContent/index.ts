import type { TestCase, FunctionSignature } from "../../types/index.ts"
import groupTests from "./groupTests/index.ts"
import generateUnitTests from "./generateUnitTests/index.ts"
import generatePropertyTests from "./generatePropertyTests/index.ts"
import generateEdgeCaseTests from "./generateEdgeCaseTests/index.ts"
import generateErrorTests from "./generateErrorTests/index.ts"

/**
 * Generates complete test file content
 * @param functionName Name of the function being tested
 * @param tests Array of all test cases
 * @param signature Optional function signature information
 * @returns Complete test file content as string
 */
export default function generateTestContent(
	functionName: string,
	tests: Array<TestCase>,
	signature?: FunctionSignature
): string {
	const testGroups = groupTests(tests)
	const sections: Array<string> = []
	
	sections.push(`describe("${functionName}", () => {`)
	
	if (testGroups.unit.length > 0) {
		sections.push(generateUnitTests(testGroups.unit, functionName, signature))
	}
	
	if (testGroups.property.length > 0) {
		sections.push(generatePropertyTests(functionName, testGroups.property))
	}
	
	if (testGroups.edge.length > 0) {
		sections.push(generateEdgeCaseTests(testGroups.edge, functionName, signature))
	}
	
	if (testGroups.error.length > 0) {
		sections.push(generateErrorTests(testGroups.error, functionName, signature))
	}
	
	sections.push("})")
	
	return sections.join("\n\n")
}