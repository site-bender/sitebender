import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { NoAriaAttributes } from "@sitebender/engine/constructors/elements/types/aria/index.ts"
import type { LinkAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/engine/constructors/elements/types/index.ts"

import isDefined from "@sitebender/engine/utilities/isDefined/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Filters attributes for Link element
 * Allows global attributes and validates link-specific attributes
 */

/**
 * Extended Link attributes including reactive properties and ARIA
 */
export type LinkElementAttributes = LinkAttributes & NoAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Link element
 * Allows global attributes and validates link-specific attributes
 */


/**
 * Creates a Link element configuration object
 *
 * The link element allows authors to link their document to other resources.
 * It is a void element.
 *
 * @example
 * ```typescript
 * const link = Link({
 *   rel: "stylesheet",
 *   href: "styles.css"
 * })
 * ```
 */
const Link = (attributes: LinkElementAttributes = {}): ElementConfig => {
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
		children: [],
		...(isDefined(calculation) ? { calculation } : {}),
		...(isDefined(dataset)
			? { dataset: dataset as Record<string, Value> }
			: {}),
		...(isDefined(display) ? { display } : {}),
		...(isDefined(format) ? { format } : {}),
		...(isDefined(scripts) ? { scripts } : {}),
		...(isDefined(stylesheets) ? { stylesheets } : {}),
		...(isDefined(validation) ? { validation } : {}),
		tag: "Link",
	}
}

export default Link
// default-only exports
