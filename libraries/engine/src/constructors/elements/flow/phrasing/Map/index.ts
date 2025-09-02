import type { ImageMapAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@adaptiveSrc/constructors/elements/types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@adaptiveTypes/index.ts"

import Filtered from "@adaptiveSrc/constructors/abstracted/Filtered/index.ts"
import getId from "@adaptiveSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@adaptiveSrc/guards/filterAttribute/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@adaptiveSrc/guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Map element
 * Allows global attributes and validates map-specific attributes
 */

/**
 * Extended Map attributes including reactive properties
 */
export type MapElementAttributes = ImageMapAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

export const filterAttributes = (attributes: ImageMapAttributes) => {
	const { id, name, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("name")(name),
	}
}

/**
 * Creates a Map element configuration object
 *
 * The map element represents an image map, used with area elements to define
 * clickable regions on an image.
 *
 * @example
 * ```typescript
 * const map = Map({
 *   name: "navigation-map"
 * })([
 *   Area({ shape: "rect", coords: "0,0,100,50", href: "/home", alt: "Home" }),
 *   Area({ shape: "rect", coords: "100,0,200,50", href: "/about", alt: "About" })
 * ])
 * ```
 */
export const Map =
	(attributes: Record<string, Value> = {}) =>
	(children: Array<ElementConfig> | ElementConfig | string = []) => {
		const filteredChildren = Array.isArray(children) ? children : [children]

		return Filtered("map")(
			(attrs: Record<string, unknown>) =>
				filterAttributes(attrs as ImageMapAttributes),
		)(attributes)(filteredChildren as Array<ElementConfig>)
	}

export default Map
