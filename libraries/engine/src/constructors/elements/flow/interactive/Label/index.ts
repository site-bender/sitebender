import type { LabelAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import isDefined from "@engineSrc/utilities/isDefined/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
} from "@engineTypes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type { Value } from "@engineTypes/index.ts"
import TextNode from "@engineSrc/constructors/elements/TextNode/index.ts"
import { ADVANCED_FILTERS } from "@engineSrc/guards/createAdvancedFilters/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import filterAttributes from "./filterAttributes/index.ts"

/**
 * Filters attributes for Label element
 * Allows global attributes and validates label-specific attributes
 */

/**
 * Extended Label attributes including reactive properties
 */
export type LabelElementAttributes = LabelAttributes & {
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
 * Creates a Label element configuration object
 *
 * The label element represents a caption for a form control.
 * It can contain phrasing content and text, but not interactive elements or nested labels.
 *
 * @example
 * ```typescript
 * const label = Label({
 *   id: "name-label",
 *   for: "name-input"
 * })([
 *   TextNode("Full Name:")
 * ])
 * ```
 */
const Label = (attributes: LabelElementAttributes = {}) =>
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
		? children.filter(ADVANCED_FILTERS.labelContent)
		: ADVANCED_FILTERS.labelContent(children)
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
		tag: "Label",
	}
}

export default Label
