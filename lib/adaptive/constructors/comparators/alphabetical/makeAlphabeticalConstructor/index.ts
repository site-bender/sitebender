import type { Datatype, Operand } from "../../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constants/index.ts"

type AlphabeticalComparatorTag =
	| "IsAfterAlphabetically"
	| "IsBeforeAlphabetically"
	| "IsNotAfterAlphabetically"
	| "IsNotBeforeAlphabetically"
	| "IsNotSameAlphabetically"
	| "IsSameAlphabetically"

interface AlphabeticalComparator {
	tag: AlphabeticalComparatorTag
	type: typeof OPERAND_TYPES.comparator
	datatype: Datatype
	operand: Operand
	test: Operand
}

const makeAlphabeticalConstructor =
	<T extends AlphabeticalComparatorTag>(tag: T) =>
	(datatype: Datatype = "String") =>
	(operand: Operand) =>
	(test: Operand): AlphabeticalComparator => ({
		tag,
		type: OPERAND_TYPES.comparator,
		datatype,
		operand,
		test,
	})

export default makeAlphabeticalConstructor
