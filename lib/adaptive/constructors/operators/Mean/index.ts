import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Mean = (datatype = "Number") => (operands = []) => ({
	tag: "Mean",
	type: OPERAND_TYPES.operator,
	operands,
	datatype,
})

export default Mean
