import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

const IsAscending = (datatype: "Array" | "Set" = "Array") => (operand: Operand) => ({
	tag: "IsAscending",
	type: OPERAND_TYPES.comparator,
	datatype,
	operand,
})

export default IsAscending
