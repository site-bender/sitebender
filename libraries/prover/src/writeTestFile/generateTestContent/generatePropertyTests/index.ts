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
	const lines: Array<string> = []

	lines.push('\tdescribe("property tests", () => {')

	for (const test of tests) {
		if (!test.properties) continue

		for (const property of test.properties) {
			const testName = escapeTestName(property.name)
			lines.push(`\t\tit("${testName}", () => {`)

			// Check if property already contains fc.assert
			if (property.property.includes("fc.assert")) {
				// Property is already wrapped, just indent it
				const indentedProperty = property.property
					.split("\n")
					.map((line) => "\t\t\t" + line)
					.join("\n")
				lines.push(indentedProperty)
			} else {
				// Wrap in fc.assert
				lines.push("\t\t\tfc.assert(")

				// Check if property starts with a function definition like "(a, b) => {"
				if (property.property.trim().startsWith("(")) {
					// Property already has its own function signature
					lines.push(
						`\t\t\t\tfc.property(${property.generator}, ${property.property.trim()})`,
					)
				} else {
					// Use generic input parameter
					lines.push(
						`\t\t\t\tfc.property(${property.generator}, (input) => {`,
					)

					// Properly indent the property code
					const propertyLines = property.property.split("\n")
					for (const line of propertyLines) {
						lines.push(`\t\t\t\t\t${line}`)
					}

					lines.push("\t\t\t\t})")
				}

				if (property.runs) {
					lines.push(`\t\t\t\t, { numRuns: ${property.runs} }`)
				}

				lines.push("\t\t\t)")
			}

			lines.push("\t\t})")
		}
	}

	lines.push("\t})")

	return lines.join("\n")
}
