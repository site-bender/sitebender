import type { IsBeforeTimeComparator, Operand } from "@sitebender/engine-types/index.ts"

/**
 * IsBeforeTime JSX Component
 */
import IsBeforeTimeConstructor from "@sitebender/engine/constructors/comparators/time/IsBeforeTime/index.ts"

export type Props = {
	type?: "Time"
	datatype?: "Time"
	children?: JSX.Element | JSX.Element[]
}

export default function IsBeforeTime({
	type = "Time",
	datatype,
	children = [],
}: Props): IsBeforeTimeComparator {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]
	// IsBeforeTime: (datatype) => (operand) => (test)
	return IsBeforeTimeConstructor(actualType)(
		operand as unknown as Operand,
	)(test as unknown as Operand) as unknown as IsBeforeTimeComparator
}
