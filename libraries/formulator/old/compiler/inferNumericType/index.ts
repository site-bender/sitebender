import type {
	NumericDatatype,
	Operand,
} from "../../../../architect/types/index.ts"

/**
 * Infers the numeric datatype from an array of operands.
 * Returns the common type if all match, otherwise defaults to "Number".
 *
 * @param operands - Array of operands to analyze
 * @returns The inferred numeric datatype
 *
 * @example
 * ```typescript
 * // Example 1: All Integer types
 * const operands = [
 *   { tag: "Constant", type: "injector", datatype: "Integer", value: 5 },
 *   { tag: "Constant", type: "injector", datatype: "Integer", value: 3 }
 * ]
 * const type = inferNumericType(operands)
 * // Returns: "Integer"
 * ```
 *
 * @example
 * ```typescript
 * // Example 2: Mixed Integer and Float
 * const operands = [
 *   { tag: "Constant", type: "injector", datatype: "Integer", value: 5 },
 *   { tag: "Constant", type: "injector", datatype: "Float", value: 3.14 }
 * ]
 * const type = inferNumericType(operands)
 * // Returns: "Number"
 * ```
 *
 * @example
 * ```typescript
 * // Example 3: All Float types
 * const operands = [
 *   { tag: "Constant", type: "injector", datatype: "Float", value: 1.5 },
 *   { tag: "Constant", type: "injector", datatype: "Float", value: 2.7 }
 * ]
 * const type = inferNumericType(operands)
 * // Returns: "Float"
 * ```
 *
 * @example
 * ```typescript
 * // Example 4: Non-numeric type defaults to Number
 * const operands = [
 *   { tag: "Constant", type: "injector", datatype: "String", value: "hello" },
 *   { tag: "Constant", type: "injector", datatype: "Integer", value: 5 }
 * ]
 * const type = inferNumericType(operands)
 * // Returns: "Number"
 * ```
 *
 * @example
 * ```typescript
 * // Example 5: Empty array defaults to Number
 * const operands = []
 * const type = inferNumericType(operands)
 * // Returns: "Number"
 * ```
 */
export default function inferNumericType(
	operands: Array<Operand>,
): NumericDatatype {
	// Check if all operands have the same numeric datatype
	const types = operands.map((op) => op.datatype)
	const numericTypes = types.filter((t): t is NumericDatatype =>
		["Number", "Float", "Integer", "Precision"].includes(t)
	)

	// If all are the same numeric type, use it
	if (numericTypes.length === types.length && numericTypes.length > 0) {
		const firstType = numericTypes[0]
		if (numericTypes.every((t) => t === firstType)) {
			return firstType
		}
	}

	// Default to Number for mixed or non-numeric types
	return "Number"
}
