import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Ceiling = (datatype = "Number") => (decimalPlaces = 0) => (operand) => ({
	tag: "Ceiling",
	type: OPERAND_TYPES.operator,
	datatype,
	decimalPlaces,
	operand,
})

export default Ceiling
