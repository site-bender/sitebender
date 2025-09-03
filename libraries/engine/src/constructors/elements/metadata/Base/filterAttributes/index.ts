import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import { TARGETS } from "@engineSrc/constructors/elements/constants/index.ts"
import isDefined from "@engineSrc/utilities/isDefined/index.ts"
import type { BaseElementAttributes } from "../index.ts"

export default function filterAttributes(attributes: BaseElementAttributes) {

	const {
		id,
		href,
		target,
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

	// Add base-specific attributes
	if (isDefined(href)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("href")(href))
	}
	if (isDefined(target)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(TARGETS))("target")(target),
		)
	}

	// Add ARIA attributes
	if (isDefined(ariaHidden)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-hidden")(ariaHidden),
		)
	}

	return filteredAttrs

}
