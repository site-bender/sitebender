import type {
	MultiplyOperator,
	Operand,
} from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import MultiplyConstructor from "../../../../../artificer/src/constructors/operators/Multiply/index.ts"

export type Props = {
	type?: "Number"
	datatype?: "Number"
	children?: JSX.Element | JSX.Element[]
}

export default function Multiply(
	{ type = "Number", datatype, children = [] }: Props,
): MultiplyOperator {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]
	return MultiplyConstructor(actualType)(childArray as unknown as Operand[])
}
