import type { AsideElementAttributes } from "../index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import { ASIDE_ROLES } from "@engineSrc/constructors/elements/constants/aria-roles.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@engineSrc/utilities/isDefined/index.ts"

export default function filterAttributes(attributes: AsideElementAttributes) {

	const {
		id,
		// ARIA attributes (using general AriaAttributes since there's no specific AsideAriaAttributes)
		role,
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby,
		"aria-describedby": ariaDescribedby,
		"aria-hidden": ariaHidden,
		"aria-atomic": ariaAtomic,
		"aria-busy": ariaBusy,
		"aria-live": ariaLive,
		"aria-relevant": ariaRelevant,
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
	if (isDefined(role)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(ASIDE_ROLES))("role")(role),
		)
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
	if (isDefined(ariaAtomic)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-atomic")(ariaAtomic),
		)
	}
	if (isDefined(ariaBusy)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-busy")(ariaBusy),
		)
	}
	if (isDefined(ariaLive)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-live")(ariaLive),
		)
	}
	if (isDefined(ariaRelevant)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-relevant")(ariaRelevant),
		)
	}

	return filteredAttrs

}
