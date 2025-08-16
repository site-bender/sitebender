import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsAscending = (datatype = "Array") => (operand) => ({
	tag: "IsAscending",
	type: OPERAND_TYPES.comparator,
	datatype,
	operand,
})

export default IsAscending
