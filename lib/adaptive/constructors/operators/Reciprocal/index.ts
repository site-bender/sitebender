import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Reciprocal = (datatype = "Number") => (operand) => ({
	tag: "Reciprocal",
	type: OPERAND_TYPES.operator,
	operand,
	datatype,
})

export default Reciprocal
