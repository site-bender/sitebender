import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"
import type { FieldsetAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { FieldSetAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import filterAttributes from "./filterAttributes/index.ts"
import TextNode from "@engineSrc/constructors/elements/TextNode/index.ts"
import ADVANCED_FILTERS from "@engineSrc/guards/createAdvancedFilters/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import isDefined from "@engineSrc/utilities/isDefined/index.ts"

/**
 * Filters attributes for Fieldset element
 * Allows global attributes and validates fieldset-specific attributes
 */

/**
 * Extended Fieldset attributes including reactive properties and ARIA
 */
export type FieldsetElementAttributes =
	& FieldSetAttributes
	& FieldsetAriaAttributes
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
 * Filters attributes for Fieldset element
 * Allows global attributes and validates fieldset-specific attributes
 */


/**
 * Creates a Fieldset element configuration object
 *
 * The fieldset element represents a set of form controls optionally grouped under a common name.
 *
 * @example
 * ```typescript
 * const fieldset = Fieldset({
 *   name: "personal-info",
 *   disabled: false
 * })([
 *   Legend()([TextNode("Personal Information")]),
 *   Input({ type: "text", name: "firstName", placeholder: "First Name" }),
 *   Input({ type: "text", name: "lastName", placeholder: "Last Name" })
 * ])
 * ```
 */
const Fieldset = (attributes: FieldsetElementAttributes = {}) =>
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
		? children.filter(ADVANCED_FILTERS.formContent)
		: ADVANCED_FILTERS.formContent(children)
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
		tag: "Fieldset",
	}
}

export default Fieldset
