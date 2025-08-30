import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

const IsBoolean = (operand: Operand) => ({
	tag: "IsBoolean",
	type: OPERAND_TYPES.comparator,
	datatype: "Boolean",
	operand,
})

export default IsBoolean
