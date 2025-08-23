import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsDisjointSet = (datatype = "Set") => (operand) => (test) => ({
	tag: "IsDisjointSet",
	type: OPERAND_TYPES.comparator,
	datatype,
	operand,
	test,
})

export default IsDisjointSet
