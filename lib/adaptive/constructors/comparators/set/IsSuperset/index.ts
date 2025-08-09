import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsSuperset = (datatype = "Set") => (operand) => (test) => ({
	tag: "IsSuperset",
	type: OPERAND_TYPES.operator,
	datatype,
	operand,
	test,
})

export default IsSuperset
