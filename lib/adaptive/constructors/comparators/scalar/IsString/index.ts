import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsString = (operand) => ({
	tag: "IsString",
	type: OPERAND_TYPES.operator,
	datatype: "String",
	operand,
})

export default IsString
