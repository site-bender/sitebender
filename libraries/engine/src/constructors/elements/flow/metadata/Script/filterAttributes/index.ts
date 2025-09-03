import type { NoAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { ScriptAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
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
			filterAttribute(isMemberOf(CROSS_ORIGINS))("crossorigin")(crossOrigin),
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
