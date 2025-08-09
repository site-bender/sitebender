import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsBoolean = (operand) => ({
	tag: "IsBoolean",
	type: OPERAND_TYPES.operator,
	datatype: "Boolean",
	operand,
})

export default IsBoolean
