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
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isNumber from "@engineSrc/guards/isNumber/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
// ElementConfig not needed here

import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

import type { InputNumberAriaAttributes } from "../../../../types/aria/index.ts"
import type { InputNumberAttributes } from "../../../../types/attributes/index.ts"

import Input from "../index.ts"

/**
 * Extended InputNumber attributes including reactive properties and ARIA
 */
export type InputNumberElementAttributes =
	& InputNumberAttributes
	& InputNumberAriaAttributes
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
 * Filters attributes for InputNumber element
 */
export const filterAttributes = (
	attributes: Record<string, Value>,
): Record<string, Value> => {
	const {
		id,
		autocomplete,
		form,
		list,
		max,
		min,
		name,
		placeholder,
		readOnly,
		required,
		step = "any",
		value,
		// ARIA attributes (role is handled by base Input constructor)
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby,
		"aria-describedby": ariaDescribedby,
		"aria-required": ariaRequired,
		"aria-invalid": ariaInvalid,
		"aria-readonly": ariaReadonly,
		"aria-disabled": ariaDisabled,
		"aria-valuemin": ariaValuemin,
		"aria-valuemax": ariaValuemax,
		"aria-valuenow": ariaValuenow,
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
	if (isDefined(form)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("form")(form))
	}
	if (isDefined(list)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("list")(list))
	}
	if (isDefined(max)) {
		Object.assign(filteredAttrs, filterAttribute(isNumber)("max")(max))
	}
	if (isDefined(min)) {
		Object.assign(filteredAttrs, filterAttribute(isNumber)("min")(min))
	}
	if (isDefined(name)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("name")(name))
	}
	if (isDefined(placeholder)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("placeholder")(placeholder),
		)
	}
	if (isDefined(readOnly)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("readonly")(readOnly),
		)
	}
	if (isDefined(required)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("required")(required),
		)
	}
	if (step === "any") {
		Object.assign(filteredAttrs, { step: "any" })
	} else if (isDefined(step)) {
		Object.assign(filteredAttrs, filterAttribute(isNumber)("step")(step))
	}
	if (isDefined(value)) {
		if (typeof value === "number") {
			Object.assign(filteredAttrs, filterAttribute(isNumber)("value")(value))
		} else {
			Object.assign(filteredAttrs, filterAttribute(isString)("value")(value))
		}
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
	if (isDefined(ariaValuemin)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isNumber)("aria-valuemin")(ariaValuemin),
		)
	}
	if (isDefined(ariaValuemax)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isNumber)("aria-valuemax")(ariaValuemax),
		)
	}
	if (isDefined(ariaValuenow)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isNumber)("aria-valuenow")(ariaValuenow),
		)
	}
	if (isDefined(ariaHidden)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-hidden")(ariaHidden),
		)
	}

	return filteredAttrs as Record<string, Value>
}

/**
 * Creates an InputNumber element configuration object
 *
 * The number input allows users to input numeric values.
 *
 * @example
 * ```typescript
 * const input = InputNumber({
 *   name: "quantity",
 *   min: 1,
 *   max: 100,
 *   step: 1,
 *   placeholder: "Enter quantity"
 * })
 * ```
 */
const InputNumber = Input("number")(filterAttributes)

export default InputNumber
