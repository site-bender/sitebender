import type { TemplateAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"

import Filtered from "@engineSrc/constructors/abstracted/Filtered/index.ts"
import TextNode from "@engineSrc/constructors/elements/TextNode/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import isFlowContent from "@engineSrc/guards/isFlowContent/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Template element
 * Allows global attributes and validates template-specific shadow DOM attributes
 */

/**
 * Extended Template attributes including reactive properties
 */
export type TemplateElementAttributes = TemplateAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

export const filterAttributes = (attributes: TemplateAttributes) => {
	const { id, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
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
const isValidTemplateChild = (child: ElementConfig): boolean => {
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

export const Template =
	(attributes: Record<string, Value> = {}) =>
	(children: Array<ElementConfig> | ElementConfig | string = []) => {
		const filteredChildren = typeof children === "string"
			? [TextNode(children) as unknown as ElementConfig]
			: Array.isArray(children)
			? children.filter(isValidTemplateChild)
			: isValidTemplateChild(children)
			? [children]
			: []

		return Filtered("template")(
			(a: Record<string, unknown>) => filterAttributes(a as TemplateAttributes),
		)(attributes)(filteredChildren as Array<ElementConfig>)
	}

export default Template
