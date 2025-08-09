import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Fieldset element
 * Allows global attributes and validates fieldset-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const { id, disabled, form, name, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("name")(name),
	}
}

/**
 * Creates a Fieldset element configuration object
 *
 * The fieldset element represents a set of form controls optionally grouped under a common name.
 *
 * @example
 * ```typescript
 * const fieldset = Fieldset({
 *   name: "personal-info",
 *   disabled: false
 * })([
 *   Legend()([TextNode("Personal Information")]),
 *   Input({ type: "text", name: "firstName", placeholder: "First Name" }),
 *   Input({ type: "text", name: "lastName", placeholder: "Last Name" })
 * ])
 * ```
 */
export const Fieldset = (attributes: any = {}) => (children: any = []) => {
	const filteredChildren = Array.isArray(children) ? children : [children]

	return Filtered("Fieldset")(filterAttributes)(attributes)(filteredChildren)
}

export default Fieldset
