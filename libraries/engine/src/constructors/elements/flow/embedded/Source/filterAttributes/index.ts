import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isInteger from "@engineSrc/guards/isInteger/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import isDefined from "@engineSrc/utilities/isDefined/index.ts"
import type { SourceElementAttributes } from "../index.ts"

export default function filterAttributes(attributes: SourceElementAttributes) {

	const {
		id,
		height,
		media,
		sizes,
		src,
		srcSet,
		type,
		width,
		// ARIA attributes (limited for Source elements)
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

	// Add source-specific attributes
	if (isDefined(height)) {
		Object.assign(filteredAttrs, filterAttribute(isInteger)("height")(height))
	}
	if (isDefined(media)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("media")(media))
	}
	if (isDefined(sizes)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("sizes")(sizes))
	}
	if (isDefined(src)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("src")(src))
	}
	if (isDefined(srcSet)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("srcset")(srcSet))
	}
	if (isDefined(type)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("type")(type))
	}
	if (isDefined(width)) {
		Object.assign(filteredAttrs, filterAttribute(isInteger)("width")(width))
	}

	// Add ARIA attributes (limited for Source elements)
	if (isDefined(ariaHidden)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-hidden")(ariaHidden),
		)
	}

	return filteredAttrs

}
