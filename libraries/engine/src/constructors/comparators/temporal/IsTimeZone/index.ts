import type { Operand } from "@engineTypes/index.ts"

import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsTimeZone = (operand: Operand) => ({
	tag: "IsTimeZone",
	type: OPERAND_TYPES.comparator,
	datatype: "TimeZone",
	operand,
})

export default IsTimeZone
