import type {
	MaxOperator,
	NumericDatatype,
	Operand,
	StringDatatype,
	TemporalDatatype,
} from "@sitebender/engine-types/index.ts"

/**
 * Max JSX Component
 *
 * Wrapper for the Max operator constructor.
 * Returns the maximum value from the provided operands.
 *
 * @example
 * <Max type="Number">
 *   <FromElement id="bid1" />
 *   <FromElement id="bid2" />
 *   <FromElement id="bid3" />
 * </Max>
 */

import MaxConstructor from "@sitebender/engine/constructors/operators/Max/index.ts"

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
