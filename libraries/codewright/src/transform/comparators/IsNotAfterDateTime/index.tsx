import type {
	IsNotAfterDateTimeComparator,
	Operand,
} from "../../../../../architect/types/index.ts"

/**
 * IsNotAfterDateTime JSX Component
 */
import IsNotAfterDateTimeConstructor from "../../../../../architect/src/constructors/comparators/dateTime/IsNotAfterDateTime/index.ts"

export type Props = {
	type?: "DateTime"
	datatype?: "DateTime"
	children?: JSX.Element | JSX.Element[]
}

export default function IsNotAfterDateTime({
	type = "DateTime",
	datatype,
	children = [],
}: Props): IsNotAfterDateTimeComparator {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]
	// IsNotAfterDateTime: (datatype) => (operand) => (test)
	return IsNotAfterDateTimeConstructor(actualType)(
		operand as unknown as Operand,
	)(test as unknown as Operand) as unknown as IsNotAfterDateTimeComparator
}
