import type {
	IsEqualToComparator,
	Operand,
} from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import IsEqualToConstructor from "../../../../../artificer/src/constructors/comparators/equality/IsEqualTo/index.ts"

export type Props = {
	type?: "Number" | "String" | "Boolean" | "Date"
	datatype?: "Number" | "String" | "Boolean" | "Date"
	children?: JSX.Element | JSX.Element[]
}

export default function IsEqualTo({
	type = "String",
	datatype,
	children = [],
}: Props): IsEqualToComparator {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]
	// IsEqualTo: (datatype) => (operand) => (test)
	return IsEqualToConstructor(actualType)(operand as unknown as Operand)(
		test as unknown as Operand,
	)
}
