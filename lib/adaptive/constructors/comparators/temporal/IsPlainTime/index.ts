import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsPlainTime = (operand) => ({
	tag: "IsPlainTime",
	type: OPERAND_TYPES.operator,
	datatype: "PlainTime",
	operand,
})

export default IsPlainTime
