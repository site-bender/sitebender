import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Log = (datatype = "Number") => (operand) => ({
	tag: "Log",
	type: OPERAND_TYPES.operator,
	operand,
	datatype,
})

export default Log
