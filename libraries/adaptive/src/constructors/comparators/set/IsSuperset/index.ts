import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsSuperset = (datatype = "Set") => (operand) => (test) => ({
	tag: "IsSuperset",
	type: OPERAND_TYPES.comparator,
	datatype,
	operand,
	test,
})

export default IsSuperset
