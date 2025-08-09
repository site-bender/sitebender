import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsPlainYearMonth = (operand) => ({
	tag: "IsPlainYearMonth",
	type: OPERAND_TYPES.operator,
	datatype: "PlainYearMonth",
	operand,
})

export default IsPlainYearMonth
