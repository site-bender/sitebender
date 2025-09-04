import type { Operand } from "@sitebender/engine-types/index.ts"

import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsPlainMonthDay = (operand: Operand) => ({
	tag: "IsPlainMonthDay",
	type: OPERAND_TYPES.comparator,
	datatype: "PlainMonthDay",
	operand,
})

export default IsPlainMonthDay
