import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsCalendar = (operand) => ({
	tag: "IsCalendar",
	type: OPERAND_TYPES.comparator,
	datatype: "Calendar",
	operand,
})

export default IsCalendar
