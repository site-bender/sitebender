import type {
	IsNotAfterTimeComparator,
	Operand,
} from "../../../../../architect/types/index.ts"

/**
 * IsNotAfterTime JSX Component
 */
import IsNotAfterTimeConstructor from "../../../../../architect/src/constructors/comparators/time/IsNotAfterTime/index.ts"

export type Props = {
	type?: "Time"
	datatype?: "Time"
	children?: JSX.Element | JSX.Element[]
}

export default function IsNotAfterTime({
	type = "Time",
	datatype,
	children = [],
}: Props): IsNotAfterTimeComparator {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]
	// IsNotAfterTime: (datatype) => (operand) => (test)
	return IsNotAfterTimeConstructor(actualType)(
		operand as unknown as Operand,
	)(test as unknown as Operand) as unknown as IsNotAfterTimeComparator
}
