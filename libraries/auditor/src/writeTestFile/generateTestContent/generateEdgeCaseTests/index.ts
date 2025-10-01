import type { FunctionSignature, TestCase } from "../../../types/index.ts"

import escapeTestName from "../escapeTestName/index.ts"
import valueToString from "../valueToString/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function generateEdgeCaseTests(
	tests: Array<TestCase>,
	functionName: string,
	signature?: FunctionSignature,
): string {
	const lines: Array<string> = []

	lines.push('\tdescribe("edge cases", () => {')

	tests.forEach((test) => {
		const testName = escapeTestName(test.name)
		lines.push(`\t\tit("${testName}", () => {`)

		if (signature?.isCurried && test.input.length > 1) {
			const callStr = test.input.reduce(
				(acc, input) => `${acc}(${valueToString(input)})`,
				functionName,
			)
			lines.push(`\t\t\tconst result = ${callStr}`)
		} else if (signature?.isCurried && test.input.length === 1) {
			const inputStr = valueToString(test.input[0])
			lines.push(`\t\t\tconst result = ${functionName}(${inputStr})`)
		} else {
			const inputStr = test.input.map((v) => valueToString(v)).join(", ")
			lines.push(`\t\t\tconst result = ${functionName}(${inputStr})`)
		}

		// Only assert if we have an expected output
		if (test.expectedOutput !== undefined) {
			const expectedStr = valueToString(test.expectedOutput)
			lines.push(`\t\t\tassertEquals(result, ${expectedStr})`)
		} else {
			// Just check that the function doesn't throw
			lines.push(`\t\t\tassertExists(result)`)
		}

		lines.push("\t\t})")
	})

	lines.push("\t})")

	return lines.join("\n")
}
