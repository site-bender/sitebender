import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Exponent = (datatype = "Number") => (operand) => ({
	tag: "Exponent",
	type: OPERAND_TYPES.operator,
	operand,
	datatype,
})

export default Exponent
