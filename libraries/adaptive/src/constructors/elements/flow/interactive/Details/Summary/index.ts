import type { SummaryAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@adaptiveSrc/constructors/elements/types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@adaptiveTypes/index.ts"

import { SUMMARY_ROLES } from "@adaptiveSrc/constructors/elements/constants/aria-roles.ts"
import TextNode from "@adaptiveSrc/constructors/elements/TextNode/index.ts"
import getId from "@adaptiveSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@adaptiveSrc/guards/filterAttribute/index.ts"
import isHeadingContent from "@adaptiveSrc/guards/isHeadingContent/index.ts"
import isMemberOf from "@adaptiveSrc/guards/isMemberOf/index.ts"
import isPhrasingContent from "@adaptiveSrc/guards/isPhrasingContent/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@adaptiveSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@adaptiveSrc/utilities/isDefined.ts"

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

export const filterAttributes = (attributes: SummaryAttributes) => {
	const { id, role, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isMemberOf(SUMMARY_ROLES))("role")(role),
	}
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
