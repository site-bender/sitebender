import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isPhrasingContent from "../../../../../guards/isPhrasingContent/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Data element
 * Allows global attributes and validates the value attribute
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const { id, value, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("value")(value),
	}
}

/**
 * Creates a Data element configuration object
 *
 * The data element links content with a machine-readable value.
 * It can contain phrasing content.
 *
 * @example
 * ```typescript
 * const data = Data({
 *   id: "product-price",
 *   value: "39.99"
 * })([
 *   TextNode("$39.99")
 * ])
 * ```
 */
export const Data = Filtered("Data")(filterAttributes)

export default Data
