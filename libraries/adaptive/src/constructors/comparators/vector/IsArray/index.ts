import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"
import type { Datatype, IsArrayComparator, Operand } from "../../../../types/index.ts"

const IsArray = (operand: Operand): IsArrayComparator => ({
	tag: "IsArray",
	type: OPERAND_TYPES.comparator,
	datatype: "Array" satisfies Datatype,
	operand,
})

export default IsArray
