import type { InputEmailAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { InputEmailAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"

import { AUTOCOMPLETES } from "@engineSrc/constructors/elements/constants/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isInteger from "@engineSrc/guards/isInteger/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

import Input from "../index.ts"

/**
 * Extended InputEmail attributes including reactive properties and ARIA
 */
export type InputEmailElementAttributes =
	& InputEmailAttributes
	& InputEmailAriaAttributes
	& {
		calculation?: Operand
		dataset?: Record<string, Value>
		display?: ComparatorConfig | LogicalConfig
		format?: OperatorConfig
		scripts?: string[]
		stylesheets?: string[]
		validation?: ComparatorConfig | LogicalConfig
	}

/**
 * Filters attributes for InputEmail element
 * Allows global attributes and validates email input-specific attributes
 */
export const filterAttributes = (attributes: InputEmailElementAttributes) => {
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

/**
 * Creates an InputEmail element configuration object
 *
 * The email input field allows users to input and edit email addresses.
 *
 * @example
 * ```typescript
 * const input = InputEmail({
 *   name: "email",
 *   placeholder: "Enter your email address",
 *   required: true,
 *   multiple: true
 * })
 * ```
 */
const InputEmail = Input("email")(
	filterAttributes as unknown as (
		a: Record<string, Value>,
	) => Record<string, Value>,
)

export default InputEmail
