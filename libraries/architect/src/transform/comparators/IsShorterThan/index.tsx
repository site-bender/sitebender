import type {
	IsShorterThanComparator,
	Operand,
} from "../../../../../architect/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import IsShorterThanConstructor from "../../../../../architect/src/constructors/comparators/length/IsShorterThan/index.ts"

export type Props = {
	type?: "String" | "Array"
	datatype?: "String" | "Array"
	children?: JSX.Element | JSX.Element[]
}

export default function IsShorterThan({
	type: _type = "String",
	datatype: _datatype,
	children = [],
}: Props): IsShorterThanComparator {
	const actualType = "Number" as const
	const [operand, test] = Array.isArray(children) ? children : [children]

	// IsShorterThan: (datatype) => (operand) => (test)
	return IsShorterThanConstructor(actualType)(operand as unknown as Operand)(
		test as unknown as Operand,
	) as unknown as IsShorterThanComparator
}
