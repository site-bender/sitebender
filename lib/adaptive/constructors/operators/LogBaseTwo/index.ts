import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const LogBaseTwo = (datatype = "Number") => (operand) => ({
	tag: "LogBaseTwo",
	type: OPERAND_TYPES.operator,
	operand,
	datatype,
})

export default LogBaseTwo
