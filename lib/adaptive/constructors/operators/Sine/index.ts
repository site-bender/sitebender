import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Sine = (datatype = "Number") => (operand) => ({
	tag: "Sine",
	type: OPERAND_TYPES.operator,
	operand,
	datatype,
})

export default Sine
