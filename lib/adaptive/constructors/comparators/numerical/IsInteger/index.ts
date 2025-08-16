import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsInteger = (operand) => ({
	tag: "IsInteger",
	type: OPERAND_TYPES.comparator,
	datatype: "Integer",
	operand,
})

export default IsInteger
