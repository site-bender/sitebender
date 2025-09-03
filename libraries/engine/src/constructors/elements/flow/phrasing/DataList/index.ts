import isDefined from "@engineSrc/utilities/isDefined/index.ts"

import type {
import filterAttributes from "./filterAttributes/index.ts"
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

export { default as filterAttributes } from "./filterAttributes/index.ts"
