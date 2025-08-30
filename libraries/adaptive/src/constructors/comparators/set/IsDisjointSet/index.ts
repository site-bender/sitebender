import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

const IsDisjointSet = (datatype: "Set" = "Set") => (operand: Operand) => (test: Operand) => ({
	tag: "IsDisjointSet",
	type: OPERAND_TYPES.comparator,
	datatype,
	operand,
	test,
})

export default IsDisjointSet
