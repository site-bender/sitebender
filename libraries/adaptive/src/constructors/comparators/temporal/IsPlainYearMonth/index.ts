import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

const IsPlainYearMonth = (operand: Operand) => ({
	tag: "IsPlainYearMonth",
	type: OPERAND_TYPES.comparator,
	datatype: "PlainYearMonth",
	operand,
})

export default IsPlainYearMonth
