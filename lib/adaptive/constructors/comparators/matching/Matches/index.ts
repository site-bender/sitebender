import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const Matches = (operand) => (pattern) => (flags) => ({
	tag: "Matches",
	type: OPERAND_TYPES.comparator,
	datatype: "String",
	flags,
	operand,
	pattern,
})

export default Matches
