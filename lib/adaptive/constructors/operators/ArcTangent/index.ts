import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const ArcTangent = (datatype = "Number") => (operand) => ({
	tag: "ArcTangent",
	type: OPERAND_TYPES.operator,
	datatype,
	operand,
})

export default ArcTangent
