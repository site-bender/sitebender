import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

const IsSubset = (datatype: "Set" = "Set") => (operand: Operand) => (test: Operand) => ({
	tag: "IsSubset",
	type: OPERAND_TYPES.comparator,
	datatype,
	operand,
	test,
})

export default IsSubset
