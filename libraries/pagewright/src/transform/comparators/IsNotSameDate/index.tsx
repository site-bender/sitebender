import type {
	IsNotSameDateComparator,
	Operand,
} from "../../../../../architect/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import IsNotSameDateConstructor from "../../../../../architect/src/constructors/comparators/date/IsNotSameDate/index.ts"

export type Props = {
	type?: "Date"
	datatype?: "Date"
	children?: JSX.Element | JSX.Element[]
}

export default function IsNotSameDate({
	type = "Date",
	datatype,
	children = [],
}: Props): IsNotSameDateComparator {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]
	return IsNotSameDateConstructor(actualType)(
		operand as unknown as Operand,
	)(test as unknown as Operand) as unknown as IsNotSameDateComparator
}
