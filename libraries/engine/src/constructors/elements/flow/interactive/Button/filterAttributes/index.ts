import { BUTTON_ROLES, BUTTON_TYPES, FORM_ENCTYPES, FORM_METHODS, FORM_TARGETS, POPOVER_TARGET_ACTIONS } from "@sitebender/engine/constructors/elements/constants/index.ts"
import getId from "@sitebender/engine/constructors/helpers/getId/index.ts"
import filterAttribute from "@sitebender/engine/guards/filterAttribute/index.ts"
import isBoolean from "@sitebender/engine/guards/isBoolean/index.ts"
import isMemberOf from "@sitebender/engine/guards/isMemberOf/index.ts"
import isString from "@sitebender/engine/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/engine/guards/pickGlobalAttributes/index.ts"
import isDefined from "@sitebender/engine/utilities/isDefined/index.ts"

import type { ButtonElementAttributes } from "../index.ts"

export default function filterAttributes(attributes: ButtonElementAttributes) {

	const {
		id,
		autofocus,
		disabled,
		form,
		formAction,
		formEncType,
		formMethod,
		formNoValidate,
		formTarget,
		name,
		popoverTarget,
		popoverTargetAction,
		role,
		type,
		value,
		// ARIA attributes
		"aria-pressed": ariaPressed,
		"aria-expanded": ariaExpanded,
		"aria-controls": ariaControls,
		"aria-haspopup": ariaHaspopup,
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby,
		"aria-describedby": ariaDescribedby,
		"aria-disabled": ariaDisabled,
		"aria-hidden": ariaHidden,
		"aria-current": ariaCurrent,
		"aria-live": ariaLive,
		"aria-atomic": ariaAtomic,
		"aria-busy": ariaBusy,
		"aria-relevant": ariaRelevant,
		"aria-keyshortcuts": ariaKeyshortcuts,
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

	// Add button-specific attributes
	if (isDefined(autofocus)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("autofocus")(autofocus),
		)
	}
	if (isDefined(disabled)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("disabled")(disabled),
		)
	}
	if (isDefined(form)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("form")(form))
	}
	if (isDefined(formAction)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("formAction")(formAction),
		)
	}
	if (isDefined(formEncType)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(FORM_ENCTYPES))("formEncType")(formEncType),
		)
	}
	if (isDefined(formMethod)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(FORM_METHODS))("formMethod")(formMethod),
		)
	}
	if (isDefined(formNoValidate)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("formNoValidate")(formNoValidate),
		)
	}
	if (isDefined(formTarget)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(FORM_TARGETS))("formTarget")(formTarget),
		)
	}
	if (isDefined(name)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("name")(name))
	}
	if (isDefined(popoverTarget)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("popoverTarget")(popoverTarget),
		)
	}
	if (isDefined(popoverTargetAction)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(POPOVER_TARGET_ACTIONS))(
				"popoverTargetAction",
			)(popoverTargetAction),
		)
	}
	if (isDefined(role)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(BUTTON_ROLES))("role")(role),
		)
	}
	if (isDefined(type)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(BUTTON_TYPES))("type")(type),
		)
	}
	if (isDefined(value)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("value")(value))
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
	if (isDefined(ariaControls)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-controls")(ariaControls),
		)
	}
	if (isDefined(ariaPressed)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-pressed")(ariaPressed),
		)
	}
	if (isDefined(ariaExpanded)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-expanded")(ariaExpanded),
		)
	}
	if (isDefined(ariaDisabled)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-disabled")(ariaDisabled),
		)
	}
	if (isDefined(ariaHidden)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-hidden")(ariaHidden),
		)
	}
	if (isDefined(ariaCurrent)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-current")(ariaCurrent),
		)
	}
	if (isDefined(ariaHaspopup)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-haspopup")(ariaHaspopup),
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
	if (isDefined(ariaKeyshortcuts)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-keyshortcuts")(ariaKeyshortcuts),
		)
	}

	return filteredAttrs

}
