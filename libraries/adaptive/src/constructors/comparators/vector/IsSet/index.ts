import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"
import type { Datatype, IsSetComparator, Operand } from "../../../../types/index.ts"

const IsSet = (operand: Operand): IsSetComparator => ({
	tag: "IsSet",
	type: OPERAND_TYPES.comparator,
	datatype: "Set" satisfies Datatype,
	operand,
})

export default IsSet
