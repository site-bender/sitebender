import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isInteger from "@engineSrc/guards/isInteger/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import isSubsetOf from "@engineSrc/guards/isSubsetOf/index.ts"
import isValidIframeAllow from "@engineSrc/guards/isValidIframeAllow/index.ts"
import { REFERRER_POLICIES, SANDBOXES } from "@engineSrc/constructors/elements/constants/index.ts"
import isDefined from "@engineSrc/utilities/isDefined/index.ts"
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
		Object.assign(filteredAttrs, filterAttribute(isValidAllow)("allow")(allow))
	}
	if (isDefined(allowFullScreen)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("allowfullscreen")(allowFullScreen),
		)
	}
	if (isDefined(height)) {
		Object.assign(filteredAttrs, filterAttribute(isInteger)("height")(height))
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
		Object.assign(filteredAttrs, filterAttribute(isString)("srcdoc")(srcDoc))
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
