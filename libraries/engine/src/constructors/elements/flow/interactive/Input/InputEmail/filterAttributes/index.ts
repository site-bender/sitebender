import { AUTOCOMPLETES } from "@sitebender/engine/constructors/elements/constants/index.ts"
import getId from "@sitebender/engine/constructors/helpers/getId/index.ts"
import filterAttribute from "@sitebender/engine/guards/filterAttribute/index.ts"
import isBoolean from "@sitebender/engine/guards/isBoolean/index.ts"
import isInteger from "@sitebender/engine/guards/isInteger/index.ts"
import isMemberOf from "@sitebender/engine/guards/isMemberOf/index.ts"
import isString from "@sitebender/engine/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/engine/guards/pickGlobalAttributes/index.ts"
import isDefined from "@sitebender/engine/utilities/isDefined/index.ts"

import type { InputEmailElementAttributes } from "../index.ts"

export default function filterAttributes(
	attributes: InputEmailElementAttributes,
) {
	const {
		id,
		autocomplete,
		autofocus,
		dirname,
		disabled,
		form,
		list,
		maxlength,
		minlength,
		multiple,
		name,
		pattern,
		placeholder,
		readonly,
		required,
		size,
		value,
		// ARIA attributes (role is handled by base Input constructor)
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby,
		"aria-describedby": ariaDescribedby,
		"aria-placeholder": ariaPlaceholder,
		"aria-required": ariaRequired,
		"aria-invalid": ariaInvalid,
		"aria-readonly": ariaReadonly,
		"aria-disabled": ariaDisabled,
		"aria-autocomplete": ariaAutocomplete,
		"aria-multiline": ariaMultiline,
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

	// Add input-specific attributes
	if (isDefined(autocomplete)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(autocomplete),
		)
	}
	if (isDefined(autofocus)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("autofocus")(autofocus),
		)
	}
	if (isDefined(dirname)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("dirname")(dirname))
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
	if (isDefined(list)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("list")(list))
	}
	if (isDefined(maxlength)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isInteger)("maxlength")(maxlength),
		)
	}
	if (isDefined(minlength)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isInteger)("minlength")(minlength),
		)
	}
	if (isDefined(multiple)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("multiple")(multiple),
		)
	}
	if (isDefined(name)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("name")(name))
	}
	if (isDefined(pattern)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("pattern")(pattern))
	}
	if (isDefined(placeholder)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("placeholder")(placeholder),
		)
	}
	if (isDefined(readonly)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("readonly")(readonly),
		)
	}
	if (isDefined(required)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("required")(required),
		)
	}
	if (isDefined(size)) {
		Object.assign(filteredAttrs, filterAttribute(isInteger)("size")(size))
	}
	if (isDefined(value)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("value")(value))
	}

	// Add ARIA attributes (role is handled by base Input constructor)
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
	if (isDefined(ariaPlaceholder)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-placeholder")(ariaPlaceholder),
		)
	}
	if (isDefined(ariaRequired)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-required")(ariaRequired),
		)
	}
	if (isDefined(ariaInvalid)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-invalid")(ariaInvalid),
		)
	}
	if (isDefined(ariaReadonly)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-readonly")(ariaReadonly),
		)
	}
	if (isDefined(ariaDisabled)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-disabled")(ariaDisabled),
		)
	}
	if (isDefined(ariaAutocomplete)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-autocomplete")(ariaAutocomplete),
		)
	}
	if (isDefined(ariaMultiline)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-multiline")(ariaMultiline),
		)
	}
	if (isDefined(ariaHidden)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-hidden")(ariaHidden),
		)
	}

	return filteredAttrs
}
