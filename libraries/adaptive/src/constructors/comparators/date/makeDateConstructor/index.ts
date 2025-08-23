import type {
	Datatype,
	Operand,
	TemporalDatatype,
} from "../../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constants/index.ts"

type DateComparatorTag =
	| "IsAfterDate"
	| "IsBeforeDate"
	| "IsNotAfterDate"
	| "IsNotBeforeDate"
	| "IsNotSameDate"
	| "IsSameDate"

interface DateComparator {
	tag: DateComparatorTag
	type: typeof OPERAND_TYPES.comparator
	datatype: TemporalDatatype
	operand: Operand
	test: Operand
}

const makeDateConstructor =
	<T extends DateComparatorTag>(tag: T) =>
	(datatype: TemporalDatatype = "Date") =>
	(operand: Operand) =>
	(test: Operand): DateComparator => ({
		tag,
		type: OPERAND_TYPES.comparator,
		datatype,
		operand,
		test,
	})

export default makeDateConstructor
