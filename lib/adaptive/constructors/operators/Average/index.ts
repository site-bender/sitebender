import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Average = (datatype = "Number") => (operands = []) => ({
	tag: "Average",
	type: OPERAND_TYPES.operator,
	operands,
	datatype,
})

export default Average
