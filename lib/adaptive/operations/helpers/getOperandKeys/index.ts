import type { Operand } from "../../../types/index.ts"

/**
 * Extracts operand keys from an operation configuration
 * These are the properties that contain Operand values that need to be composed
 *
 * @param operation - Operation configuration object
 * @returns Array of property names that contain operands
 */
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
