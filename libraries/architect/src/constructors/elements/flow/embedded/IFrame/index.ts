import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/architect-types/index.ts"
import type { AriaAttributes } from "@sitebender/architect/constructors/elements/types/aria/index.ts"
import type { InlineFrameAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/architect/constructors/elements/types/index.ts"

import isDefined from "@sitebender/architect/utilities/isDefined/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Extended IFrame attributes including reactive properties and ARIA
 */
export type IFrameElementAttributes =
	& InlineFrameAttributes
	& Pick<
		AriaAttributes,
		| "role"
		| "aria-label"
		| "aria-labelledby"
		| "aria-describedby"
		| "aria-hidden"
	>
	& {
		calculation?: Operand
		dataset?: Record<string, Value>
		display?: ComparatorConfig | LogicalConfig
		format?: OperatorConfig
		scripts?: string[]
		stylesheets?: string[]
		validation?: ComparatorConfig | LogicalConfig
	}

/**
 * Filters attributes for IFrame element
 * Allows global attributes and validates iframe-specific attributes
 */

/**
 * Creates an IFrame element configuration object
 *
 * The iframe element represents a nested browsing context, embedding another HTML page.
 * This is a void element (cannot have children).
 *
 * @example
 * ```typescript
 * const iframe = IFrame({
 *   src: "https://example.com",
 *   width: 800,
 *   height: 600,
 *   sandbox: "allow-scripts",
 *   loading: "lazy"
 * })
 * ```
 */
const IFrame = (
	attributes: IFrameElementAttributes = {},
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
		...(isDefined(dataset)
			? { dataset: dataset as Record<string, Value> }
			: {}),
		...(isDefined(display) ? { display } : {}),
		...(isDefined(format) ? { format } : {}),
		...(isDefined(scripts) ? { scripts } : {}),
		...(isDefined(stylesheets) ? { stylesheets } : {}),
		...(isDefined(validation) ? { validation } : {}),
		tag: "IFrame",
	}
}

export default IFrame
