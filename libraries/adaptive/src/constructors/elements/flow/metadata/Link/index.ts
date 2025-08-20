import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "../../../../../types/index.ts"
import type { NoAriaAttributes } from "../../../types/aria/index.ts"
import type { LinkAttributes } from "../../../types/attributes/index.ts"
import type { ElementConfig } from "../../../types/index.ts"

import isDefined from "../../../../../../utilities/isDefined/index.ts"
import {
	BLOCKINGS,
	CROSS_ORIGINS,
	DESTINATIONS,
	FETCH_PRIORITIES,
	REFERRER_POLICIES,
	RELS_FOR_LINK,
} from "../../../../../constructors/elements/constants/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Link element
 * Allows global attributes and validates link-specific attributes
 */

/**
 * Extended Link attributes including reactive properties and ARIA
 */
export type LinkElementAttributes = LinkAttributes & NoAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Link element
 * Allows global attributes and validates link-specific attributes
 */
export const filterAttributes = (attributes: LinkElementAttributes) => {
	const {
		id,
		as,
		blocking,
		color,
		crossorigin,
		disabled,
		fetchPriority,
		href,
		hreflang,
		imageSizes,
		imageSrcset,
		integrity,
		media,
		referrerPolicy,
		rel,
		sizes,
		type,
		// ARIA attributes
		"aria-hidden": ariaHidden,
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

	// Add link-specific attributes
	if (isDefined(as)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(DESTINATIONS))("as")(as),
		)
	}
	if (isDefined(blocking)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(BLOCKINGS))("blocking")(blocking),
		)
	}
	if (isDefined(color)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("color")(color))
	}
	if (isDefined(crossorigin)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(CROSS_ORIGINS))("crossorigin")(crossorigin),
		)
	}
	if (isDefined(disabled)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("disabled")(disabled),
		)
	}
	if (isDefined(fetchPriority)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(FETCH_PRIORITIES))("fetchPriority")(
				fetchPriority,
			),
		)
	}
	if (isDefined(href)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("href")(href))
	}
	if (isDefined(hreflang)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("hreflang")(hreflang),
		)
	}
	if (isDefined(imageSizes)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("imageSizes")(imageSizes),
		)
	}
	if (isDefined(imageSrcset)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("imageSrcset")(imageSrcset),
		)
	}
	if (isDefined(integrity)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("integrity")(integrity),
		)
	}
	if (isDefined(media)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("media")(media))
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
			filterAttribute(isMemberOf(RELS_FOR_LINK))("rel")(rel),
		)
	}
	if (isDefined(sizes)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("sizes")(sizes))
	}
	if (isDefined(type)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("type")(type))
	}

	// Add ARIA attributes (only aria-hidden for metadata elements)
	if (isDefined(ariaHidden)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-hidden")(ariaHidden),
		)
	}

	return filteredAttrs
}

/**
 * Creates a Link element configuration object
 *
 * The link element allows authors to link their document to other resources.
 * It is a void element.
 *
 * @example
 * ```typescript
 * const link = Link({
 *   rel: "stylesheet",
 *   href: "styles.css"
 * })
 * ```
 */
export const Link = (attributes: LinkElementAttributes = {}): ElementConfig => {
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

	return {
		attributes: {
			id,
			...attribs,
		},
		children: [],
		...(isDefined(calculation) ? { calculation } : {}),
		...(isDefined(dataset) ? { dataset } : {}),
		...(isDefined(display) ? { display } : {}),
		...(isDefined(format) ? { format } : {}),
		...(isDefined(scripts) ? { scripts } : {}),
		...(isDefined(stylesheets) ? { stylesheets } : {}),
		...(isDefined(validation) ? { validation } : {}),
		tag: "Link",
	}
}

export default Link
