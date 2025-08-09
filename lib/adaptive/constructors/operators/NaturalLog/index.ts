import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const NaturalLog = (datatype = "Number") => (operand) => ({
	tag: "NaturalLog",
	type: OPERAND_TYPES.operator,
	operand,
	datatype,
})

export default NaturalLog
