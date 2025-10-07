import type { Operand } from "@sitebender/architect-types/index.ts"

import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsInstant = (operand: Operand) => ({
	tag: "IsInstant",
	type: OPERAND_TYPES.comparator,
	datatype: "Instant",
	operand,
})

export default IsInstant
