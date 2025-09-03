import type { NoAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { LinkAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import filterAttributes from "./filterAttributes/index.ts"
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"

import {
	CROSS_ORIGINS,
	DESTINATIONS,
	REFERRER_POLICIES,
	RELS_FOR_LINK,
} from "@engineSrc/constructors/elements/constants/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

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
export const Link = (attributes: LinkElementAttributes = {}): ElementConfig => {
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

export { default as filterAttributes } from "./filterAttributes/index.ts"
