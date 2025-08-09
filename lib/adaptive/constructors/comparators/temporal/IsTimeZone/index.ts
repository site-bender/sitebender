import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsTimeZone = (operand) => ({
	tag: "IsTimeZone",
	type: OPERAND_TYPES.operator,
	datatype: "TimeZone",
	operand,
})

export default IsTimeZone
