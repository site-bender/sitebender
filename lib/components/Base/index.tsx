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
	// COMPLETELY FLATTEN children no matter how deeply nested
	const flatChildren = Array.isArray(children)
		? children.flat(Infinity)
		: children

	console.log(`DEBUG Base - FLATTENED:`, {
		original: children,
		flattened: flatChildren,
		originalLength: Array.isArray(children) ? children.length : "not array",
		flattenedLength: Array.isArray(flatChildren)
			? flatChildren.length
			: "not array",
	})

	// Process the flattened children
	const childProperties = processChildren(
		Array.isArray(flatChildren) ? flatChildren : [flatChildren],
	)

	console.log(`DEBUG Base - processChildren extracted:`, childProperties)

	// Merge props with child properties (children take precedence for conflicts)
	const allProps = { ...props, ...childProperties }

	const Element = element

	// If format is provided, use the existing formatTemplate system
	if (format) {
		const formattedContent = formatTemplate(format, { props: allProps })

		console.log(`DEBUG Base - formatted content:`, formattedContent)

		return (
			<Element {...elementAttributes}>
				{formattedContent}
			</Element>
		)
	}

	// Default behavior - render flattened children
	return (
		<Element {...elementAttributes}>
			{flatChildren}
		</Element>
	)
}
