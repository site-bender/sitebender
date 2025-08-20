import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsDescending = (datatype = "Array") => (operand) => ({
	tag: "IsDescending",
	type: OPERAND_TYPES.comparator,
	datatype,
	operand,
})

export default IsDescending
