import type {
	AbsoluteValueOperator,
	Operand,
} from "../../../../../architect/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import AbsoluteValueConstructor from "../../../../../architect/src/constructors/operators/AbsoluteValue/index.ts"

export type Props = {
	type?: "Number"
	datatype?: "Number"
	children?: JSX.Element | JSX.Element[]
}

export default function AbsoluteValue({
	type = "Number",
	datatype,
	children = [],
}: Props): AbsoluteValueOperator {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	// AbsoluteValue constructor signature: (datatype) => (operand)
	return AbsoluteValueConstructor(actualType)(
		childArray[0] as unknown as Operand,
	)
}
