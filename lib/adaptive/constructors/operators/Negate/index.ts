import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Negate = (datatype = "Number") => (operand) => ({
	tag: "Negate",
	type: OPERAND_TYPES.operator,
	operand,
	datatype,
})

export default Negate
