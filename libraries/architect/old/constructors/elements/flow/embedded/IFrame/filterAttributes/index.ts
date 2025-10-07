import {
	REFERRER_POLICIES,
	SANDBOXES,
} from "@sitebender/architect/constructors/elements/constants/index.ts"
import getId from "@sitebender/architect/constructors/helpers/getId/index.ts"
import filterAttribute from "@sitebender/architect/guards/filterAttribute/index.ts"
import isBoolean from "@sitebender/architect/guards/isBoolean/index.ts"
import isInteger from "@sitebender/architect/guards/isInteger/index.ts"
import isMemberOf from "@sitebender/architect/guards/isMemberOf/index.ts"
import isString from "@sitebender/architect/guards/isString/index.ts"
import isSubsetOf from "@sitebender/architect/guards/isSubsetOf/index.ts"
import isValidIframeAllow from "@sitebender/architect/guards/isValidIframeAllow/index.ts"
import pickGlobalAttributes from "@sitebender/architect/guards/pickGlobalAttributes/index.ts"
import isDefined from "@sitebender/architect/utilities/isDefined/index.ts"

import type { IFrameElementAttributes } from "../index.ts"

export default function filterAttributes(attributes: IFrameElementAttributes) {
	const {
		id,
		allow,
		allowFullScreen,
		height,
		name,
		referrerPolicy,
		sandbox,
		src,
		srcDoc,
		width,
		// ARIA attributes
		role,
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby,
		"aria-describedby": ariaDescribedby,
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

	// Add iframe-specific attributes
	if (isDefined(allow)) {
		// Adapt boolean guard to a type predicate
		const isValidAllow = (v: string): v is string => isValidIframeAllow(v)
		Object.assign(
			filteredAttrs,
			filterAttribute(isValidAllow)("allow")(allow),
		)
	}
	if (isDefined(allowFullScreen)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("allowfullscreen")(allowFullScreen),
		)
	}
	if (isDefined(height)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isInteger)("height")(height),
		)
	}
	// Note: loading attribute not currently modeled in InlineFrameAttributes
	if (isDefined(name)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("name")(name))
	}
	if (isDefined(referrerPolicy)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(REFERRER_POLICIES))("referrerPolicy")(
				referrerPolicy,
			),
		)
	}
	if (isDefined(sandbox)) {
		// Validate space/comma-separated sandbox tokens are within allowed set
		Object.assign(
			filteredAttrs,
			filterAttribute(isSubsetOf(SANDBOXES))("sandbox")(sandbox),
		)
	}
	if (isDefined(src)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("src")(src))
	}
	if (isDefined(srcDoc)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("srcdoc")(srcDoc),
		)
	}
	if (isDefined(width)) {
		Object.assign(filteredAttrs, filterAttribute(isInteger)("width")(width))
	}

	// Add ARIA attributes
	if (isDefined(role)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("role")(role))
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
	if (isDefined(ariaHidden)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-hidden")(ariaHidden),
		)
	}

	return filteredAttrs
}
