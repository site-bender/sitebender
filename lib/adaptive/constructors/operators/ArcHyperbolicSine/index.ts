import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const ArcHyperbolicSine = (datatype = "Number") => (operand) => ({
	tag: "ArcHyperbolicSine",
	type: OPERAND_TYPES.operator,
	datatype,
	operand,
})

export default ArcHyperbolicSine
