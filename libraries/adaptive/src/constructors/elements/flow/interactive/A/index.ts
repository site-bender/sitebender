import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@adaptiveTypes/index.ts"
import type { AnchorAriaAttributes } from "@adaptiveSrc/constructors/elements/types/aria/index.ts"
import type { AnchorAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@adaptiveSrc/constructors/elements/types/index.ts"

import isDefined from "@toolkit/simple/validation/isDefined/index.ts"
import { LINK_WITH_HREF_ROLES } from "@adaptiveSrc/constructors/elements/constants/aria-roles.ts"
import {
	FORM_TARGETS,
	REFERRER_POLICIES,
	RELS_FOR_AREA,
} from "@adaptiveSrc/constructors/elements/constants/index.ts"
import TextNode from "@adaptiveSrc/constructors/elements/TextNode/index.ts"
import getId from "@adaptiveSrc/constructors/helpers/getId/index.ts"
import { ADVANCED_FILTERS } from "@adaptiveSrc/guards/createAdvancedFilters/index.ts"
import filterAttribute from "@adaptiveSrc/guards/filterAttribute/index.ts"
import isBoolean from "@adaptiveSrc/guards/isBoolean/index.ts"
import isMemberOf from "@adaptiveSrc/guards/isMemberOf/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@adaptiveSrc/guards/pickGlobalAttributes/index.ts"

/**
 * Extended Anchor attributes including reactive properties and ARIA
 */
export type AnchorElementAttributes =
	& AnchorAttributes
	& AnchorAriaAttributes
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
 * Filters attributes for A element
 * Allows global attributes and validates anchor-specific attributes
 */
export const filterAttributes = (attributes: AnchorElementAttributes) => {
	const {
		id,
		download,
		href,
		hrefLang,
		ping,
		referrerPolicy,
		rel,
		target,
		type,
		// ARIA attributes
		role,
		"aria-current": ariaCurrent,
		"aria-expanded": ariaExpanded,
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby,
		"aria-describedby": ariaDescribedby,
		"aria-disabled": ariaDisabled,
		"aria-hidden": ariaHidden,
		"aria-haspopup": ariaHaspopup,
		"aria-pressed": ariaPressed,
		"aria-selected": ariaSelected,
		"aria-controls": ariaControls,
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

	// Add anchor-specific attributes
	if (isDefined(download)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("download")(download),
		)
	}
	if (isDefined(href)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("href")(href))
	}
	if (isDefined(hrefLang)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("hrefLang")(hrefLang),
		)
	}
	if (isDefined(ping)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("ping")(ping))
	}
	if (isDefined(referrerPolicy)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(REFERRER_POLICIES))("referrerPolicy")(
				referrerPolicy,
			),
		)
	}
	if (isDefined(rel)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(RELS_FOR_AREA))("rel")(rel),
		)
	}
	if (isDefined(target)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(FORM_TARGETS))("target")(target),
		)
	}
	if (isDefined(type)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("type")(type))
	}

	// Add ARIA attributes
	// Note: This assumes href is present. For links without href, any role is allowed.
	if (isDefined(role)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(LINK_WITH_HREF_ROLES))("role")(role),
		)
	}
	if (isDefined(ariaCurrent)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-current")(ariaCurrent),
		)
	}
	if (isDefined(ariaExpanded)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-expanded")(ariaExpanded),
		)
	}
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
	if (isDefined(ariaDisabled)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-disabled")(ariaDisabled),
		)
	}
	if (isDefined(ariaHidden)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-hidden")(ariaHidden),
		)
	}
	if (isDefined(ariaHaspopup)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-haspopup")(ariaHaspopup),
		)
	}
	if (isDefined(ariaPressed)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-pressed")(ariaPressed),
		)
	}
	if (isDefined(ariaSelected)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-selected")(ariaSelected),
		)
	}
	if (isDefined(ariaControls)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-controls")(ariaControls),
		)
	}

	return filteredAttrs
}

/**
 * Creates an A element configuration object
 *
 * The a element represents a hyperlink or anchor.
 * It can contain flow content but not interactive content.
 *
 * @example
 * ```typescript
 * const link = A({
 *   id: "home-link",
 *   href: "/home",
 *   target: "_blank"
 * })([
 *   TextNode("Go to Home")
 * ])
 * ```
 */
export const A = (attributes: AnchorElementAttributes = {}) =>
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
		? children.filter(ADVANCED_FILTERS.anchorContent)
		: ADVANCED_FILTERS.anchorContent(children)
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
		tag: "A",
	}
}

export default A
