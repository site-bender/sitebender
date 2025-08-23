import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsNumber = (operand) => ({
	tag: "IsNumber",
	type: OPERAND_TYPES.comparator,
	datatype: "Number",
	operand,
})

export default IsNumber
