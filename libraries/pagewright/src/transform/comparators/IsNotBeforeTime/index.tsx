import type {
	IsNotBeforeTimeComparator,
	Operand,
} from "../../../../../architect/types/index.ts"

/**
 * IsNotBeforeTime JSX Component
 */
import IsNotBeforeTimeConstructor from "../../../../../architect/src/constructors/comparators/time/IsNotBeforeTime/index.ts"

export type Props = {
	type?: "Time"
	datatype?: "Time"
	children?: JSX.Element | JSX.Element[]
}

export default function IsNotBeforeTime({
	type = "Time",
	datatype,
	children = [],
}: Props): IsNotBeforeTimeComparator {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]
	// IsNotBeforeTime: (datatype) => (operand) => (test)
	return IsNotBeforeTimeConstructor(actualType)(
		operand as unknown as Operand,
	)(test as unknown as Operand) as unknown as IsNotBeforeTimeComparator
}
