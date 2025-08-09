import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Mode = (datatype = "Number") => (operands = []) => ({
	tag: "Mode",
	type: OPERAND_TYPES.operator,
	operands,
	datatype,
})

export default Mode
