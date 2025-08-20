import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsInstant = (operand) => ({
	tag: "IsInstant",
	type: OPERAND_TYPES.comparator,
	datatype: "Instant",
	operand,
})

export default IsInstant
