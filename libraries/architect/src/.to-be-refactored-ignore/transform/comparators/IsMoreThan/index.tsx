import type {
	IsMoreThanComparator,
	NumericDatatype,
	Operand,
	TemporalDatatype,
} from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import IsMoreThanConstructor from "../../../../../artificer/src/constructors/comparators/amount/IsMoreThan/index.ts"

type AmountDatatype = NumericDatatype | TemporalDatatype

export type Props = {
	type?: AmountDatatype
	datatype?: AmountDatatype
	children?: JSX.Element | JSX.Element[]
}

export default function IsMoreThan({
	type = "Number",
	datatype,
	children = [],
}: Props): IsMoreThanComparator {
	const actualType: AmountDatatype = (datatype || type) as AmountDatatype
	const [operand, test] = Array.isArray(children) ? children : [children]
	// IsMoreThan: (datatype) => (operand) => (test)
	return IsMoreThanConstructor(actualType)(operand as unknown as Operand)(
		test as unknown as Operand,
	) as unknown as IsMoreThanComparator
}
