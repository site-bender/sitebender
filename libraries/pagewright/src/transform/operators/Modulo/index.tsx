import type {
	ModuloOperator,
	Operand,
} from "../../../../../architect/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import ModuloConstructor from "../../../../../architect/src/constructors/operators/Modulo/index.ts"

export type Props = {
	type?: "Number"
	datatype?: "Number"
	children?: JSX.Element | JSX.Element[]
}

export default function Modulo({
	type = "Number",
	datatype,
	children = [],
}: Props): ModuloOperator {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]
	const [dividend, divisor] = childArray

	// Modulo constructor signature: (datatype) => (dividend) => (divisor)
	return ModuloConstructor(actualType)(dividend as unknown as Operand)(
		divisor as unknown as Operand,
	)
}
