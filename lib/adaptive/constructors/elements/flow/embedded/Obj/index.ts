import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isInteger from "../../../../../guards/isInteger/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Object element
 * Allows global attributes and validates object-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const { id, data, form, height, name, type, width, ...otherAttributes } =
		attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("data")(data),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isInteger)("height")(height),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("type")(type),
		...filterAttribute(isInteger)("width")(width),
	}
}

/**
 * Creates an Object element configuration object
 *
 * The object element can represent an external resource,
 * which can be treated as an image, a nested browsing context, or a resource.
 *
 * @example
 * ```typescript
 * const obj = Obj({
 *   data: "flash-movie.swf",
 *   type: "application/x-shockwave-flash",
 *   width: 400,
 *   height: 300
 * })([
 *   TextNode("Flash content not supported")
 * ])
 * ```
 */
export const Obj = (attributes: any = {}) => (children: any = []) => {
	const filteredChildren = Array.isArray(children) ? children : [children]

	return Filtered("Object")(filterAttributes)(attributes)(filteredChildren)
}

export default Obj
