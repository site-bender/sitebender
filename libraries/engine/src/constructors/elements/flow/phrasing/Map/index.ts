import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { ImageMapAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/engine/constructors/elements/types/index.ts"

import Filtered from "@sitebender/engine/constructors/abstracted/Filtered/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

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
const Map =
	(attributes: Record<string, Value> = {}) =>
	(children: Array<ElementConfig> | ElementConfig | string = []) => {
		const filteredChildren = Array.isArray(children) ? children : [children]

		return Filtered("map")(
			(attrs: Record<string, unknown>) =>
				filterAttributes(attrs as ImageMapAttributes),
		)(attributes)(filteredChildren as Array<ElementConfig>)
	}

export default Map
