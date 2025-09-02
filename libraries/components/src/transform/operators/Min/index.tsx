import type {
	MinOperator,
	NumericDatatype,
	Operand,
	StringDatatype,
	TemporalDatatype,
} from "@engineTypes/index.ts"

/**
 * Min JSX Component
 *
 * Wrapper for the Min operator constructor.
 * Returns the minimum value from the provided operands.
 *
 * @example
 * <Min type="Number">
 *   <FromElement id="price1" />
 *   <FromElement id="price2" />
 *   <FromElement id="price3" />
 * </Min>
 */

import MinConstructor from "@engineSrc/constructors/operators/Min/index.ts"

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
