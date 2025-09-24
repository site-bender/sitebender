import type { Operand } from "@sitebender/architect-types/index.ts"

import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsNumber = (operand: Operand) => ({
	tag: "IsNumber",
	type: OPERAND_TYPES.comparator,
	datatype: "Number",
	operand,
})

export default IsNumber
