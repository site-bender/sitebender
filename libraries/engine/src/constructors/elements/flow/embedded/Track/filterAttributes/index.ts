import getId from "@sitebender/engine/constructors/helpers/getId/index.ts"
import filterAttribute from "@sitebender/engine/guards/filterAttribute/index.ts"
import isBoolean from "@sitebender/engine/guards/isBoolean/index.ts"
import isMemberOf from "@sitebender/engine/guards/isMemberOf/index.ts"
import isString from "@sitebender/engine/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/engine/guards/pickGlobalAttributes/index.ts"
import isDefined from "@sitebender/engine/utilities/isDefined/index.ts"

import type { TrackElementAttributes } from "../index.ts"

export default function filterAttributes(attributes: TrackElementAttributes) {
	const {
		id,
		default: defaultTrack,
		kind,
		label,
		src,
		srcLang,
		// ARIA attributes (limited for Track elements)
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

	// Add track-specific attributes
	if (isDefined(defaultTrack)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("default")(defaultTrack),
		)
	}
	if (isDefined(kind)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(
				[
					"subtitles",
					"captions",
					"descriptions",
					"chapters",
					"metadata",
				] as const,
			))("kind")(kind),
		)
	}
	if (isDefined(label)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("label")(label))
	}
	if (isDefined(src)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("src")(src))
	}
	if (isDefined(srcLang)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("srclang")(srcLang))
	}

	// Add ARIA attributes (limited for Track elements)
	if (isDefined(ariaHidden)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-hidden")(ariaHidden),
		)
	}

	return filteredAttrs
}
