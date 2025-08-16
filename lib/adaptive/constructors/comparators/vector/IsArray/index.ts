import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsArray = (operand) => ({
	tag: "IsArray",
	type: OPERAND_TYPES.comparator,
	datatype: "Array",
	operand,
})

export default IsArray
