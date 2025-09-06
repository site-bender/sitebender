import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { SummaryAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/engine/constructors/elements/types/index.ts"

import TextNode from "@sitebender/engine/constructors/elements/TextNode/index.ts"
import isHeadingContent from "@sitebender/engine/guards/isHeadingContent/index.ts"
import isPhrasingContent from "@sitebender/engine/guards/isPhrasingContent/index.ts"
import isString from "@sitebender/engine/guards/isString/index.ts"
import isDefined from "@sitebender/engine/utilities/isDefined/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

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
const Summary = (attributes: SummaryElementAttributes = {}) =>
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
