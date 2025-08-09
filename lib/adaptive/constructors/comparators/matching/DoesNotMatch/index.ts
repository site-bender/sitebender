import { OPERAND_TYPES } from "../../../../constants.ts.js"

const DoesNotMatch = (operand) => (pattern) => (flags) => ({
	tag: "DoesNotMatch",
	type: OPERAND_TYPES.operator,
	datatype: "String",
	flags,
	operand,
	pattern,
})

export default DoesNotMatch
