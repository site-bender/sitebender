import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Multiply = (datatype = "Number") => (multipliers = []) => ({
	tag: "Multiply",
	type: OPERAND_TYPES.operator,
	multipliers,
	datatype,
})

export default Multiply
