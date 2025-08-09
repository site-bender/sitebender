import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsSet = (operand) => ({
	tag: "IsSet",
	type: OPERAND_TYPES.operator,
	datatype: "Set",
	operand,
})

export default IsSet
