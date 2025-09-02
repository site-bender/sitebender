import type { ListItemAriaAttributes } from "@adaptiveSrc/constructors/elements/types/aria/index.ts"
import type { ListItemAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@adaptiveSrc/constructors/elements/types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@adaptiveTypes/index.ts"

import { LI_ROLES } from "@adaptiveSrc/constructors/elements/constants/aria-roles.ts"
import TextNode from "@adaptiveSrc/constructors/elements/TextNode/index.ts"
import getId from "@adaptiveSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@adaptiveSrc/guards/filterAttribute/index.ts"
import isBoolean from "@adaptiveSrc/guards/isBoolean/index.ts"
import isInteger from "@adaptiveSrc/guards/isInteger/index.ts"
import isMemberOf from "@adaptiveSrc/guards/isMemberOf/index.ts"
import isNumber from "@adaptiveSrc/guards/isNumber/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@adaptiveSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

/**
 * Extended Li attributes including reactive properties and ARIA
 */
export type LiElementAttributes =
	& ListItemAttributes
	& ListItemAriaAttributes
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
 * Filters attributes for Li element
 * Allows global attributes and validates li-specific attributes
 */
export const filterAttributes = (attributes: LiElementAttributes) => {
	const {
		id,
		value,
		// ARIA attributes
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby,
		"aria-describedby": ariaDescribedby,
		"aria-hidden": ariaHidden,
		"aria-posinset": ariaPosinset,
		"aria-setsize": ariaSetsize,
		"aria-selected": ariaSelected,
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

	// Add li-specific attributes
	if (isDefined(value)) {
		Object.assign(filteredAttrs, filterAttribute(isInteger)("value")(value))
	}

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
	if (isDefined(ariaPosinset)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isNumber)("aria-posinset")(ariaPosinset),
		)
	}
	if (isDefined(ariaSetsize)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isNumber)("aria-setsize")(ariaSetsize),
		)
	}
	if (isDefined(ariaSelected)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-selected")(ariaSelected),
		)
	}
	if (isDefined(role)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(LI_ROLES))("role")(role),
		)
	}

	return filteredAttrs
}

/**
 * Creates a Li element configuration object
 *
 * The li element represents a list item in ordered or unordered lists.
 * It can contain flow content.
 *
 * @example
 * ```typescript
 * const li = Li({
 *   id: "item-1",
 *   value: 3
 * })([
 *   P()("List item content"),
 *   Ul()([...])
 * ])
 * ```
 */
export const Li = (attributes: LiElementAttributes = {}) =>
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

	// Convert string children to TextNode - Li can contain any flow content
	const kids = isString(children)
		? [TextNode(children)]
		: Array.isArray(children)
		? children // Li accepts all flow content
		: [children]

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
		tag: "Li",
	}
}

export default Li
