import type {
	Datatype,
	IsMapComparator,
	Operand,
} from "../../../../types/index.ts"

import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsMap = (operand: Operand): IsMapComparator => ({
	tag: "IsMap",
	type: OPERAND_TYPES.comparator,
	datatype: "Map" satisfies Datatype,
	operand,
})

export default IsMap
