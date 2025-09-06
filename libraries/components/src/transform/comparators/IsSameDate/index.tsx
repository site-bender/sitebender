import type {
	IsSameDateComparator,
	Operand,
} from "@sitebender/engine-types/index.ts"

/**
 * IsSameDate JSX Component
 */
import IsSameDateConstructor from "@sitebender/engine/constructors/comparators/date/IsSameDate/index.ts"

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
