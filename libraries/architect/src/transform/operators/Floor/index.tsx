import type {
	FloorOperator,
	Operand,
} from "../../../../../architect/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import FloorConstructor from "../../../../../architect/src/constructors/operators/Floor/index.ts"

export type Props = {
	type?: "Number"
	datatype?: "Number"
	children?: JSX.Element | JSX.Element[]
}

export default function Floor({
	type = "Number",
	datatype,
	children = [],
}: Props): FloorOperator {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	// Floor constructor signature: (datatype) => (decimalPlaces?) => (operand)
	return FloorConstructor(actualType)()(childArray[0] as unknown as Operand)
}
