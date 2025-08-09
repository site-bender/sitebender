import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Power = (datatype = "Number") => (base) => (exponent) => ({
	tag: "Power",
	type: OPERAND_TYPES.operator,
	base,
	exponent,
	datatype,
})

export default Power
