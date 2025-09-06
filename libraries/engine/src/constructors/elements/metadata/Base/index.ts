import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { NoAriaAttributes } from "@sitebender/engine/constructors/elements/types/aria/index.ts"
import type { BaseAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/engine/constructors/elements/types/index.ts"

import isDefined from "@sitebender/engine/utilities/isDefined/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Filters attributes for Base element
 * Allows global attributes and validates href and target attributes
 */

/**
 * Extended Base attributes including reactive properties and ARIA
 */
export type BaseElementAttributes = BaseAttributes & NoAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Base element
 * Allows global attributes and validates href and target attributes
 */

/**
 * Creates a Base element configuration object
 *
 * The base element allows authors to specify the document base URL
 * for the purposes of resolving relative URLs.
 * It is a void element.
 *
 * @example
 * ```typescript
 * const base = Base({
 *   href: "/api/",
 *   target: "_blank"
 * })
 * ```
 */
const Base = (attributes: BaseElementAttributes = {}): ElementConfig => {
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
		tag: "Base",
	}
}

export default Base
