import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsOverlappingSet = (datatype = "Set") => (operand) => (test) => ({
	tag: "IsOverlappingSet",
	type: OPERAND_TYPES.operator,
	datatype,
	operand,
	test,
})

export default IsOverlappingSet
