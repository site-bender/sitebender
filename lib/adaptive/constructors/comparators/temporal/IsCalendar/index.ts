import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsCalendar = (operand) => ({
	tag: "IsCalendar",
	type: OPERAND_TYPES.operator,
	datatype: "Calendar",
	operand,
})

export default IsCalendar
