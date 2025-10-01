import type {
	IsNotBeforeDateTimeComparator,
	Operand,
} from "../../../../../architect/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import IsNotBeforeDateTimeConstructor from "../../../../../architect/src/constructors/comparators/dateTime/IsNotBeforeDateTime/index.ts"

export type Props = {
	type?: "DateTime"
	datatype?: "DateTime"
	children?: JSX.Element | JSX.Element[]
}

export default function IsNotBeforeDateTime({
	type = "DateTime",
	datatype,
	children = [],
}: Props): IsNotBeforeDateTimeComparator {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]
	// IsNotBeforeDateTime: (datatype) => (operand) => (test)
	return IsNotBeforeDateTimeConstructor(actualType)(
		operand as unknown as Operand,
	)(test as unknown as Operand) as unknown as IsNotBeforeDateTimeComparator
}
