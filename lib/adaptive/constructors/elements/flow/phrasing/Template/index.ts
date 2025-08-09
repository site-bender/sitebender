import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import { SHADOW_ROOT_MODES } from "../../../../../constructors/elements/constants/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isFlowContent from "../../../../../guards/isFlowContent/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Template element
 * Allows global attributes and validates template-specific shadow DOM attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const {
		id,
		shadowrootmode,
		shadowrootdelegatesfocus,
		shadowrootclonable,
		shadowrootserializable,
		...otherAttributes
	} = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isMemberOf(SHADOW_ROOT_MODES))("shadowrootmode")(
			shadowrootmode,
		),
		...filterAttribute(isBoolean)("shadowrootdelegatesfocus")(
			shadowrootdelegatesfocus,
		),
		...filterAttribute(isBoolean)("shadowrootclonable")(shadowrootclonable),
		...filterAttribute(isBoolean)("shadowrootserializable")(
			shadowrootserializable,
		),
	}
}

/**
 * Creates a Template element configuration object
 *
 * The template element holds HTML that is not to be rendered immediately
 * when a page is loaded but may be instantiated subsequently during runtime
 * using JavaScript. It supports shadow DOM configuration.
 *
 * @example
 * ```typescript
 * const template = Template({
 *   id: "my-template",
 *   shadowrootmode: "open"
 * })([
 *   Slot({ name: "content" })([])
 * ])
 * ```
 */
/**
 * Child filter that validates flow content
 */
const isValidTemplateChild = (child: any): boolean => {
	// Accept text nodes and other primitive content
	if (!child || typeof child !== "object" || !child.tag) {
		return true
	}

	// Allow Style elements in Template (for Shadow DOM styling)
	if (child.tag === "Style") {
		return true
	}

	// For other element configs, check if they're valid flow content
	return isFlowContent()(child)
}

export const Template = (attributes: any = {}) => (children: any = []) => {
	const filteredChildren = Array.isArray(children)
		? children.filter(isValidTemplateChild)
		: isValidTemplateChild(children)
		? [children]
		: []

	return Filtered("Template")(filterAttributes)(attributes)(filteredChildren)
}

export default Template
