import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/architect-types/index.ts"
import type { SectionAriaAttributes } from "@sitebender/architect/constructors/elements/types/aria/index.ts"
import type { SectionAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/architect/constructors/elements/types/index.ts"

import TextNode from "@sitebender/architect/constructors/elements/TextNode/index.ts"
import isFlowContent from "@sitebender/architect/guards/isFlowContent/index.ts"
import isString from "@sitebender/architect/guards/isString/index.ts"
import isDefined from "@sitebender/architect/utilities/isDefined/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Extended Section attributes including reactive properties and ARIA
 */
export type SectionElementAttributes =
	& SectionAttributes
	& SectionAriaAttributes
	& {
		calculation?: Operand
		dataset?: Record<string, Value>
		display?: ComparatorConfig | LogicalConfig
		format?: OperatorConfig
		scripts?: string[]
		stylesheets?: string[]
		validation?: ComparatorConfig | LogicalConfig
	}

/**
 * Filters attributes for Section element
 * Allows global attributes and validates section-specific attributes
 */

/**
 * Creates a Section element configuration object
 *
 * The section element represents a generic section of a document or application.
 * A section, in this context, is a thematic grouping of content, typically with a heading.
 *
 * @example
 * ```typescript
 * const section = Section({
 *   id: "intro",
 *   class: "intro-section",
 *   role: "region",
 *   "aria-labelledby": "intro-heading"
 * })([
 *   H2({ id: "intro-heading" })("Introduction"),
 *   P()("This is the introduction section...")
 * ])
 * ```
 */
const Section = (attributes: SectionElementAttributes = {}) =>
(
	children: Array<ElementConfig> | ElementConfig | string = [],
): ElementConfig => {
	const { id, ...attribs } = filterAttributes(attributes)
	const {
		calculation,
		dataset,
		display,
		format,
		scripts,
		stylesheets,
		validation,
	} = attributes

	// Convert string children to TextNode and filter children
	const kids = isString(children)
		? [TextNode(children)]
		: Array.isArray(children)
		? children.filter((child) => {
			if (typeof child === "object" && child !== null && "tag" in child) {
				return isFlowContent()(child as ElementConfig)
			}
			return true
		})
		: (typeof children === "object" && children !== null &&
				"tag" in children && isFlowContent()(children as ElementConfig))
		? [children]
		: []

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
		tag: "Section",
	}
}

export default Section
