import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Hypotenuse = (datatype = "Number") => (operands = []) => ({
	tag: "Hypotenuse",
	type: OPERAND_TYPES.operator,
	operands,
	datatype,
})

export default Hypotenuse
