import type { ComparatorConfig, LogicalConfig } from "@adaptiveTypes/index.ts"

/**
 * And JSX Component
 *
 * Wrapper for the And logical operator constructor.
 * All children conditions must be true for the And to be true.
 *
 * @example
 * <And>
 *   <IsMoreThan>
 *     <Value><FromElement id="price" /></Value>
 *     <Threshold><Constant value={0} /></Threshold>
 *   </IsMoreThan>
 *   <IsLessThan>
 *     <Value><FromElement id="price" /></Value>
 *     <Threshold><Constant value={1000} /></Threshold>
 *   </IsLessThan>
 * </And>
 */

import AndConstructor from "@adaptiveSrc/constructors/comparators/algebraic/And/index.ts"

export type AndProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function And({
	children = [],
}: AndProps): LogicalConfig {
	const childArray = Array.isArray(children) ? children : [children]

	// And constructor signature: (datatype) => (operands)
	return AndConstructor("Boolean")(
		childArray as unknown as Array<
			ComparatorConfig | LogicalConfig
		>,
	)
}
