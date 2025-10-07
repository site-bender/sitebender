import { ALL_ARIA_ROLES } from "@sitebender/architect/constructors/elements/constants/aria-roles.ts"
import getId from "@sitebender/architect/constructors/helpers/getId/index.ts"
import filterAttribute from "@sitebender/architect/guards/filterAttribute/index.ts"
import isBoolean from "@sitebender/architect/guards/isBoolean/index.ts"
import isMemberOf from "@sitebender/architect/guards/isMemberOf/index.ts"
import isString from "@sitebender/architect/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/architect/guards/pickGlobalAttributes/index.ts"
import isDefined from "@sitebender/architect/utilities/isDefined/index.ts"

import type { DivElementAttributes } from "../index.ts"

export default function filterAttributes(attributes: DivElementAttributes) {
	const {
		id,
		// ARIA attributes
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby,
		"aria-describedby": ariaDescribedby,
		"aria-hidden": ariaHidden,
		"aria-expanded": ariaExpanded,
		"aria-controls": ariaControls,
		"aria-live": ariaLive,
		"aria-atomic": ariaAtomic,
		"aria-busy": ariaBusy,
		"aria-relevant": ariaRelevant,
		"aria-current": ariaCurrent,
		"aria-activedescendant": ariaActivedescendant,
		"aria-owns": ariaOwns,
		"aria-flowto": ariaFlowto,
		"aria-keyshortcuts": ariaKeyshortcuts,
		"aria-roledescription": ariaRoledescription,
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
	if (isDefined(ariaExpanded)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-expanded")(ariaExpanded),
		)
	}
	if (isDefined(ariaControls)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-controls")(ariaControls),
		)
	}
	if (isDefined(ariaLive)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-live")(ariaLive),
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
	if (isDefined(ariaRelevant)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-relevant")(ariaRelevant),
		)
	}
	if (isDefined(ariaCurrent)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-current")(ariaCurrent),
		)
	}
	if (isDefined(ariaActivedescendant)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-activedescendant")(
				ariaActivedescendant,
			),
		)
	}
	if (isDefined(ariaOwns)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-owns")(ariaOwns),
		)
	}
	if (isDefined(ariaFlowto)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-flowto")(ariaFlowto),
		)
	}
	if (isDefined(ariaKeyshortcuts)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-keyshortcuts")(ariaKeyshortcuts),
		)
	}
	if (isDefined(ariaRoledescription)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-roledescription")(
				ariaRoledescription,
			),
		)
	}
	if (isDefined(role)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(ALL_ARIA_ROLES))("role")(role),
		)
	}

	return filteredAttrs
}
