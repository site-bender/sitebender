import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsRealNumber = (operand) => ({
	tag: "IsRealNumber",
	type: OPERAND_TYPES.operator,
	datatype: "RealNumber",
	operand,
})

export default IsRealNumber
