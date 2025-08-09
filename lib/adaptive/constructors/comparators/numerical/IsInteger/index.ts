import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsInteger = (operand) => ({
	tag: "IsInteger",
	type: OPERAND_TYPES.operator,
	datatype: "Integer",
	operand,
})

export default IsInteger
