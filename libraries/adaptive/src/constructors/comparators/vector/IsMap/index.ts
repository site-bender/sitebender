import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsMap = (operand) => ({
	tag: "IsMap",
	type: OPERAND_TYPES.comparator,
	datatype: "Map",
	operand,
})

export default IsMap
