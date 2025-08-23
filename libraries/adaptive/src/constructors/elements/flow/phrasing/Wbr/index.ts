import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "../../../../../types/index.ts"
import type { NoAriaAttributes } from "../../../types/aria/index.ts"
import type { GlobalAttributes } from "../../../types/attributes/index.ts"
import type { ElementConfig } from "../../../types/index.ts"

import isDefined from "../../../../../../utilities/isDefined/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

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
export const filterAttributes = (attributes: WbrElementAttributes) => {
	const {
		id,
		// ARIA attributes
		"aria-hidden": ariaHidden,
		// Reactive properties (to be excluded from HTML attributes)
		calculation: _calculation,
		dataset: _dataset,
		display: _display,
		format: _format,
		scripts: _scripts,
		stylesheets: _stylesheets,
		validation: _validation,
		...otherAttributes
	} = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	// Build the filtered attributes object step by step to avoid union type complexity
	const filteredAttrs: Record<string, unknown> = {}

	// Add ID if present
	Object.assign(filteredAttrs, getId(id))

	// Add global attributes
	Object.assign(filteredAttrs, globals)

	// Add ARIA attributes (only aria-hidden for void elements)
	if (isDefined(ariaHidden)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-hidden")(ariaHidden),
		)
	}

	return filteredAttrs
}

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
export const Wbr = (attributes: WbrElementAttributes = {}): ElementConfig => {
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

export default Wbr
