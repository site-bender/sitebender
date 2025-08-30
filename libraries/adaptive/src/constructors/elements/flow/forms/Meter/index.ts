import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@adaptiveTypes/index.ts"
import type { MeterAriaAttributes } from "@adaptiveSrc/constructors/elements/types/aria/index.ts"
import type { MeterAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@adaptiveSrc/constructors/elements/types/index.ts"

import isDefined from "@adaptiveSrc/utilities/isDefined/index.ts"
import TextNode from "@adaptiveSrc/constructors/elements/TextNode/index.ts"
import getId from "@adaptiveSrc/constructors/helpers/getId/index.ts"
import { ADVANCED_FILTERS } from "@adaptiveSrc/guards/createAdvancedFilters/index.ts"
import filterAttribute from "@adaptiveSrc/guards/filterAttribute/index.ts"
import isBoolean from "@adaptiveSrc/guards/isBoolean/index.ts"
import isNumber from "@adaptiveSrc/guards/isNumber/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@adaptiveSrc/guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Meter element
 * Allows global attributes and validates meter-specific attributes
 */

/**
 * Extended Meter attributes including reactive properties and ARIA
 */
export type MeterElementAttributes = MeterAttributes & MeterAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Meter element
 * Allows global attributes and validates meter-specific attributes
 */
export const filterAttributes = (attributes: Partial<MeterElementAttributes>) => {
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

/**
 * Creates a Meter element configuration object
 *
 * The meter element represents a scalar measurement within a known range,
 * or a fractional value; for example disk usage, the relevance of a query result, or the fraction of a voting population.
 *
 * @example
 * ```typescript
 * const meter = Meter({
 *   value: 6,
 *   min: 0,
 *   max: 10,
 *   optimum: 8
 * })([
 *   TextNode("6 out of 10")
 * ])
 * ```
 */
export const Meter = (attributes: Partial<MeterElementAttributes> = {}) =>
(
	children: Array<ElementConfig> | ElementConfig | string = [],
): ElementConfig => {
	const { id, ...attribs } = filterAttributes(attributes)
	const {
		calculation,
		dataset,
		display,
		format,
		scripts,
		stylesheets,
		validation,
	} = attributes

	// Convert string children to TextNode and filter children
	const kids = isString(children)
		? [TextNode(children)]
		: Array.isArray(children)
		? children.filter(ADVANCED_FILTERS.formContent)
		: ADVANCED_FILTERS.formContent(children)
		? [children]
		: []

	return {
		attributes: {
			id,
			...attribs,
		},
		children: kids,
		...(isDefined(calculation) ? { calculation } : {}),
		...(isDefined(dataset) ? { dataset } : {}),
		...(isDefined(display) ? { display } : {}),
		...(isDefined(format) ? { format } : {}),
		...(isDefined(scripts) ? { scripts } : {}),
		...(isDefined(stylesheets) ? { stylesheets } : {}),
		...(isDefined(validation) ? { validation } : {}),
		tag: "Meter",
	}
}

export default Meter
