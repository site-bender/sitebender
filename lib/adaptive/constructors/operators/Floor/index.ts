import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Floor = (datatype = "Number") => (decimalPlaces = 0) => (operand) => ({
	tag: "Floor",
	type: OPERAND_TYPES.operator,
	datatype,
	decimalPlaces,
	operand,
})

export default Floor
