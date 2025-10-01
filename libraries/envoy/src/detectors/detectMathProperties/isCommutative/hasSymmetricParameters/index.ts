import some from "../../../../../../toolsmith/src/vanilla/array/some/index.ts"
import test from "../../../../../../toolsmith/src/vanilla/string/test/index.ts"
import {
	BINARY_FUNCTION_PATTERN,
	COMMUTATIVE_OPERATIONS,
} from "../constants/index.ts"

//++ Checks if a binary function uses parameters symmetrically
export default function hasSymmetricParameters(source: string): boolean {
	const parameterMatch = source.match(BINARY_FUNCTION_PATTERN)

	if (!parameterMatch) {
		return false
	}

	const param1 = parameterMatch[1]
	const param2 = parameterMatch[2]

	// Count parameter usage (excluding declaration)
	const param1Pattern = new RegExp(`\\b${param1}\\b`, "g")
	const param2Pattern = new RegExp(`\\b${param2}\\b`, "g")

	const param1Count = (source.match(param1Pattern) || []).length - 1
	const param2Count = (source.match(param2Pattern) || []).length - 1

	// Check for equal usage with commutative operations
	if (param1Count === param2Count && param1Count > 1) {
		return some(function hasOperation(op: RegExp) {
			return test(op)(source)
		})(Array.from(COMMUTATIVE_OPERATIONS))
	}

	// Check for explicit symmetric patterns
	const symmetricPatterns = [
		new RegExp(`${param1}\\s*\\+\\s*${param2}`),
		new RegExp(`${param2}\\s*\\+\\s*${param1}`),
		new RegExp(`${param1}\\s*\\*\\s*${param2}`),
		new RegExp(`${param2}\\s*\\*\\s*${param1}`),
		new RegExp(`Math\\.(max|min)\\(${param1},\\s*${param2}\\)`),
		new RegExp(`Math\\.(max|min)\\(${param2},\\s*${param1}\\)`),
	]

	return some(function matchesPattern(pattern: RegExp) {
		return test(pattern)(source)
	})(symmetricPatterns)
}
