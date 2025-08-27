/**
 * IsShorterThan JSX Component
 *
 * Wrapper for the IsShorterThan comparator constructor.
 * Checks if a string or array is shorter than a threshold.
 * Requires <Value> and <Threshold> wrapper components.
 *
 * @example
 * <IsShorterThan>
 *   <Value><FromElement id="username" type="String" /></Value>
 *   <Threshold><Constant value={20} /></Threshold>
 * </IsShorterThan>
 */

import IsShorterThanConstructor from "../../../../../adaptive/src/constructors/comparators/length/IsShorterThan/index.ts"

export type IsShorterThanProps = {
	type?: "String" | "Array"
	datatype?: "String" | "Array"
	children?: JSX.Element | JSX.Element[]
}

export default function IsShorterThan({
	type = "String",
	datatype,
	children = [],
}: IsShorterThanProps): ReturnType<ReturnType<typeof IsShorterThanConstructor>> {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	// The parser will extract Value and Threshold from children
	// IsShorterThan constructor signature: (datatype) => (operand) => (test)
	return IsShorterThanConstructor(actualType)(null as any)
}
