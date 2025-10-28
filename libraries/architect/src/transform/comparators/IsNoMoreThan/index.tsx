import type {
	IsNoMoreThanComparator,
	NumericDatatype,
	Operand,
	TemporalDatatype,
} from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import IsNoMoreThanConstructor from "../../../../../artificer/src/constructors/comparators/amount/IsNoMoreThan/index.ts"

type AmountDatatype = NumericDatatype | TemporalDatatype

export type Props = {
	type?: AmountDatatype
	datatype?: AmountDatatype
	children?: JSX.Element | JSX.Element[]
}

export default function IsNoMoreThan({
	type = "Number",
	datatype,
	children = [],
}: Props): IsNoMoreThanComparator {
	const actualType: AmountDatatype = (datatype || type) as AmountDatatype
	const [operand, test] = Array.isArray(children) ? children : [children]

	// IsNoMoreThan: (datatype) => (operand) => (test)
	return IsNoMoreThanConstructor(actualType)(operand as unknown as Operand)(
		test as unknown as Operand,
	) as unknown as IsNoMoreThanComparator
}
