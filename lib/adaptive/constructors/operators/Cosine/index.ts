import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Cosine = (datatype = "Number") => (operand) => ({
	tag: "Cosine",
	type: OPERAND_TYPES.operator,
	operand,
	datatype,
})

export default Cosine
