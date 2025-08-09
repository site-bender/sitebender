import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsInstant = (operand) => ({
	tag: "IsInstant",
	type: OPERAND_TYPES.operator,
	datatype: "Instant",
	operand,
})

export default IsInstant
