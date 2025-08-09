import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const ArcHyperbolicCosine = (datatype = "Number") => (operand) => ({
	tag: "ArcHyperbolicCosine",
	type: OPERAND_TYPES.operator,
	datatype,
	operand,
})

export default ArcHyperbolicCosine
