import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

const IsInteger = (operand: Operand) => ({
	tag: "IsInteger",
	type: OPERAND_TYPES.comparator,
	datatype: "Integer",
	operand,
})

export default IsInteger
