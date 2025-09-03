import type { ListAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { OrderedListAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import type { OlElementAttributes } from "../index.ts"

export default function filterAttributes(attributes: OlElementAttributes) {

	const {
		id,
		start,
		reversed,
		type,
		// ARIA attributes
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby,
		"aria-describedby": ariaDescribedby,
		"aria-hidden": ariaHidden,
		role,
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

	// Add ol-specific attributes
	if (isDefined(start)) {
		Object.assign(filteredAttrs, filterAttribute(isInteger)("start")(start))
	}
	if (isDefined(reversed)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("reversed")(reversed),
		)
	}
	if (isDefined(type)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(OL_TYPES))("type")(type),
		)
	}

	// Add ARIA attributes
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
	if (isDefined(role)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(OL_ROLES))("role")(role),
		)
	}

	return filteredAttrs

}
