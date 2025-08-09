import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsAscending = (datatype = "Array") => (operand) => ({
	tag: "IsAscending",
	type: OPERAND_TYPES.operator,
	datatype,
	operand,
})

export default IsAscending
