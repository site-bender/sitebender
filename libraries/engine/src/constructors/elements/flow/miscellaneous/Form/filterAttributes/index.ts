import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import { AUTOCOMPLETES, FORM_ENCTYPES, FORM_METHODS, FORM_TARGETS } from "@engineSrc/constructors/elements/constants/index.ts"
import isDefined from "@engineSrc/utilities/isDefined/index.ts"
import type { FormElementAttributes } from "../index.ts"

export default function filterAttributes(attributes: FormElementAttributes) {

	const {
		id,
		action,
		method,
		encType,
		name,
		target,
		autocomplete,
		noValidate,
		acceptCharset,
		rel,
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

	// Add form-specific attributes
	if (isDefined(action)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("action")(action))
	}
	if (isDefined(method)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(FORM_METHODS))("method")(method),
		)
	}
	if (isDefined(encType)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(FORM_ENCTYPES))("encType")(encType),
		)
	}
	if (isDefined(name)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("name")(name))
	}
	if (isDefined(target)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(FORM_TARGETS))("target")(target),
		)
	}
	if (isDefined(autocomplete)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(autocomplete),
		)
	}
	if (isDefined(noValidate)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("noValidate")(noValidate),
		)
	}
	if (isDefined(acceptCharset)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("acceptCharset")(acceptCharset),
		)
	}
	if (isDefined(rel)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("rel")(rel))
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
		Object.assign(filteredAttrs, filterAttribute(isString)("role")(role))
	}

	return filteredAttrs

}
