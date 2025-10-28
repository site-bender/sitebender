import type {
	InSetComparator,
	Operand,
} from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import InSetConstructor from "../../../../../artificer/src/constructors/comparators/set/InSet/index.ts"

export type Props = {
	children?: JSX.Element | Array<JSX.Element>
}

export default function InSet({ children = [] }: Props): InSetComparator {
	const arr = Array.isArray(children) ? children : [children]

	let value: unknown = null
	let set: unknown = null

	arr.forEach((child) => {
		if (child && typeof child === "object") {
			const typeName = (child as { type?: { name?: string } }).type?.name
			if (typeName === "Value") {
				value = (child as { props?: { children?: unknown } }).props
					?.children
			}
			if (typeName === "Set") {
				set = (child as { props?: { children?: unknown } }).props
					?.children
			}
		}
	})

	if (value === null && set === null && arr.length >= 2) {
		value = arr[0]
		set = arr[1]
	}

	return InSetConstructor(value as Operand)(
		set as Operand,
	) as unknown as InSetComparator
}
