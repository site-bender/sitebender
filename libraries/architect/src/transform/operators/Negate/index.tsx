import type {
	NegateOperator,
	Operand,
} from "../../../../../architect/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import NegateConstructor from "../../../../../architect/src/constructors/operators/Negate/index.ts"

export type Props = {
	type?: "Number"
	datatype?: "Number"
	children?: JSX.Element | JSX.Element[]
}

export default function Negate({
	type = "Number",
	datatype,
	children = [],
}: Props): NegateOperator {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	// Negate constructor signature: (datatype) => (operand)
	return NegateConstructor(actualType)(childArray[0] as unknown as Operand)
}
