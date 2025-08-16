import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsString = (operand) => ({
	tag: "IsString",
	type: OPERAND_TYPES.comparator,
	datatype: "String",
	operand,
})

export default IsString
