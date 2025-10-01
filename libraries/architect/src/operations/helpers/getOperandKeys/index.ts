import type { Operand } from "../../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const getOperandKeys = (operation: Operand): Array<string> => {
	const knownOperandKeys = [
		// Unary operators
		"operand",
		// Binary operators
		"base",
		"exponent",
		"minuend",
		"subtrahend",
		"dividend",
		"divisor",
		// N-ary operators
		"addends",
		"multipliers",
		"operands",
		// Comparators
		"test",
	]

	const keys: Array<string> = []

	for (const key of knownOperandKeys) {
		if (key in operation) {
			keys.push(key)
		}
	}

	return keys
}

export default getOperandKeys
