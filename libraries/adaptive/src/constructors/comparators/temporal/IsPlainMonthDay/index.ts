import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

const IsPlainMonthDay = (operand: Operand) => ({
	tag: "IsPlainMonthDay",
	type: OPERAND_TYPES.comparator,
	datatype: "PlainMonthDay",
	operand,
})

export default IsPlainMonthDay
