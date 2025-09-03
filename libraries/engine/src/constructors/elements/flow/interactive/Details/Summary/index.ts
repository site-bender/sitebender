import type { SummaryAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import filterAttributes from "./filterAttributes/index.ts"
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"

import { SUMMARY_ROLES } from "@engineSrc/constructors/elements/constants/aria-roles.ts"
import TextNode from "@engineSrc/constructors/elements/TextNode/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isHeadingContent from "@engineSrc/guards/isHeadingContent/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isPhrasingContent from "@engineSrc/guards/isPhrasingContent/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@engineSrc/utilities/isDefined.ts"

/**
 * Extended Summary attributes including reactive properties
 */
export type SummaryElementAttributes = SummaryAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}



/**
 * Creates a Summary element configuration object
 *
 * The summary element represents a summary, caption, or legend for the
 * rest of the contents of the details element.
 *
 * @example
 * ```typescript
 * const summary = Summary({
 *   id: "details-summary",
 *   role: "button"
 * })([
 *   TextNode("Click to expand"),
 *   Strong()(TextNode(" (Important)"))
 * ])
 * ```
 */
export const Summary = (attributes: SummaryElementAttributes = {}) =>
(
	children: Array<ElementConfig> | ElementConfig | string = [],
): ElementConfig => {
	const {
		aria: _aria,
		calculation,
		dataset,
		display,
		format,
		scripts,
		stylesheets,
		validation,
		...attrs
	} = attributes
	const { id, ...attribs } = filterAttributes(attrs)

	// Convert string children to TextNode and filter children
	const kids = isString(children)
		? [TextNode(children)]
		: Array.isArray(children)
		? children.filter((child: ElementConfig) =>
			isPhrasingContent()(child) || isHeadingContent(child)
		)
		: [children].filter((child: ElementConfig) =>
			isPhrasingContent()(child) || isHeadingContent(child)
		)

	return {
		attributes: {
			id,
			...attribs,
		},
		children: kids,
		...(isDefined(calculation) ? { calculation } : {}),
		...(isDefined(dataset) ? { dataset } : {}),
		...(isDefined(display) ? { display } : {}),
		...(isDefined(format) ? { format } : {}),
		...(isDefined(scripts) ? { scripts } : {}),
		...(isDefined(stylesheets) ? { stylesheets } : {}),
		...(isDefined(validation) ? { validation } : {}),
		tag: "Summary",
	}
}

export default Summary

export { default as filterAttributes } from "./filterAttributes/index.ts"
