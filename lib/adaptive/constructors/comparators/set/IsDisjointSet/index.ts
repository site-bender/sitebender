import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsDisjointSet = (datatype = "Set") => (operand) => (test) => ({
	tag: "IsDisjointSet",
	type: OPERAND_TYPES.operator,
	datatype,
	operand,
	test,
})

export default IsDisjointSet
