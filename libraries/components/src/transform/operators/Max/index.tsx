/**
 * Max JSX Component
 *
 * Wrapper for the Max operator constructor.
 * Returns the maximum value from all operands.
 *
 * @example
 * <Max type="Number">
 *   <FromElement id="bid1" />
 *   <FromElement id="bid2" />
 *   <FromElement id="bid3" />
 * </Max>
 */

import MaxConstructor from "@adaptiveSrc/constructors/operators/Max/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

export type MaxProps = {
	type?: "Number" | "Date" | "String"
	datatype?: "Number" | "Date" | "String"
	children?: JSX.Element | JSX.Element[]
}

export default function Max({
	type = "Number",
	datatype,
	children = [],
}: MaxProps): ReturnType<typeof MaxConstructor> {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	// Max constructor signature: (datatype) => (operands)
	return MaxConstructor(actualType)(childArray as unknown as Operand[])
}
