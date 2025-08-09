import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsNumber = (operand) => ({
	tag: "IsNumber",
	type: OPERAND_TYPES.operator,
	datatype: "Number",
	operand,
})

export default IsNumber
