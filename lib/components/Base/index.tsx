import type { ElementAttributeMap } from "../../types/JSX/attributes/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import formatTemplate from "./formatTemplate/index.ts"
import processComponentProps from "./processComponentProps/index.ts"

export interface BaseProps<T extends keyof ElementAttributeMap = "span"> {
	format?: string
	props: Record<string, unknown>
	element?: T
	children?: never
}

export default function Base<T extends keyof ElementAttributeMap = "span">({
	format,
	props,
	element = "span" as T,
	...elementAttributes
}: BaseProps<T> & ElementAttributeMap[T]) {
	const processedProps = processComponentProps(props)
	const Element = element

	const formatContext = {
		props: processedProps,
		formatters: {},
	}

	const content = formatTemplate(format, formatContext) ||
		(processedProps.name || processedProps.title) ||
		""

	return createElement(Element, elementAttributes, content)
}
