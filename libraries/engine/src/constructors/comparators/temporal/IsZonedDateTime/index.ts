import type { Operand } from "@engineTypes/index.ts"

import { OPERAND_TYPES } from "@engineSrc/constructors/constants/index.ts"

const IsZonedDateTime = (operand: Operand) => ({
	tag: "IsZonedDateTime",
	type: OPERAND_TYPES.comparator,
	datatype: "Date",
	operand,
})

export default IsZonedDateTime
