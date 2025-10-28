import type {
	IsNotBeforeDateComparator,
	Operand,
} from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import IsNotBeforeDateConstructor from "../../../../../artificer/src/constructors/comparators/date/IsNotBeforeDate/index.ts"

export type Props = {
	type?: "Date"
	datatype?: "Date"
	children?: JSX.Element | JSX.Element[]
}

export default function IsNotBeforeDate({
	type = "Date",
	datatype,
	children = [],
}: Props): IsNotBeforeDateComparator {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]
	return IsNotBeforeDateConstructor(actualType)(
		operand as unknown as Operand,
	)(test as unknown as Operand) as unknown as IsNotBeforeDateComparator
}
