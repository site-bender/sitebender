import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsPlainMonthDay = (operand) => ({
	tag: "IsPlainMonthDay",
	type: OPERAND_TYPES.operator,
	datatype: "PlainMonthDay",
	operand,
})

export default IsPlainMonthDay
