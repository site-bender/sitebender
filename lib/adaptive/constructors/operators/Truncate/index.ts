import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Truncate = (datatype = "Number") => (decimalPlaces = 0) => (operand) => ({
	tag: "Truncate",
	type: OPERAND_TYPES.operator,
	datatype,
	decimalPlaces,
	operand,
})

export default Truncate
