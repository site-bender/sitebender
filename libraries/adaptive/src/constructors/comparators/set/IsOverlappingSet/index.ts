import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsOverlappingSet = (datatype = "Set") => (operand) => (test) => ({
	tag: "IsOverlappingSet",
	type: OPERAND_TYPES.comparator,
	datatype,
	operand,
	test,
})

export default IsOverlappingSet
