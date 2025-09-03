import type { NoAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { MetaAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import type { MetaElementAttributes } from "../index.ts"

export default function filterAttributes(attributes: MetaElementAttributes) {

	const {
		id,
		charSet: charset,
		content,
		httpEquiv,
		media,
		name,
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

	// Add meta-specific attributes
	if (isDefined(charset)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("charSet")(charset))
	}
	if (isDefined(content)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("content")(content))
	}
	if (isDefined(httpEquiv)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(HTTP_EQUIVS))("httpEquiv")(httpEquiv),
		)
	}
	if (isDefined(media)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("media")(media))
	}
	if (isDefined(name)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("name")(name))
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
