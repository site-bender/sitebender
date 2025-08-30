/**
 * Add JSX Component
 *
 * Wrapper for the Add operator constructor.
 * Children are treated as addends to be summed.
 *
 * @example
 * <Add type="Number">
 *   <FromElement id="price" />
 *   <FromElement id="tax" />
 *   <Constant value={5} />
 * </Add>
 */

import AddConstructor from "@adaptiveSrc/constructors/operators/Add/index.ts"
import type { Operand, AddOperator, NumericDatatype, StringDatatype, TemporalDatatype } from "@adaptiveTypes/index.ts"

export type Props = {
	type?: NumericDatatype | StringDatatype | TemporalDatatype
	datatype?: NumericDatatype | StringDatatype | TemporalDatatype
	children?: JSX.Element | JSX.Element[]
}

export default function Add({ type = "Number", datatype, children = [] }: Props): AddOperator {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]
	return AddConstructor(actualType)(childArray as unknown as Operand[])
}
