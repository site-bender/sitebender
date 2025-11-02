import type {
	IsNotAfterDateTimeComparator,
	Operand,
} from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import IsNotAfterDateTimeConstructor from "../../../../../artificer/src/constructors/comparators/dateTime/IsNotAfterDateTime/index.ts"

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
