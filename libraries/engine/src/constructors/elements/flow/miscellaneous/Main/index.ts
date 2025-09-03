import type { MainAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { MainAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import filterAttributes from "./filterAttributes/index.ts"
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"

import { MAIN_ROLES } from "@engineSrc/constructors/elements/constants/aria-roles.ts"
import TextNode from "@engineSrc/constructors/elements/TextNode/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

/**
 * Extended Main attributes including reactive properties and ARIA
 */
export type MainElementAttributes = MainAttributes & MainAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Main element
 * Allows global attributes and validates main-specific attributes
 */


/**
 * Creates a Main element configuration object
 *
 * The main element represents the dominant content of the body of a document.
 * The main content area consists of content that is directly related to or
 * expands upon the central topic of a document.
 *
 * @example
 * ```typescript
 * const main = Main({
 *   id: "main-content",
 *   class: "content"
 * })([TextNode("Main content here")])
 * ```
 */
export const Main = (attributes: MainElementAttributes = {}) =>
(
	children: Array<ElementConfig> | ElementConfig | string = [],
): ElementConfig => {
	const { id, ...attribs } = filterAttributes(attributes)
	const {
		calculation,
		dataset,
		display,
		format,
		scripts,
		stylesheets,
		validation,
	} = attributes

	// Convert string children to TextNode - Main can contain any flow content
	const kids = isString(children)
		? [TextNode(children)]
		: Array.isArray(children)
		? children // Main accepts all flow content
		: [children]

	return {
		attributes: {
			id,
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
		tag: "Main",
	}
}

export default Main

export { default as filterAttributes } from "./filterAttributes/index.ts"
