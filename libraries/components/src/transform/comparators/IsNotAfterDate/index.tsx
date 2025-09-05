import type {
	IsNotAfterDateComparator,
	Operand,
} from "@sitebender/engine-types/index.ts"

/**
 * IsNotAfterDate JSX Component
 */
import IsNotAfterDateConstructor from "@sitebender/engine/constructors/comparators/date/IsNotAfterDate/index.ts"

export type Props = {
	type?: "Date"
	datatype?: "Date"
	children?: JSX.Element | JSX.Element[]
}

export default function IsNotAfterDate({
	type = "Date",
	datatype,
	children = [],
}: Props): IsNotAfterDateComparator {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]
	return IsNotAfterDateConstructor(actualType)(
		operand as unknown as Operand,
	)(test as unknown as Operand) as unknown as IsNotAfterDateComparator
}
