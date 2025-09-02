import isDefined from "@adaptiveSrc/utilities/isDefined/index.ts"

import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "../../../../../types/index.ts"
import type { AriaAttributes } from "../../../types/aria/index.ts"
import type { DataListAttributes } from "../../../types/attributes/index.ts"
import type { ElementConfig } from "../../../types/index.ts"

import TextNode from "../../../../../constructors/elements/TextNode/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import { ADVANCED_FILTERS } from "../../../../../guards/createAdvancedFilters/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Extended DataList attributes including reactive properties and ARIA
 */
export type DataListElementAttributes = DataListAttributes & AriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for DataList element
 * Allows global attributes and validates datalist-specific attributes
 */
export const filterAttributes = (attributes: DataListElementAttributes) => {
	const {
		id,
		// ARIA attributes
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby,
		"aria-describedby": ariaDescribedby,
		"aria-hidden": ariaHidden,
		"aria-expanded": ariaExpanded,
		"aria-disabled": ariaDisabled,
		"aria-invalid": ariaInvalid,
		"aria-required": ariaRequired,
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
	if (isDefined(ariaDisabled)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-disabled")(ariaDisabled),
		)
	}
	if (isDefined(ariaInvalid)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-invalid")(ariaInvalid),
		)
	}
	if (isDefined(ariaRequired)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-required")(ariaRequired),
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

/**
 * Creates a DataList element configuration object
 *
 * The datalist element represents a set of option elements that represent
 * predefined options for other controls.
 * It can contain phrasing content and Option elements.
 *
 * @example
 * ```typescript
 * const datalist = DataList({
 *   id: "browsers"
 * })([
 *   Option({ value: "Chrome" })("Chrome"),
 *   Option({ value: "Firefox" })("Firefox"),
 *   Option({ value: "Safari" })("Safari")
 * ])
 * ```
 */
export const DataList = (attributes: DataListElementAttributes = {}) =>
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
		? children.filter(ADVANCED_FILTERS.phrasingContent)
		: ADVANCED_FILTERS.phrasingContent(children)
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
		tag: "DataList",
	}
}

export default DataList
