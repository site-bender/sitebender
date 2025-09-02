import type { Operand } from "@engineTypes/index.ts"

import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsPlainDateTime = (operand: Operand) => ({
	tag: "IsPlainDateTime",
	type: OPERAND_TYPES.comparator,
	datatype: "PlainDateTime",
	operand,
})

export default IsPlainDateTime
