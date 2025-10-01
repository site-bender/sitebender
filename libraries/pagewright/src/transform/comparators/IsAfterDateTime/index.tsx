import type {
	IsAfterDateTimeComparator,
	Operand,
} from "../../../../../architect/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import IsAfterDateTimeConstructor from "../../../../../architect/src/constructors/comparators/dateTime/IsAfterDateTime/index.ts"

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
