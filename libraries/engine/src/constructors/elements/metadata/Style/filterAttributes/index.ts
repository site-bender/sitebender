import type { NoAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { StyleAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import type { StyleElementAttributes } from "../index.ts"

export default function filterAttributes(attributes: StyleElementAttributes) {

	const {
		id,
		media,
		title,
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

	// Add style-specific attributes
	if (isDefined(media)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("media")(media))
	}
	if (isDefined(title)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("title")(title))
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
