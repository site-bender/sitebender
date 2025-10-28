import type {
	NumericDatatype,
	Operand,
	SubtractOperator,
} from "../../../../../architect/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import SubtractConstructor from "../../../../../architect/src/constructors/operators/Subtract/index.ts"

export type Props = {
	type?: NumericDatatype
	datatype?: NumericDatatype
	children?: JSX.Element | JSX.Element[]
}

export default function Subtract({
	type = "Number",
	datatype,
	children = [],
}: Props): SubtractOperator {
	const actualType = datatype || type
	const [minuend, subtrahend] = Array.isArray(children) ? children : [children]

	// The arborist will extract From/Amount or Minuend/Subtrahend from children
	return SubtractConstructor(actualType)(minuend as unknown as Operand)(
		subtrahend as unknown as Operand,
	)
}
