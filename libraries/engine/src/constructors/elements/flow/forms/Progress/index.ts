import type { ProgressAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { ProgressAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"

import TextNode from "@engineSrc/constructors/elements/TextNode/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import { ADVANCED_FILTERS } from "@engineSrc/guards/createAdvancedFilters/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isNumber from "@engineSrc/guards/isNumber/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@engineSrc/utilities/isDefined/index.ts"

/**
 * Filters attributes for Progress element
 * Allows global attributes and validates progress-specific attributes
 */

/**
 * Extended Progress attributes including reactive properties and ARIA
 */
export type ProgressElementAttributes =
	& ProgressAttributes
	& ProgressAriaAttributes
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
 * Filters attributes for Progress element
 * Allows global attributes and validates progress-specific attributes
 */
export const filterAttributes = (attributes: ProgressElementAttributes) => {
	const {
		id,
		max,
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

	// Add progress-specific attributes
	if (isDefined(max)) {
		Object.assign(filteredAttrs, filterAttribute(isNumber)("max")(max))
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
	if (isDefined(role)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("role")(role))
	}

	return filteredAttrs
}

/**
 * Creates a Progress element configuration object
 *
 * The progress element represents the completion progress of a task.
 *
 * @example
 * ```typescript
 * const progress = Progress({
 *   value: 70,
 *   max: 100
 * })([
 *   TextNode("70% complete")
 * ])
 * ```
 */
export const Progress = (attributes: ProgressElementAttributes = {}) =>
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
		tag: "Progress",
	}
}

export default Progress
