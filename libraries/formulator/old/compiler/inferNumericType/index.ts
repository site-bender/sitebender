import type {
	NumericDatatype,
	Operand,
} from "../../../../architect/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
