import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { NoAriaAttributes } from "@sitebender/engine/constructors/elements/types/aria/index.ts"
import type { MetaAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/engine/constructors/elements/types/index.ts"

import isDefined from "@sitebender/engine/utilities/isDefined/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Filters attributes for Meta element
 * Allows global attributes and validates meta-specific attributes
 */

/**
 * Extended Meta attributes including reactive properties and ARIA
 */
export type MetaElementAttributes = MetaAttributes & NoAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Meta element
 * Allows global attributes and validates meta-specific attributes
 */


/**
 * Creates a Meta element configuration object
 *
 * The meta element represents various kinds of metadata that cannot be expressed
 * using other HTML elements. It is a void element.
 *
 * @example
 * ```typescript
 * const meta = Meta({
 *   charset: "utf-8"
 * })
 * ```
 */
const Meta = (attributes: MetaElementAttributes = {}): ElementConfig => {
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
		...(isDefined(dataset) ? { dataset } : {}),
		...(isDefined(display) ? { display } : {}),
		...(isDefined(format) ? { format } : {}),
		...(isDefined(scripts) ? { scripts } : {}),
		...(isDefined(stylesheets) ? { stylesheets } : {}),
		...(isDefined(validation) ? { validation } : {}),
		tag: "Meta",
	}
}

export default Meta
// default-only exports
