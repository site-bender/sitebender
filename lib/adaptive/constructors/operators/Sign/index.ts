import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Sign = (datatype = "Number") => (operand) => ({
	tag: "Sign",
	type: OPERAND_TYPES.operator,
	operand,
	datatype,
})

export default Sign
