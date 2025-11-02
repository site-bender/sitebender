import type {
	IsBeforeDateComparator,
	Operand,
} from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import IsBeforeDateConstructor from "../../../../../artificer/src/constructors/comparators/date/IsBeforeDate/index.ts"

export type Props = {
	type?: "Date"
	datatype?: "Date"
	children?: JSX.Element | JSX.Element[]
}

export default function IsBeforeDate({
	type = "Date",
	datatype,
	children = [],
}: Props): IsBeforeDateComparator {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]
	// IsBeforeDate: (datatype) => (operand) => (test)
	return IsBeforeDateConstructor(actualType)(
		operand as unknown as Operand,
	)(test as unknown as Operand) as unknown as IsBeforeDateComparator
}
