import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/architect-types/index.ts"
import type { ImageAriaAttributes } from "@sitebender/architect/constructors/elements/types/aria/index.ts"
import type { EmbedAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/architect/constructors/elements/types/index.ts"

import isDefined from "@sitebender/architect/utilities/isDefined/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Extended Embed attributes including reactive properties and ARIA
 */
export type EmbedElementAttributes = EmbedAttributes & ImageAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Embed element
 * Allows global attributes and validates embed-specific attributes
 */

/**
 * Creates an Embed element configuration object
 *
 * The embed element embeds external content at the specified point in the document.
 * This is a void element (cannot have children).
 *
 * @example
 * ```typescript
 * const embed = Embed({
 *   src: "media.swf",
 *   type: "application/x-shockwave-flash",
 *   width: 400,
 *   height: 300
 * })
 * ```
 */
const Embed = (
	attributes: EmbedElementAttributes = {},
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
		tag: "Embed",
	}
}

export default Embed
