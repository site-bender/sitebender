import type {
	IsSameDateComparator,
	Operand,
} from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import IsSameDateConstructor from "../../../../../artificer/src/constructors/comparators/date/IsSameDate/index.ts"

export type Props = {
	type?: "Date"
	datatype?: "Date"
	children?: JSX.Element | JSX.Element[]
}

export default function IsSameDate({
	type = "Date",
	datatype,
	children = [],
}: Props): IsSameDateComparator {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]
	// IsSameDate: (datatype) => (operand) => (test)
	return IsSameDateConstructor(actualType)(
		operand as unknown as Operand,
	)(test as unknown as Operand) as unknown as IsSameDateComparator
}
