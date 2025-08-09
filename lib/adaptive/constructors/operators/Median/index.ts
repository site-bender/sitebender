import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Median = (datatype = "Number") => (operands = []) => ({
	tag: "Median",
	type: OPERAND_TYPES.operator,
	operands,
	datatype,
})

export default Median
