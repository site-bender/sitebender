import type {
	Operand,
	RoundOperator,
} from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import RoundConstructor from "../../../../../artificer/src/constructors/operators/Round/index.ts"

export type Props = {
	type?: "Number"
	datatype?: "Number"
	children?: JSX.Element | JSX.Element[]
}

export default function Round({
	type = "Number",
	datatype,
	children = [],
}: Props): RoundOperator {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	// Round constructor signature: (datatype) => (decimalPlaces?) => (operand)
	return RoundConstructor(actualType)()(childArray[0] as unknown as Operand)
}
