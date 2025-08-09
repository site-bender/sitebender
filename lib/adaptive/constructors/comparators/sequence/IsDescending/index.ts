import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsDescending = (datatype = "Array") => (operand) => ({
	tag: "IsDescending",
	type: OPERAND_TYPES.operator,
	datatype,
	operand,
})

export default IsDescending
