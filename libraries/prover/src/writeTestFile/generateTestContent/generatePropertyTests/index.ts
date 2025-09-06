import type { TestCase } from "../../../types/index.ts"
import escapeTestName from "../escapeTestName/index.ts"

/**
 * Generates property-based test code
 * @param _functionName Name of the function being tested (reserved for future use)
 * @param tests Array of test cases with property tests
 * @returns Generated property test code string
 */
export default function generatePropertyTests(
	_functionName: string,
	tests: Array<TestCase>,
): string {
	const propertyTestLines = tests.flatMap(test => {
		if (!test.properties) return []

		return test.properties.flatMap(property => {
			const testName = escapeTestName(property.name)
			const testHeader = `\t\tit("${testName}", () => {`

			// Check if property already contains fc.assert
			const testBody = property.property.includes("fc.assert")
				? property.property
					.split("\n")
					.map(line => "\t\t\t" + line)
				: generateFcAssert(property)

			const testFooter = "\t\t})"

			return [testHeader, ...testBody, testFooter]
		})
	})

	return [
		"\tdescribe(\"property tests\", () => {",
		...propertyTestLines,
		"\t})"
	].join("\n")
}

/**
 * Generate fc.assert wrapper for a property test
 */
function generateFcAssert(property: { generator: string, property: string, runs?: number }): Array<string> {
	const assertLines: Array<string> = ["\t\t\tfc.assert("]

	// Check if property starts with a function definition like "(a, b) => {"
	if (property.property.trim().startsWith("(")) {
		// Property already has its own function signature
		assertLines.push(`\t\t\t\tfc.property(${property.generator}, ${property.property.trim()})`)
	} else {
		// Use generic input parameter
		assertLines.push(`\t\t\t\tfc.property(${property.generator}, (input) => {`)

		// Properly indent the property code
		const indentedPropertyLines = property.property
			.split("\n")
			.map(line => `\t\t\t\t\t${line}`)

		assertLines.push(...indentedPropertyLines)
		assertLines.push("\t\t\t\t})")
	}

	if (property.runs) {
		assertLines.push(`\t\t\t\t, { numRuns: ${property.runs} }`)
	}

	assertLines.push("\t\t\t)")

	return assertLines
}
