import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const RootMeanSquare = (datatype = "Number") => (operands = []) => ({
	tag: "RootMeanSquare",
	type: OPERAND_TYPES.operator,
	operands,
	datatype,
})

export default RootMeanSquare
