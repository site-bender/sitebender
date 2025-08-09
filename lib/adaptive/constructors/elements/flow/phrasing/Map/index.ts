import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Map element
 * Allows global attributes and validates map-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
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
export const Map = (attributes: any = {}) => (children: any = []) => {
	const filteredChildren = Array.isArray(children) ? children : [children]

	return Filtered("Map")(filterAttributes)(attributes)(filteredChildren)
}

export default Map
