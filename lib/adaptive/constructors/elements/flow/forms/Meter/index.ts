import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isNumber from "../../../../../guards/isNumber/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Meter element
 * Allows global attributes and validates meter-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const { id, form, high, low, max, min, optimum, value, ...otherAttributes } =
		attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isNumber)("high")(high),
		...filterAttribute(isNumber)("low")(low),
		...filterAttribute(isNumber)("max")(max),
		...filterAttribute(isNumber)("min")(min),
		...filterAttribute(isNumber)("optimum")(optimum),
		...filterAttribute(isNumber)("value")(value),
	}
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
export const Meter = (attributes: any = {}) => (children: any = []) => {
	const filteredChildren = Array.isArray(children) ? children : [children]

	return Filtered("Meter")(filterAttributes)(attributes)(filteredChildren)
}

export default Meter
