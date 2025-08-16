import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsZonedDateTime = (operand) => ({
	tag: "IsZonedDateTime",
	type: OPERAND_TYPES.comparator,
	datatype: "ZonedDateTime",
	operand,
})

export default IsZonedDateTime
