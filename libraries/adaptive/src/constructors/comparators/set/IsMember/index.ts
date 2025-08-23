import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsMember = (datatype = "Member") => (operand) => (test) => ({
	tag: "IsMember",
	type: OPERAND_TYPES.comparator,
	datatype,
	operand,
	test,
})

export default IsMember
