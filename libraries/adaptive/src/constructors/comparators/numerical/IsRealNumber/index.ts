import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsRealNumber = (operand) => ({
	tag: "IsRealNumber",
	type: OPERAND_TYPES.comparator,
	datatype: "RealNumber",
	operand,
})

export default IsRealNumber
