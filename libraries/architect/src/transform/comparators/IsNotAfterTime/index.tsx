import type {
	IsNotAfterTimeComparator,
	Operand,
} from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import IsNotAfterTimeConstructor from "../../../../../artificer/src/constructors/comparators/time/IsNotAfterTime/index.ts"

export type Props = {
	type?: "Time"
	datatype?: "Time"
	children?: JSX.Element | JSX.Element[]
}

export default function IsNotAfterTime({
	type = "Time",
	datatype,
	children = [],
}: Props): IsNotAfterTimeComparator {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]
	// IsNotAfterTime: (datatype) => (operand) => (test)
	return IsNotAfterTimeConstructor(actualType)(
		operand as unknown as Operand,
	)(test as unknown as Operand) as unknown as IsNotAfterTimeComparator
}
