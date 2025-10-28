import type {
	IsLongerThanComparator,
	Operand,
} from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import IsLongerThanConstructor from "../../../../../artificer/src/constructors/comparators/length/IsLongerThan/index.ts"

export type Props = {
	type?: "String" | "Array"
	datatype?: "String" | "Array"
	children?: JSX.Element | JSX.Element[]
}

export default function IsLongerThan({
	type: _type = "String",
	datatype: _datatype,
	children = [],
}: Props): IsLongerThanComparator {
	const actualType = "Number" as const
	const [operand, test] = Array.isArray(children) ? children : [children]

	// IsLongerThan: (datatype) => (operand) => (test)
	return IsLongerThanConstructor(actualType)(operand as unknown as Operand)(
		test as unknown as Operand,
	) as unknown as IsLongerThanComparator
}
