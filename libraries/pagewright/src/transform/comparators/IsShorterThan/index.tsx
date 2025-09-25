import type {
	IsShorterThanComparator,
	Operand,
} from "../../../../../architect/types/index.ts"

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

import IsShorterThanConstructor from "../../../../../architect/src/constructors/comparators/length/IsShorterThan/index.ts"

export type Props = {
	type?: "String" | "Array"
	datatype?: "String" | "Array"
	children?: JSX.Element | JSX.Element[]
}

export default function IsShorterThan({
	type: _type = "String",
	datatype: _datatype,
	children = [],
}: Props): IsShorterThanComparator {
	const actualType = "Number" as const
	const [operand, test] = Array.isArray(children) ? children : [children]

	// IsShorterThan: (datatype) => (operand) => (test)
	return IsShorterThanConstructor(actualType)(operand as unknown as Operand)(
		test as unknown as Operand,
	) as unknown as IsShorterThanComparator
}
