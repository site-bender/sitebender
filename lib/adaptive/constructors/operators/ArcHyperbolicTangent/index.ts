import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const ArcHyperbolicTangent = (datatype = "Number") => (operand) => ({
	tag: "ArcHyperbolicTangent",
	type: OPERAND_TYPES.operator,
	datatype,
	operand,
})

export default ArcHyperbolicTangent
