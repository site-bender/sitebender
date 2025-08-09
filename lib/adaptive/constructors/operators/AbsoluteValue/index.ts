import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const AbsoluteValue = (datatype = "Number") => (operand) => ({
	tag: "AbsoluteValue",
	type: OPERAND_TYPES.operator,
	datatype,
	operand,
})

export default AbsoluteValue
