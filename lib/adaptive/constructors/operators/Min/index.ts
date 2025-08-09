import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Min = (datatype = "Number") => (operands = []) => ({
	tag: "Min",
	type: OPERAND_TYPES.operator,
	operands,
	datatype,
})

export default Min
