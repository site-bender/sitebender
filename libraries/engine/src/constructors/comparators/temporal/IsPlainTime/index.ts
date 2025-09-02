import type { Operand } from "@engineTypes/index.ts"

import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsPlainTime = (operand: Operand) => ({
	tag: "IsPlainTime",
	type: OPERAND_TYPES.comparator,
	datatype: "PlainTime",
	operand,
})

export default IsPlainTime
