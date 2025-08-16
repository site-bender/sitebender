import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsBoolean = (operand) => ({
	tag: "IsBoolean",
	type: OPERAND_TYPES.comparator,
	datatype: "Boolean",
	operand,
})

export default IsBoolean
