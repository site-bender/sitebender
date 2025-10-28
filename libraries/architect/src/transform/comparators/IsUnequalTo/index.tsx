import type {
	IsUnequalToComparator,
	Operand,
} from "../../../../../architect/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import IsUnequalToConstructor from "../../../../../architect/src/constructors/comparators/equality/IsUnequalTo/index.ts"

export type Props = {
	type?: "Number" | "String" | "Boolean" | "Date"
	datatype?: "Number" | "String" | "Boolean" | "Date"
	children?: JSX.Element | JSX.Element[]
}

export default function IsUnequalTo({
	type = "String",
	datatype,
	children = [],
}: Props): IsUnequalToComparator {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]

	// IsUnequalTo constructor signature: (datatype) => (operand) => (test)
	return IsUnequalToConstructor(actualType)(operand as unknown as Operand)(
		test as unknown as Operand,
	)
}
