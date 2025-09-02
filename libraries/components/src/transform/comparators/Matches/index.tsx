import type { MatchesComparator, Operand } from "@engineTypes/index.ts"

/**
 * Matches - String pattern matching component for engine validation
 */

import MatchesConstructor from "@engineSrc/constructors/comparators/matching/Matches/index.ts"

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
}

export default function Matches({
	children = [],
}: Props): MatchesComparator {
	const childArray = Array.isArray(children) ? children : [children]

	// Extract Value and Pattern from semantic wrapper children
	let value: unknown = null
	let pattern: unknown = null

	childArray.forEach((child) => {
		if (typeof child === "object" && child !== null) {
			const typeName = (child as { type?: { name?: string } }).type?.name
			if (typeName === "Value") {
				value = (child as { props?: { children?: unknown } }).props?.children
			} else if (typeName === "Pattern") {
				pattern = (child as { props?: { children?: unknown } }).props?.children
			}
		}
	})

	// If no semantic wrappers, assume first is value, second is pattern
	if (value === null && pattern === null && childArray.length >= 2) {
		value = childArray[0]
		pattern = childArray[1]
	}

	const flagsCandidate = childArray.length >= 3 ? childArray[2] : undefined
	const flags = typeof flagsCandidate === "string" ? flagsCandidate : undefined

	return MatchesConstructor(value as Operand)(pattern as Operand)(flags)
}
