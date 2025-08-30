import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

const IsTimeZone = (operand: Operand) => ({
	tag: "IsTimeZone",
	type: OPERAND_TYPES.comparator,
	datatype: "TimeZone",
	operand,
})

export default IsTimeZone
