import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const ArcSine = (datatype = "Number") => (operand) => ({
	tag: "ArcSine",
	type: OPERAND_TYPES.operator,
	datatype,
	operand,
})

export default ArcSine
