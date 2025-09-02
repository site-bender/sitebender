import type { NoAriaAttributes } from "@adaptiveSrc/constructors/elements/types/aria/index.ts"
import type { ElementConfig } from "@adaptiveSrc/constructors/elements/types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@adaptiveTypes/index.ts"

import TextNode from "@adaptiveSrc/constructors/elements/TextNode/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"
import isDefined from "@adaptiveSrc/utilities/isDefined.ts"

/**
 * Extended Fragment attributes including reactive properties and ARIA
 * Fragment is special - it doesn't render as an HTML element but can carry reactive properties
 */
export type FragmentElementAttributes = NoAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Creates a Fragment element configuration object
 *
 * The Fragment element allows grouping of children without creating a wrapper element.
 * It can optionally include scripts and stylesheets.
 * Fragment is special - it doesn't render as an HTML element but serves as a container.
 *
 * @example
 * ```typescript
 * const fragment = Fragment({
 *   scripts: ["script1.ts"],
 *   stylesheets: ["style1.css"]
 * })([
 *   H1()("Title"),
 *   P()("Content")
 * ])
 * ```
 */
export const Fragment = (attributes: FragmentElementAttributes = {}) =>
(
	children: Array<ElementConfig> | ElementConfig | string = [],
): ElementConfig => {
	const {
		calculation,
		dataset,
		display,
		format,
		scripts,
		stylesheets,
		validation,
		// Fragment doesn't have real HTML attributes - it's just a container
		"aria-hidden": _ariaHidden, // Fragment can't be hidden since it doesn't render
	} = attributes

	// Convert string children to TextNode
	const kids = isString(children)
		? [TextNode(children)]
		: Array.isArray(children)
		? children
		: [children]

	return {
		attributes: {}, // Fragment has no HTML attributes since it doesn't render
		children: kids,
		...(isDefined(calculation) ? { calculation } : {}),
		...(isDefined(dataset) ? { dataset } : {}),
		...(isDefined(display) ? { display } : {}),
		...(isDefined(format) ? { format } : {}),
		...(isDefined(scripts) ? { scripts } : {}),
		...(isDefined(stylesheets) ? { stylesheets } : {}),
		...(isDefined(validation) ? { validation } : {}),
		tag: "Fragment",
	}
}

export default Fragment
