/**
 * Matches - String pattern matching component for adaptive validation
 */

import MatchesConstructor from "../../../../../adaptive/src/constructors/comparators/matching/Matches/index.ts"

export type MatchesProps = {
	children?: JSX.Element | Array<JSX.Element> | string
}

export default function Matches({
	children = [],
}: MatchesProps): ReturnType<ReturnType<ReturnType<typeof MatchesConstructor>>> {
	const childArray = Array.isArray(children) ? children : [children]

	// Extract Value and Pattern from semantic wrapper children
	let value: any = null
	let pattern: any = null

	childArray.forEach((child: any) => {
		if (child?.type?.name === "Value") {
			value = child.props.children
		} else if (child?.type?.name === "Pattern") {
			pattern = child.props.children
		}
	})

	// If no semantic wrappers, assume first is value, second is pattern, third optional flags
	if (!value && !pattern && childArray.length >= 2) {
		value = childArray[0]
		pattern = childArray[1]
	}

	const flags = childArray.length >= 3 ? childArray[2] : ""
	return MatchesConstructor(value)(pattern)(flags as unknown as JSX.Element)
}
