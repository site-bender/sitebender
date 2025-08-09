import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Round = (datatype = "Number") => (decimalPlaces = 0) => (operand) => ({
	tag: "Round",
	type: OPERAND_TYPES.operator,
	datatype,
	decimalPlaces,
	operand,
})

export default Round
