import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "../../../../../types/index.ts"
import type { ListAriaAttributes } from "../../../types/aria/index.ts"
import type { UnorderedListAttributes } from "../../../types/attributes/index.ts"
import type { ElementConfig } from "../../../types/index.ts"

import isDefined from "../../../../../../utilities/isDefined/index.ts"
import TextNode from "../../../../../constructors/elements/TextNode/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"
import { UL_ROLES } from "../../../constants/aria-roles.ts"

/**
 * Extended Ul attributes including reactive properties and ARIA
 */
export type UlElementAttributes =
	& UnorderedListAttributes
	& ListAriaAttributes
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
 * Filters attributes for Ul element
 * Allows global attributes and validates list-specific attributes
 */
export const filterAttributes = (attributes: UlElementAttributes) => {
	const {
		id,
		// ARIA attributes
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby,
		"aria-describedby": ariaDescribedby,
		"aria-hidden": ariaHidden,
		"aria-orientation": ariaOrientation,
		role,
		// Reactive properties (to be excluded from HTML attributes)
		calculation: _calculation,
		dataset: _dataset,
		display: _display,
		format: _format,
		scripts: _scripts,
		stylesheets: _stylesheets,
		validation: _validation,
		...otherAttributes
	} = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	// Build the filtered attributes object step by step to avoid union type complexity
	const filteredAttrs: Record<string, unknown> = {}

	// Add ID if present
	Object.assign(filteredAttrs, getId(id))

	// Add global attributes
	Object.assign(filteredAttrs, globals)

	// Add ARIA attributes
	if (isDefined(ariaLabel)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-label")(ariaLabel),
		)
	}
	if (isDefined(ariaLabelledby)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-labelledby")(ariaLabelledby),
		)
	}
	if (isDefined(ariaDescribedby)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-describedby")(ariaDescribedby),
		)
	}
	if (isDefined(ariaHidden)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-hidden")(ariaHidden),
		)
	}
	if (isDefined(ariaOrientation)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-orientation")(ariaOrientation),
		)
	}
	if (isDefined(role)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(UL_ROLES))("role")(role),
		)
	}

	return filteredAttrs
}

/**
 * Creates a Ul element configuration object
 *
 * The ul element represents an unordered list of items.
 * It can only contain li, script, and template elements.
 *
 * @example
 * ```typescript
 * const ul = Ul({
 *   id: "main-list",
 *   class: "list"
 * })([
 *   Li()("First item"),
 *   Li()("Second item"),
 *   Li()("Third item")
 * ])
 * ```
 */
export const Ul = (attributes: UlElementAttributes = {}) =>
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

	// Filter children to only allow Li, Script, and Template elements
	const kids = isString(children)
		? [TextNode(children)] // Convert string to TextNode
		: Array.isArray(children)
		? children.filter((child) => {
			if (!child || typeof child !== "object" || !("tag" in child)) {
				return false // Reject text nodes in lists
			}
			return ["Li", "Script", "Template"].includes(child.tag)
		})
		: (children && typeof children === "object" && "tag" in children &&
				["Li", "Script", "Template"].includes(children.tag))
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
		tag: "Ul",
	}
}

export default Ul
