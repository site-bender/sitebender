import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

const IsCalendar = (operand: Operand) => ({
	tag: "IsCalendar",
	type: OPERAND_TYPES.comparator,
	datatype: "Date",
	operand,
})

export default IsCalendar
