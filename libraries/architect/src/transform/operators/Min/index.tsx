import type {
	MinOperator,
	NumericDatatype,
	Operand,
	StringDatatype,
	TemporalDatatype,
} from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import MinConstructor from "../../../../../artificer/src/constructors/operators/Min/index.ts"

export type Props = {
	type?: NumericDatatype | StringDatatype | TemporalDatatype
	datatype?: NumericDatatype | StringDatatype | TemporalDatatype
	children?: JSX.Element | JSX.Element[]
}

export default function Min(
	{ type = "Number", datatype, children = [] }: Props,
): MinOperator {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]
	return MinConstructor(actualType)(childArray as unknown as Operand[])
}
