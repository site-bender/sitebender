import type { TestCase } from "../../../types/index.ts"

import escapeTestName from "../escapeTestName/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function generatePropertyTests(
	_functionName: string,
	tests: Array<TestCase>,
): string {
	const propertyTestLines = tests.flatMap((test) => {
		if (!test.properties) return []

		return test.properties.flatMap((property) => {
			const testName = escapeTestName(property.name)
			const testHeader = `\t\tit("${testName}", () => {`

			// Check if property already contains fc.assert
			const testBody = property.property.includes("fc.assert")
				? property.property
					.split("\n")
					.map((line) => "\t\t\t" + line)
				: generateFcAssert(property)

			const testFooter = "\t\t})"

			return [testHeader, ...testBody, testFooter]
		})
	})

	return [
		'\tdescribe("property tests", () => {',
		...propertyTestLines,
		"\t})",
	].join("\n")
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
function generateFcAssert(
	property: { generator: string; property: string; runs?: number },
): Array<string> {
	const assertLines: Array<string> = ["\t\t\tfc.assert("]

	// Check if property starts with a function definition like "(a, b) => {"
	if (property.property.trim().startsWith("(")) {
		// Property already has its own function signature
		assertLines.push(
			`\t\t\t\tfc.property(${property.generator}, ${property.property.trim()})`,
		)
	} else {
		// Use generic input parameter
		assertLines.push(
			`\t\t\t\tfc.property(${property.generator}, (input) => {`,
		)

		// Properly indent the property code
		const indentedPropertyLines = property.property
			.split("\n")
			.map((line) => `\t\t\t\t\t${line}`)

		assertLines.push(...indentedPropertyLines)
		assertLines.push("\t\t\t\t})")
	}

	if (property.runs) {
		assertLines.push(`\t\t\t\t, { numRuns: ${property.runs} }`)
	}

	assertLines.push("\t\t\t)")

	return assertLines
}
