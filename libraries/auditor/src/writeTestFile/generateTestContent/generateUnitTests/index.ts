import type {
	FunctionSignature,
	TestCase,
	TypeInfo,
} from "../../../types/index.ts"

import { TypeKind } from "../../../types/index.ts"
import escapeTestName from "../escapeTestName/index.ts"
import valueToString from "../valueToString/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
function canReturnUndefined(type: TypeInfo): boolean {
	// Direct undefined type
	if (type.raw === "undefined") return true

	// Union type that includes undefined
	if (type.kind === TypeKind.Union && type.unionTypes) {
		return type.unionTypes.some((t) =>
			t.raw === "undefined" || canReturnUndefined(t)
		)
	}

	// Common patterns
	if (type.raw.includes("| undefined")) return true
	if (type.raw.includes("undefined |")) return true

	return false
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function generateUnitTests(
	tests: Array<TestCase>,
	functionName: string,
	signature?: FunctionSignature,
): string {
	const lines: Array<string> = []

	lines.push('\tdescribe("unit tests", () => {')

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
		} else if (
			signature?.returnType && canReturnUndefined(signature.returnType)
		) {
			// For functions that can return undefined, just verify they don't throw
			// The result itself is stored but not asserted
			lines.push(`\t\t\t// Result can be undefined, no assertion needed`)
		} else {
			// For functions that shouldn't return undefined, verify result exists
			lines.push(`\t\t\tassertExists(result)`)
		}

		lines.push("\t\t})")
	})

	lines.push("\t})")

	return lines.join("\n")
}
