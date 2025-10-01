import type {
	MaxOperator,
	NumericDatatype,
	Operand,
	StringDatatype,
	TemporalDatatype,
} from "../../../../../architect/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import MaxConstructor from "../../../../../architect/src/constructors/operators/Max/index.ts"

export type Props = {
	type?: NumericDatatype | StringDatatype | TemporalDatatype
	datatype?: NumericDatatype | StringDatatype | TemporalDatatype
	children?: JSX.Element | JSX.Element[]
}

export default function Max(
	{ type = "Number", datatype, children = [] }: Props,
): MaxOperator {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]
	return MaxConstructor(actualType)(childArray as unknown as Operand[])
}
