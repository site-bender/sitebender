/**
 * IsLessThan - Less than comparison for adaptive conditionals
 */

import IsLessThanConstructor from "../../../../adaptive/constructors/comparators/amount/IsLessThan/index.ts"

export type IsLessThanProps = {
	children?: JSX.Element | Array<JSX.Element> | string
}

export default function IsLessThan({
	children = [],
}: IsLessThanProps): ReturnType<typeof IsLessThanConstructor> {
	const childArray = Array.isArray(children) ? children : [children]

	// Extract Value and Threshold from semantic wrapper children
	let value: any = null
	let threshold: any = null

	childArray.forEach((child: any) => {
		if (child?.type?.name === "Value") {
			value = child.props.children
		} else if (child?.type?.name === "Threshold") {
			threshold = child.props.children
		}
	})

	// If no semantic wrappers, assume first is value, second is threshold
	if (!value && !threshold && childArray.length >= 2) {
		value = childArray[0]
		threshold = childArray[1]
	}

	return IsLessThanConstructor(value)(threshold)
}
