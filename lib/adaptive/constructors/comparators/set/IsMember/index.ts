import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsMember = (datatype = "Member") => (operand) => (test) => ({
	tag: "IsMember",
	type: OPERAND_TYPES.operator,
	datatype,
	operand,
	test,
})

export default IsMember
