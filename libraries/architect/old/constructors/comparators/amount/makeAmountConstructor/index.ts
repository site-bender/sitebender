import type {
	NumericDatatype,
	Operand,
	TemporalDatatype,
} from "../../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constants/index.ts"

type AmountComparatorTag =
	| "IsLessThan"
	| "IsMoreThan"
	| "IsNoLessThan"
	| "IsNoMoreThan"

type AmountDatatype = NumericDatatype | TemporalDatatype

interface AmountComparator {
	tag: AmountComparatorTag
	type: typeof OPERAND_TYPES.comparator
	datatype: AmountDatatype
	operand: Operand
	test: Operand
}

const makeAmountConstructor =
	<T extends AmountComparatorTag>(tag: T) =>
	(datatype: AmountDatatype = "Number") =>
	(operand: Operand) =>
	(test: Operand): AmountComparator => ({
		tag: tag as AmountComparatorTag,
		type: OPERAND_TYPES.comparator,
		datatype,
		operand,
		test,
	})

export default makeAmountConstructor
