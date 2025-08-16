import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsSubset = (datatype = "Set") => (operand) => (test) => ({
	tag: "IsSubset",
	type: OPERAND_TYPES.comparator,
	datatype,
	operand,
	test,
})

export default IsSubset
