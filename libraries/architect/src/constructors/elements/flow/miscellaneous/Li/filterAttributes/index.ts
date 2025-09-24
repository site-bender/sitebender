import { LI_ROLES } from "@sitebender/architect/constructors/elements/constants/aria-roles.ts"
import getId from "@sitebender/architect/constructors/helpers/getId/index.ts"
import filterAttribute from "@sitebender/architect/guards/filterAttribute/index.ts"
import isBoolean from "@sitebender/architect/guards/isBoolean/index.ts"
import isInteger from "@sitebender/architect/guards/isInteger/index.ts"
import isMemberOf from "@sitebender/architect/guards/isMemberOf/index.ts"
import isNumber from "@sitebender/architect/guards/isNumber/index.ts"
import isString from "@sitebender/architect/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/architect/guards/pickGlobalAttributes/index.ts"
import isDefined from "@sitebender/architect/utilities/isDefined/index.ts"

import type { LiElementAttributes } from "../index.ts"

export default function filterAttributes(attributes: LiElementAttributes) {
	const {
		id,
		value,
		// ARIA attributes
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby,
		"aria-describedby": ariaDescribedby,
		"aria-hidden": ariaHidden,
		"aria-posinset": ariaPosinset,
		"aria-setsize": ariaSetsize,
		"aria-selected": ariaSelected,
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

	// Add li-specific attributes
	if (isDefined(value)) {
		Object.assign(filteredAttrs, filterAttribute(isInteger)("value")(value))
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
	if (isDefined(ariaPosinset)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isNumber)("aria-posinset")(ariaPosinset),
		)
	}
	if (isDefined(ariaSetsize)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isNumber)("aria-setsize")(ariaSetsize),
		)
	}
	if (isDefined(ariaSelected)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-selected")(ariaSelected),
		)
	}
	if (isDefined(role)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(LI_ROLES))("role")(role),
		)
	}

	return filteredAttrs
}
