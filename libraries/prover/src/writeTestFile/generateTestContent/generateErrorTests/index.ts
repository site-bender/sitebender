import type { FunctionSignature, TestCase } from "../../../types/index.ts"
import escapeTestName from "../escapeTestName/index.ts"
import valueToString from "../valueToString/index.ts"

/**
 * Generates test code for error cases
 * @param tests Array of test cases with expected errors
 * @param functionName Name of the function being tested
 * @param _signature Function signature (reserved for future use)
 * @returns Generated test code string
 */
export default function generateErrorTests(
	tests: Array<TestCase>,
	functionName: string,
	_signature?: FunctionSignature,
): string {
	const lines: Array<string> = []

	lines.push('\tdescribe("error cases", () => {')

	for (const test of tests) {
		const testName = escapeTestName(test.name)
		lines.push(`\t\tit("${testName}", () => {`)

		const inputStr = test.input.map((v) => valueToString(v)).join(", ")

		lines.push("\t\t\tassertThrows(")
		lines.push(`\t\t\t\t() => ${functionName}(${inputStr}),`)

		if (test.expectedError) {
			lines.push(`\t\t\t\tError,`)
			lines.push(`\t\t\t\t"${test.expectedError}"`)
		} else {
			lines.push("\t\t\t\tError")
		}

		lines.push("\t\t\t)")
		lines.push("\t\t})")
	}

	lines.push("\t})")

	return lines.join("\n")
}
