import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Divide = (datatype = "Number") => (dividend) => (divisor) => ({
	tag: "Divide",
	type: OPERAND_TYPES.operator,
	dividend,
	divisor,
	datatype,
})

export default Divide
