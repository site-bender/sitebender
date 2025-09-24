import type { Operand } from "@sitebender/architect-types/index.ts"

import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsInteger = (operand: Operand) => ({
	tag: "IsInteger",
	type: OPERAND_TYPES.comparator,
	datatype: "Integer",
	operand,
})

export default IsInteger
