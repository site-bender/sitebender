import type { Operand } from "@sitebender/engine-types/index.ts"

import { OPERAND_TYPES } from "@sitebender/engine/constructors/constants/index.ts"

const IsZonedDateTime = (operand: Operand) => ({
	tag: "IsZonedDateTime",
	type: OPERAND_TYPES.comparator,
	datatype: "Date",
	operand,
})

export default IsZonedDateTime
