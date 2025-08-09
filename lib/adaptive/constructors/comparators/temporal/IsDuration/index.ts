import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsDuration = (operand) => ({
	tag: "IsDuration",
	type: OPERAND_TYPES.operator,
	datatype: "Duration",
	operand,
})

export default IsDuration
