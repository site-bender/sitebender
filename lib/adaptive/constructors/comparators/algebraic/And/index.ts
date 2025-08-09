import { OPERAND_TYPES } from "../../../../constants.ts.js"

const And = (datatype) => (operands = []) => ({
	tag: "And",
	type: OPERAND_TYPES.operator,
	operands,
	datatype,
})

export default And
