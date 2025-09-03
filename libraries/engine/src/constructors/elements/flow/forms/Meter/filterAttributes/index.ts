import type { MeterAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { MeterAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import type { Partial } from "../index.ts"

export default function filterAttributes(attributes: Partial<MeterElementAttributes>,) {

	const {
		id,
		form,
		high,
		low,
		max,
		min,
		optimum,
		value,
		// ARIA attributes
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby,
		"aria-describedby": ariaDescribedby,
		"aria-hidden": ariaHidden,
		"aria-valuemin": ariaValuemin,
		"aria-valuemax": ariaValuemax,
		"aria-valuenow": ariaValuenow,
		"aria-valuetext": ariaValuetext,
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

	// Add meter-specific attributes
	if (isDefined(form)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("form")(form))
	}
	if (isDefined(high)) {
		Object.assign(filteredAttrs, filterAttribute(isNumber)("high")(high))
	}
	if (isDefined(low)) {
		Object.assign(filteredAttrs, filterAttribute(isNumber)("low")(low))
	}
	if (isDefined(max)) {
		Object.assign(filteredAttrs, filterAttribute(isNumber)("max")(max))
	}
	if (isDefined(min)) {
		Object.assign(filteredAttrs, filterAttribute(isNumber)("min")(min))
	}
	if (isDefined(optimum)) {
		Object.assign(filteredAttrs, filterAttribute(isNumber)("optimum")(optimum))
	}
	if (isDefined(value)) {
		Object.assign(filteredAttrs, filterAttribute(isNumber)("value")(value))
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
	if (isDefined(ariaValuetext)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-valuetext")(ariaValuetext),
		)
	}

	return filteredAttrs

}
