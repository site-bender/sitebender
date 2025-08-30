import type {
	Operand,
	TemporalDatatype,
} from "../../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constants/index.ts"

type TimeComparatorTag =
	| "IsAfterTime"
	| "IsBeforeTime"
	| "IsNotAfterTime"
	| "IsNotBeforeTime"
	| "IsNotSameTime"
	| "IsSameTime"

interface TimeComparator {
	tag: TimeComparatorTag
	type: typeof OPERAND_TYPES.comparator
	datatype: TemporalDatatype
	operand: Operand
	test: Operand
}

const makeTimeConstructor =
	<T extends TimeComparatorTag>(tag: T) =>
	(datatype: TemporalDatatype = "Time") =>
	(operand: Operand) =>
	(test: Operand): TimeComparator => ({
		tag,
		type: OPERAND_TYPES.comparator,
		datatype,
		operand,
		test,
	})

export default makeTimeConstructor
