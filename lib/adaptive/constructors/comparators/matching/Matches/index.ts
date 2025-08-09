import { OPERAND_TYPES } from "../../../../constants.ts.js"

const Matches = (operand) => (pattern) => (flags) => ({
	tag: "Matches",
	type: OPERAND_TYPES.operator,
	datatype: "String",
	flags,
	operand,
	pattern,
})

export default Matches
