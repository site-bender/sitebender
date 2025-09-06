import type { TestCase, FunctionSignature } from "../../../types/index.ts"
import escapeTestName from "../escapeTestName/index.ts"
import valueToString from "../valueToString/index.ts"

/**
 * Generates edge case test code
 * @param tests Array of edge case test cases
 * @param functionName Name of the function being tested
 * @param signature Optional function signature information
 * @returns Generated edge case test code string
 */
export default function generateEdgeCaseTests(
	tests: Array<TestCase>,
	functionName: string,
	signature?: FunctionSignature
): string {
	const lines: Array<string> = []
	
	lines.push("\tdescribe(\"edge cases\", () => {")
	
	for (const test of tests) {
		const testName = escapeTestName(test.name)
		lines.push(`\t\tit("${testName}", () => {`)
		
		const expectedStr = valueToString(test.expectedOutput)
		
		if (signature?.isCurried && test.input.length > 1) {
			const callStr = test.input.reduce(
				(acc, input) => `${acc}(${valueToString(input)})`,
				functionName
			)
			lines.push(`\t\t\tconst result = ${callStr}`)
		} else if (signature?.isCurried && test.input.length === 1) {
			const inputStr = valueToString(test.input[0])
			lines.push(`\t\t\tconst result = ${functionName}(${inputStr})`)
		} else {
			const inputStr = test.input.map((v) => valueToString(v)).join(", ")
			lines.push(`\t\t\tconst result = ${functionName}(${inputStr})`)
		}
		lines.push(`\t\t\tassertEquals(result, ${expectedStr})`)
		lines.push("\t\t})")
	}
	
	lines.push("\t})")
	
	return lines.join("\n")
}