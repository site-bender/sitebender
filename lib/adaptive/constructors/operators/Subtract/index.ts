import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Subtract = (datatype = "Number") => (minuend) => (subtrahend) => ({
	tag: "Subtract",
	type: OPERAND_TYPES.operator,
	minuend,
	subtrahend,
	datatype,
})

export default Subtract
