import type { Operand } from "@adaptiveTypes/index.ts"

import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsPlainDate = (operand: Operand) => ({
	tag: "IsPlainDate",
	type: OPERAND_TYPES.comparator,
	datatype: "PlainDate",
	operand,
})

export default IsPlainDate
