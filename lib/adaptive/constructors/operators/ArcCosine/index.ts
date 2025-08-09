import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const ArcCosine = (datatype = "Number") => (operand) => ({
	tag: "ArcCosine",
	type: OPERAND_TYPES.operator,
	datatype,
	operand,
})

export default ArcCosine
