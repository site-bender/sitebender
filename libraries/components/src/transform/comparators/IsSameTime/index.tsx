import type { IsSameTimeComparator, Operand } from "@engineTypes/index.ts"

/**
 * IsSameTime JSX Component
 */
import IsSameTimeConstructor from "@engineSrc/constructors/comparators/time/IsSameTime/index.ts"

export type Props = {
	type?: "Time"
	datatype?: "Time"
	children?: JSX.Element | JSX.Element[]
}

export default function IsSameTime({
	type = "Time",
	datatype,
	children = [],
}: Props): IsSameTimeComparator {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]
	// IsSameTime: (datatype) => (operand) => (test)
	return IsSameTimeConstructor(actualType)(
		operand as unknown as Operand,
	)(test as unknown as Operand) as unknown as IsSameTimeComparator
}
