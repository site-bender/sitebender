import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const HyperbolicCosine = (datatype = "Number") => (operand) => ({
	tag: "HyperbolicCosine",
	type: OPERAND_TYPES.operator,
	operand,
	datatype,
})

export default HyperbolicCosine
