import type {
	IsAfterDateTimeComparator,
	Operand,
} from "@engineTypes/index.ts"

/**
 * IsAfterDateTime JSX Component
 */
import IsAfterDateTimeConstructor from "@engineSrc/constructors/comparators/dateTime/IsAfterDateTime/index.ts"

export type Props = {
	type?: "DateTime"
	datatype?: "DateTime"
	children?: JSX.Element | JSX.Element[]
}

export default function IsAfterDateTime({
	type = "DateTime",
	datatype,
	children = [],
}: Props): IsAfterDateTimeComparator {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]
	// IsAfterDateTime: (datatype) => (operand) => (test)
	return IsAfterDateTimeConstructor(actualType)(
		operand as unknown as Operand,
	)(test as unknown as Operand) as unknown as IsAfterDateTimeComparator
}
