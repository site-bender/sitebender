import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Output element
 * Allows global attributes and validates output-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const { id, for: forAttr, form, name, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("for")(forAttr),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("name")(name),
	}
}

/**
 * Creates an Output element configuration object
 *
 * The output element represents the result of a calculation or user action.
 *
 * @example
 * ```typescript
 * const output = Output({
 *   name: "result",
 *   for: "input1 input2",
 *   form: "calculator"
 * })([
 *   TextNode("42")
 * ])
 * ```
 */
export const Output = (attributes: any = {}) => (children: any = []) => {
	const filteredChildren = Array.isArray(children) ? children : [children]

	return Filtered("Output")(filterAttributes)(attributes)(filteredChildren)
}

export default Output
