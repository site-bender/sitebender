import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Max = (datatype = "Number") => (operands = []) => ({
	tag: "Max",
	type: OPERAND_TYPES.operator,
	operands,
	datatype,
})

export default Max
