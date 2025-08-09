import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const HyperbolicTangent = (datatype = "Number") => (operand) => ({
	tag: "HyperbolicTangent",
	type: OPERAND_TYPES.operator,
	operand,
	datatype,
})

export default HyperbolicTangent
