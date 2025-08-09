import { OPERAND_TYPES } from "../../../../constants.ts.js"

const Or = (datatype) => (operands = []) => ({
	tag: "Or",
	type: OPERAND_TYPES.operator,
	operands,
	datatype,
})

export default Or
