import type { TableAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { TableAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import type { TableElementAttributes } from "../index.ts"

export default function filterAttributes(attributes: TableElementAttributes) {

	const {
		id,
		// ARIA attributes
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby,
		"aria-describedby": ariaDescribedby,
		"aria-hidden": ariaHidden,
		"aria-colcount": ariaColcount,
		"aria-rowcount": ariaRowcount,
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
	if (isDefined(ariaColcount)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isNumber)("aria-colcount")(ariaColcount),
		)
	}
	if (isDefined(ariaRowcount)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isNumber)("aria-rowcount")(ariaRowcount),
		)
	}
	if (isDefined(role)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(TABLE_ROLES))("role")(role),
		)
	}

	return filteredAttrs

}
