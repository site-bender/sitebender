import type { NumericDatatype, Operand } from "../../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constants/index.ts"

type LengthComparatorTag =
	| "IsLength"
	| "IsLongerThan"
	| "IsNoLongerThan"
	| "IsNoShorterThan"
	| "IsNotLength"
	| "IsNotSameLength"
	| "IsSameLength"
	| "IsShorterThan"

interface LengthComparator {
	tag: LengthComparatorTag
	type: typeof OPERAND_TYPES.comparator
	datatype: NumericDatatype
	operand: Operand
	test: Operand
}

const makeLengthConstructor =
	<T extends LengthComparatorTag>(tag: T) =>
	(datatype: NumericDatatype = "Number") =>
	(operand: Operand) =>
	(test: Operand): LengthComparator => ({
		tag,
		type: OPERAND_TYPES.comparator,
		datatype,
		operand,
		test,
	})

export default makeLengthConstructor
