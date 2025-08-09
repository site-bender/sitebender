import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Secant = (datatype = "Number") => (operand) => ({
	tag: "Secant",
	type: OPERAND_TYPES.operator,
	operand,
	datatype,
})

export default Secant
