import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsPlainDateTime = (operand) => ({
	tag: "IsPlainDateTime",
	type: OPERAND_TYPES.operator,
	datatype: "PlainDateTime",
	operand,
})

export default IsPlainDateTime
