import type {
	DivideOperator,
	NumericDatatype,
	Operand,
} from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import DivideConstructor from "../../../../../artificer/src/constructors/operators/Divide/index.ts"

export type Props = {
	type?: NumericDatatype
	datatype?: NumericDatatype
	children?: JSX.Element | JSX.Element[]
}

export default function Divide({
	type = "Number",
	datatype,
	children = [],
}: Props): DivideOperator {
	const actualType = datatype || type
	const [dividend, divisor] = Array.isArray(children) ? children : [children]

	// The arborist will extract Value/By or Dividend/Divisor from children
	return DivideConstructor(actualType)(dividend as unknown as Operand)(
		divisor as unknown as Operand,
	)
}
