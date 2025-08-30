import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

const IsPlainTime = (operand: Operand) => ({
	tag: "IsPlainTime",
	type: OPERAND_TYPES.comparator,
	datatype: "PlainTime",
	operand,
})

export default IsPlainTime
