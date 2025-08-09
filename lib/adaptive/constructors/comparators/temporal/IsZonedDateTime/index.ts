import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsZonedDateTime = (operand) => ({
	tag: "IsZonedDateTime",
	type: OPERAND_TYPES.operator,
	datatype: "ZonedDateTime",
	operand,
})

export default IsZonedDateTime
