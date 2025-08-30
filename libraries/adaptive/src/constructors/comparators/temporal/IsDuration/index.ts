import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

const IsDuration = (operand: Operand) => ({
	tag: "IsDuration",
	type: OPERAND_TYPES.comparator,
	datatype: "Duration",
	operand,
})

export default IsDuration
