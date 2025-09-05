import {
	CROSS_ORIGINS,
	PRELOADS,
} from "@sitebender/engine/constructors/elements/constants/index.ts"
import getId from "@sitebender/engine/constructors/helpers/getId/index.ts"
import filterAttribute from "@sitebender/engine/guards/filterAttribute/index.ts"
import isBoolean from "@sitebender/engine/guards/isBoolean/index.ts"
import isMemberOf from "@sitebender/engine/guards/isMemberOf/index.ts"
import isString from "@sitebender/engine/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/engine/guards/pickGlobalAttributes/index.ts"
import isDefined from "@sitebender/engine/utilities/isDefined/index.ts"

import type { AudioElementAttributes } from "../index.ts"

export default function filterAttributes(attributes: AudioElementAttributes) {
	const {
		id,
		autoplay,
		controls,
		crossOrigin,
		loop,
		muted,
		preload,
		src,
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

	// Add audio-specific attributes
	if (isDefined(autoplay)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("autoplay")(autoplay),
		)
	}
	if (isDefined(controls)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("controls")(controls),
		)
	}
	if (isDefined(crossOrigin)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(CROSS_ORIGINS))("crossorigin")(crossOrigin),
		)
	}
	if (isDefined(loop)) {
		Object.assign(filteredAttrs, filterAttribute(isBoolean)("loop")(loop))
	}
	if (isDefined(muted)) {
		Object.assign(filteredAttrs, filterAttribute(isBoolean)("muted")(muted))
	}
	if (isDefined(preload)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(PRELOADS))("preload")(preload),
		)
	}
	if (isDefined(src)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("src")(src))
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
