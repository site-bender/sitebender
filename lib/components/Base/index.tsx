import type { ElementAttributeMap } from "../../types/JSX/attributes/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import formatTemplate from "./formatTemplate/index.ts"
import processChildren from "./processChildren/index.ts"

export interface BaseProps<T extends keyof ElementAttributeMap = "span"> {
	format?: string
	props: Record<string, unknown>
	element?: T
	children?: unknown[]
}

export default function Base<T extends keyof ElementAttributeMap = "span">({
	format,
	props,
	element = "span" as T,
	children,
	...elementAttributes
}: BaseProps<T> & ElementAttributeMap[T]) {
	// Process children to extract nested schema properties
	const childProperties = processChildren(children)

	// Merge props with child properties (children take precedence for conflicts)
	const allProps = { ...props, ...childProperties }

	// DEBUG: Log what we're working with
	console.log("DEBUG - Original props:", props)
	console.log("DEBUG - Child properties:", childProperties)
	console.log("DEBUG - All props:", allProps)
	console.log("DEBUG - Format:", format)

	const Element = element

	// If format is provided, use the existing formatTemplate system
	if (format) {
		const formattedContent = formatTemplate(format, { props: allProps })

		console.log("DEBUG - Formatted content:", formattedContent)

		return (
			<Element {...elementAttributes}>
				{formattedContent}
			</Element>
		)
	}

	// Default behavior - just show the props as JSON for debugging
	return (
		<Element {...elementAttributes}>
			<pre>{JSON.stringify(allProps, null, 2)}</pre>
		</Element>
	)
}
