import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsPlainMonthDay = (operand) => ({
	tag: "IsPlainMonthDay",
	type: OPERAND_TYPES.comparator,
	datatype: "PlainMonthDay",
	operand,
})

export default IsPlainMonthDay
