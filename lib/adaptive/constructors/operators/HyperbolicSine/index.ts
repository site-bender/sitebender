import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const HyperbolicSine = (datatype = "Number") => (operand) => ({
	tag: "HyperbolicSine",
	type: OPERAND_TYPES.operator,
	operand,
	datatype,
})

export default HyperbolicSine
