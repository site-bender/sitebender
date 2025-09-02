import type { Operand } from "@adaptiveTypes/index.ts"

import { OPERAND_TYPES } from "@adaptiveSrc/constructors/constants/index.ts"

const IsZonedDateTime = (operand: Operand) => ({
	tag: "IsZonedDateTime",
	type: OPERAND_TYPES.comparator,
	datatype: "Date",
	operand,
})

export default IsZonedDateTime
