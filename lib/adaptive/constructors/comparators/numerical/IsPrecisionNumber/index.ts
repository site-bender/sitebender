import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsPrecisionNumber = (operand) => (decimalPlaces = 0) => ({
	tag: "IsPrecisionNumber",
	type: OPERAND_TYPES.operator,
	datatype: "PrecisionNumber",
	decimalPlaces,
	operand,
})

export default IsPrecisionNumber
