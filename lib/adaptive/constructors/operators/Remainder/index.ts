import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Remainder = (datatype = "Number") => (dividend) => (divisor) => ({
	tag: "Remainder",
	type: OPERAND_TYPES.operator,
	dividend,
	divisor,
	datatype,
})

export default Remainder
