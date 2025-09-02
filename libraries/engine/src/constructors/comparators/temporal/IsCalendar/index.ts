import type { Operand } from "@engineTypes/index.ts"

import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsCalendar = (operand: Operand) => ({
	tag: "IsCalendar",
	type: OPERAND_TYPES.comparator,
	datatype: "Date",
	operand,
})

export default IsCalendar
