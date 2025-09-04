import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { NoAriaAttributes } from "@sitebender/engine/constructors/elements/types/aria/index.ts"
import type { SourceAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/engine/constructors/elements/types/index.ts"

import isDefined from "@sitebender/engine/utilities/isDefined/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Extended Source attributes including reactive properties and ARIA
 * Source elements have limited ARIA support (mainly aria-hidden)
 */
export type SourceElementAttributes = SourceAttributes & NoAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Source element
 * Allows global attributes and validates source-specific attributes
 */


/**
 * Creates a Source element configuration object
 *
 * The source element allows authors to specify multiple alternative source sets
 * for img elements or multiple alternative media resources for media elements.
 * This is a void element (cannot have children).
 *
 * @example
 * ```typescript
 * const source = Source({
 *   media: "(min-width: 800px)",
 *   srcset: "large.jpg 1x, large-2x.jpg 2x",
 *   type: "image/jpeg"
 * })
 * ```
 */
const Source = (
	attributes: SourceElementAttributes = {},
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

	return {
		attributes: {
			id,
			...attribs,
		},
		children: [], // Void element
		...(isDefined(calculation) ? { calculation } : {}),
		...(isDefined(dataset) ? { dataset } : {}),
		...(isDefined(display) ? { display } : {}),
		...(isDefined(format) ? { format } : {}),
		...(isDefined(scripts) ? { scripts } : {}),
		...(isDefined(stylesheets) ? { stylesheets } : {}),
		...(isDefined(validation) ? { validation } : {}),
		tag: "Source",
	}
}

export default Source
