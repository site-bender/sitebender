import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

const IsNumber = (operand: Operand) => ({
	tag: "IsNumber",
	type: OPERAND_TYPES.comparator,
	datatype: "Number",
	operand,
})

export default IsNumber
