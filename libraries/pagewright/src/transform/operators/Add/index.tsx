import type {
	AddOperator,
	NumericDatatype,
	Operand,
	StringDatatype,
	TemporalDatatype,
} from "../../../../../architect/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import AddConstructor from "../../../../../architect/src/constructors/operators/Add/index.ts"

export type Props = {
	type?: NumericDatatype | StringDatatype | TemporalDatatype
	datatype?: NumericDatatype | StringDatatype | TemporalDatatype
	children?: JSX.Element | JSX.Element[]
}

export default function Add(
	{ type = "Number", datatype, children = [] }: Props,
): AddOperator {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]
	return AddConstructor(actualType)(childArray as unknown as Operand[])
}
