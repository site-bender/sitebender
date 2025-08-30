import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

const IsSuperset = (datatype: "Set" = "Set") => (operand: Operand) => (test: Operand) => ({
	tag: "IsSuperset",
	type: OPERAND_TYPES.comparator,
	datatype,
	operand,
	test,
})

export default IsSuperset
