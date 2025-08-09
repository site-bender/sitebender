import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsArray = (operand) => ({
	tag: "IsArray",
	type: OPERAND_TYPES.operator,
	datatype: "Array",
	operand,
})

export default IsArray
