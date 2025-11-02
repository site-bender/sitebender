import type {
	CeilingOperator,
	Operand,
} from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import CeilingConstructor from "../../../../../artificer/src/constructors/operators/Ceiling/index.ts"

export type Props = {
	type?: "Number"
	datatype?: "Number"
	children?: JSX.Element | JSX.Element[]
}

export default function Ceiling({
	type = "Number",
	datatype,
	children = [],
}: Props): CeilingOperator {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	// Ceiling constructor signature: (datatype) => (decimalPlaces?) => (operand)
	return CeilingConstructor(actualType)()(childArray[0] as unknown as Operand)
}
