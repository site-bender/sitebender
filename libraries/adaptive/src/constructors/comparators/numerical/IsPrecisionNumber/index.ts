import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsPrecisionNumber = (operand) => (decimalPlaces = 0) => ({
	tag: "IsPrecisionNumber",
	type: OPERAND_TYPES.comparator,
	datatype: "PrecisionNumber",
	decimalPlaces,
	operand,
})

export default IsPrecisionNumber
