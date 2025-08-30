import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

const IsString = (operand: Operand) => ({
	tag: "IsString",
	type: OPERAND_TYPES.comparator,
	datatype: "String",
	operand,
})

export default IsString
