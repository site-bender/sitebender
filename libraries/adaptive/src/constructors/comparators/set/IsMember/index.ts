import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

const IsMember = (datatype: "Member" | "Set" = "Member") => (operand: Operand) => (test: Operand) => ({
	tag: "IsMember",
	type: OPERAND_TYPES.comparator,
	datatype,
	operand,
	test,
})

export default IsMember
