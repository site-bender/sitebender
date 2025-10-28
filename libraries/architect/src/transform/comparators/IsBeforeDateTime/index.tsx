import type {
	IsBeforeDateTimeComparator,
	Operand,
} from "../../../../../architect/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import IsBeforeDateTimeConstructor from "../../../../../architect/src/constructors/comparators/dateTime/IsBeforeDateTime/index.ts"

export type Props = {
	type?: "DateTime"
	datatype?: "DateTime"
	children?: JSX.Element | JSX.Element[]
}

export default function IsBeforeDateTime({
	type = "DateTime",
	datatype,
	children = [],
}: Props): IsBeforeDateTimeComparator {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]
	// IsBeforeDateTime: (datatype) => (operand) => (test)
	return IsBeforeDateTimeConstructor(actualType)(
		operand as unknown as Operand,
	)(test as unknown as Operand) as unknown as IsBeforeDateTimeComparator
}
