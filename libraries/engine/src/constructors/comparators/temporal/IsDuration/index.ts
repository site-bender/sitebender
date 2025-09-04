import type { Operand } from "@sitebender/engine-types/index.ts"

import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsDuration = (operand: Operand) => ({
	tag: "IsDuration",
	type: OPERAND_TYPES.comparator,
	datatype: "Duration",
	operand,
})

export default IsDuration
