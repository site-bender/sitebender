import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Modulo = (datatype = "Number") => (dividend) => (divisor) => ({
	tag: "Modulo",
	type: OPERAND_TYPES.operator,
	dividend,
	divisor,
	datatype,
})

export default Modulo
