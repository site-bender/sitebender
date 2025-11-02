import type {
	AverageOperator,
	Operand,
} from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import AverageConstructor from "../../../../../artificer/src/constructors/operators/Average/index.ts"

export type Props = {
	type?: "Number"
	datatype?: "Number"
	children?: JSX.Element | JSX.Element[]
}

export default function Average({
	type = "Number",
	datatype,
	children = [],
}: Props): AverageOperator {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	// Average constructor signature: (datatype) => (operands)
	return AverageConstructor(actualType)(childArray as unknown as Operand[])
}
