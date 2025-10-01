import type {
	IsSameDateTimeComparator,
	Operand,
} from "../../../../../architect/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import IsSameDateTimeConstructor from "../../../../../architect/src/constructors/comparators/dateTime/IsSameDateTime/index.ts"

export type Props = {
	type?: "DateTime"
	datatype?: "DateTime"
	children?: JSX.Element | JSX.Element[]
}

export default function IsSameDateTime({
	type = "DateTime",
	datatype,
	children = [],
}: Props): IsSameDateTimeComparator {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]
	// IsSameDateTime: (datatype) => (operand) => (test)
	return IsSameDateTimeConstructor(actualType)(
		operand as unknown as Operand,
	)(test as unknown as Operand) as unknown as IsSameDateTimeComparator
}
