import type {
	IsAfterTimeComparator,
	Operand,
} from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import IsAfterTimeConstructor from "../../../../../artificer/src/constructors/comparators/time/IsAfterTime/index.ts"

export type Props = {
	type?: "Time"
	datatype?: "Time"
	children?: JSX.Element | JSX.Element[]
}

export default function IsAfterTime({
	type = "Time",
	datatype,
	children = [],
}: Props): IsAfterTimeComparator {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]
	// IsAfterTime: (datatype) => (operand) => (test)
	return IsAfterTimeConstructor(actualType)(
		operand as unknown as Operand,
	)(test as unknown as Operand) as unknown as IsAfterTimeComparator
}
