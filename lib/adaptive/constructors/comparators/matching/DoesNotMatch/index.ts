import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const DoesNotMatch = (operand) => (pattern) => (flags) => ({
	tag: "DoesNotMatch",
	type: OPERAND_TYPES.comparator,
	datatype: "String",
	flags,
	operand,
	pattern,
})

export default DoesNotMatch
