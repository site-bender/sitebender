import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsSubset = (datatype = "Set") => (operand) => (test) => ({
	tag: "IsSubset",
	type: OPERAND_TYPES.operator,
	datatype,
	operand,
	test,
})

export default IsSubset
