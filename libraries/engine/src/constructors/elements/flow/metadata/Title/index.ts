import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { NoAriaAttributes } from "@sitebender/engine/constructors/elements/types/aria/index.ts"
import type { TitleAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/engine/constructors/elements/types/index.ts"

import TextNode from "@sitebender/engine/constructors/elements/TextNode/index.ts"
import isDefined from "@sitebender/engine/utilities/isDefined/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Filters attributes for Title element
 * Allows global attributes and validates title-specific attributes
 */

/**
 * Creates a Title element configuration object
 *
 * The title element represents the title of the document.
 * It can only contain text content.
 *
 * @example
 * ```typescript
 * const title = Title({
 *   id: "page-title"
 * })("Page Title")
 * ```
 */

/**
 * Extended Title attributes including reactive properties and ARIA
 */
export type TitleElementAttributes = TitleAttributes & NoAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

const Title =
	(attributes: TitleElementAttributes = {}) =>
	(content: string | ElementConfig): ElementConfig => {
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

		const children = typeof content === "string"
			? [TextNode(content)]
			: content && typeof content === "object" && "tag" in content
			? [content]
			: []

		return {
			attributes: {
				id,
				...attribs,
			},
			children,
			...(isDefined(calculation) ? { calculation } : {}),
			...(isDefined(dataset) ? { dataset } : {}),
			...(isDefined(display) ? { display } : {}),
			...(isDefined(format) ? { format } : {}),
			...(isDefined(scripts) ? { scripts } : {}),
			...(isDefined(stylesheets) ? { stylesheets } : {}),
			...(isDefined(validation) ? { validation } : {}),
			tag: "Title",
		}
	}

export default Title
// default-only exports
