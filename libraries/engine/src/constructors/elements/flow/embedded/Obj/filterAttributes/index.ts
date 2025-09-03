import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isInteger from "@engineSrc/guards/isInteger/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import isDefined from "@engineSrc/utilities/isDefined/index.ts"
import type { ObjElementAttributes } from "../index.ts"

export default function filterAttributes(attributes: ObjElementAttributes) {

	const {
		id,
		data,
		height,
		name,
		type,
		useMap,
		width,
		// ARIA attributes
		role,
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby,
		"aria-describedby": ariaDescribedby,
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

	// Add object-specific attributes
	if (isDefined(data)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("data")(data))
	}
	if (isDefined(height)) {
		Object.assign(filteredAttrs, filterAttribute(isInteger)("height")(height))
	}
	if (isDefined(name)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("name")(name))
	}
	if (isDefined(type)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("type")(type))
	}
	if (isDefined(useMap)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("usemap")(useMap))
	}
	if (isDefined(width)) {
		Object.assign(filteredAttrs, filterAttribute(isInteger)("width")(width))
	}

	// Add ARIA attributes
	if (isDefined(role)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("role")(role))
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

	return filteredAttrs

}
