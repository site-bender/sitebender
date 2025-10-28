import type {
	Operand,
	PowerOperator,
} from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import PowerConstructor from "../../../../../artificer/src/constructors/operators/Power/index.ts"

export type Props = {
	type?: "Number"
	datatype?: "Number"
	children?: JSX.Element | JSX.Element[]
}

export default function Power({
	type = "Number",
	datatype,
	children = [],
}: Props): PowerOperator {
	const actualType = datatype || type
	const [base, exponent] = Array.isArray(children) ? children : [children]

	// Power: (datatype) => (base) => (exponent)
	return PowerConstructor(actualType)(base as unknown as Operand)(
		exponent as unknown as Operand,
	)
}
