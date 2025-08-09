import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Cotangent = (datatype = "Number") => (operand) => ({
	tag: "Cotangent",
	type: OPERAND_TYPES.operator,
	operand,
	datatype,
})

export default Cotangent
