import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsDuration = (operand) => ({
	tag: "IsDuration",
	type: OPERAND_TYPES.comparator,
	datatype: "Duration",
	operand,
})

export default IsDuration
