import type { Value as _Value } from "@sitebender/architect-types/index.ts"
import type { NoAriaAttributes as _NoAriaAttributes } from "@sitebender/architect/constructors/elements/types/aria/index.ts"
import type { ScriptAttributes as _ScriptAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"

import {
	CROSS_ORIGINS,
	REFERRER_POLICIES,
} from "@sitebender/architect/constructors/elements/constants/index.ts"
import getId from "@sitebender/architect/constructors/helpers/getId/index.ts"
import filterAttribute from "@sitebender/architect/guards/filterAttribute/index.ts"
import isBoolean from "@sitebender/architect/guards/isBoolean/index.ts"
import isMemberOf from "@sitebender/architect/guards/isMemberOf/index.ts"
import isString from "@sitebender/architect/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/architect/guards/pickGlobalAttributes/index.ts"
import isDefined from "@sitebender/architect/utilities/isDefined/index.ts"

import type { ScriptElementAttributes } from "../index.ts"

export default function filterAttributes(attributes: ScriptElementAttributes) {
	const {
		id,
		async,
		crossOrigin,
		defer,
		referrerPolicy,
		src,
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

	// Add script-specific attributes
	if (isDefined(async)) {
		Object.assign(filteredAttrs, filterAttribute(isBoolean)("async")(async))
	}
	if (isDefined(crossOrigin)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(CROSS_ORIGINS))("crossorigin")(
				crossOrigin,
			),
		)
	}
	if (isDefined(defer)) {
		Object.assign(filteredAttrs, filterAttribute(isBoolean)("defer")(defer))
	}
	if (isDefined(referrerPolicy)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(REFERRER_POLICIES))("referrerpolicy")(
				referrerPolicy,
			),
		)
	}
	if (isDefined(src)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("src")(src))
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
