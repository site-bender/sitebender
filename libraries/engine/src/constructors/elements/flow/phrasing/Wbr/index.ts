import type { NoAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { GlobalAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"
import filterAttributes from "./filterAttributes/index.ts"

import isDefined from "@engineSrc/utilities/isDefined/index.ts"

/**
 * Extended Wbr attributes including reactive properties and ARIA
 */
export type WbrElementAttributes = GlobalAttributes & NoAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Wbr element
 * Allows global attributes only
 */


/**
 * Creates a Wbr element configuration object
 *
 * The wbr element represents a word break opportunity.
 * It is a void element and cannot contain children.
 *
 * @example
 * ```typescript
 * const wbr = Wbr({ id: "word-break" })
 * ```
 */
export default function Wbr(attributes: WbrElementAttributes = {}): ElementConfig {
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
		tag: "Wbr",
	}
}
