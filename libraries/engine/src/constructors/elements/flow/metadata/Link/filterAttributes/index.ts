import type { Value as _Value } from "@sitebender/engine-types/index.ts"
import type { NoAriaAttributes as _NoAriaAttributes } from "@sitebender/engine/constructors/elements/types/aria/index.ts"
import type { LinkAttributes as _LinkAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"

import {
	CROSS_ORIGINS,
	DESTINATIONS,
	REFERRER_POLICIES,
	RELS_FOR_LINK,
} from "@sitebender/engine/constructors/elements/constants/index.ts"
import getId from "@sitebender/engine/constructors/helpers/getId/index.ts"
import filterAttribute from "@sitebender/engine/guards/filterAttribute/index.ts"
import isBoolean from "@sitebender/engine/guards/isBoolean/index.ts"
import isMemberOf from "@sitebender/engine/guards/isMemberOf/index.ts"
import isString from "@sitebender/engine/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/engine/guards/pickGlobalAttributes/index.ts"
import isDefined from "@sitebender/engine/utilities/isDefined/index.ts"

import type { LinkElementAttributes } from "../index.ts"

export default function filterAttributes(attributes: LinkElementAttributes) {

	const {
		id,
		as,
		crossOrigin: crossorigin,
		href,
		hrefLang: hreflang,
		media,
		referrerPolicy,
		rel,
		type,
		sizes,
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
	if (isDefined(crossorigin)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(CROSS_ORIGINS))("crossorigin")(crossorigin),
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
