import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

const IsRealNumber = (operand: Operand) => ({
	tag: "IsRealNumber",
	type: OPERAND_TYPES.comparator,
	datatype: "Number",
	operand,
})

export default IsRealNumber
