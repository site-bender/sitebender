import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Cosecant = (datatype = "Number") => (operand) => ({
	tag: "Cosecant",
	type: OPERAND_TYPES.operator,
	operand,
	datatype,
})

export default Cosecant
