import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsPlainYearMonth = (operand) => ({
	tag: "IsPlainYearMonth",
	type: OPERAND_TYPES.comparator,
	datatype: "PlainYearMonth",
	operand,
})

export default IsPlainYearMonth
