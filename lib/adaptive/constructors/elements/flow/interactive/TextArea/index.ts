import isDefined from "../../../../../../utilities/isDefined/index.ts"
import {
	AUTOCOMPLETES,
	WRAPS,
} from "../../../../../constructors/elements/constants/index.ts"
import TextNode from "../../../../../constructors/elements/TextNode/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isInteger from "../../../../../guards/isInteger/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for TextArea element
 * Allows global attributes and validates textarea-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const {
		autoComplete,
		cols,
		dirName,
		disabled,
		form,
		maxLength,
		minLength,
		name,
		placeholder,
		readOnly,
		required,
		rows,
		wrap,
		...attrs
	} = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isMemberOf(AUTOCOMPLETES))("autoComplete")(autoComplete),
		...filterAttribute(isInteger)("cols")(cols),
		...filterAttribute(isString)("dirName")(dirName),
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isInteger)("maxLength")(maxLength),
		...filterAttribute(isInteger)("minLength")(minLength),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("placeholder")(placeholder),
		...filterAttribute(isBoolean)("readOnly")(readOnly),
		...filterAttribute(isBoolean)("required")(required),
		...filterAttribute(isInteger)("rows")(rows),
		...filterAttribute(isMemberOf(WRAPS))("wrap")(wrap),
	}
}

/**
 * Creates a TextArea element configuration object
 *
 * The textarea element represents a multiline plain text edit control
 * for the element's raw value.
 *
 * @param attributes - Element attributes
 * @param content - Text content for the textarea
 * @returns Element configuration object
 *
 * @example
 * ```typescript
 * const textarea = TextArea({
 *   name: "message",
 *   rows: 4,
 *   cols: 50,
 *   placeholder: "Enter your message..."
 * })("Default content")
 * ```
 */
const TextArea =
	(attributes: Record<string, unknown> = {}) => (content?: string) => {
		const {
			calculation,
			dataset,
			display,
			format,
			scripts,
			stylesheets,
			validation,
			...attrs
		} = attributes
		const { id, ...attribs } = filterAttributes(attrs)

		// Convert string content to TextNode children
		const kids = isString(content) && content !== ""
			? [TextNode(content)]
			: undefined

		return {
			attributes: {
				...getId(id),
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
			tag: "textarea",
		}
	}

export default TextArea
