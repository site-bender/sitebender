import type {
	IsLengthComparator,
	Operand,
} from "../../../../../architect/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import IsLengthConstructor from "../../../../../architect/src/constructors/comparators/length/IsLength/index.ts"

export type Props = {
	// authoring accepts String|Array, but length comparator uses a numeric length under the hood
	type?: "String" | "Array"
	datatype?: "String" | "Array"
	children?: JSX.Element | JSX.Element[]
}

export default function IsLength({
	type: _type = "String",
	datatype: _datatype,
	children = [],
}: Props): IsLengthComparator {
	// Map authoring types to numeric length comparator type
	const actualNumericType = "Number" as const
	const childArray = Array.isArray(children) ? children : [children]
	const [operand, test] = childArray

	// IsLength constructor signature: (datatype) => (operand) => (test)
	return IsLengthConstructor(actualNumericType)(
		operand as unknown as Operand,
	)(test as unknown as Operand) as unknown as IsLengthComparator
}
