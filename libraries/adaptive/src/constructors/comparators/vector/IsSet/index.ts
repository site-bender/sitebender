import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsSet = (operand) => ({
	tag: "IsSet",
	type: OPERAND_TYPES.comparator,
	datatype: "Set",
	operand,
})

export default IsSet
