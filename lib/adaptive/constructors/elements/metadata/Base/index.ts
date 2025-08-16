import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "../../../../types/index.ts"
import type { NoAriaAttributes } from "../../types/aria/index.ts"
import type { BaseAttributes } from "../../types/attributes/index.ts"
import type { ElementConfig } from "../../types/index.ts"

import { TARGETS } from "../../../../constructors/elements/constants/index.ts"
import getId from "../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../guards/isBoolean/index.ts"
import isMemberOf from "../../../../guards/isMemberOf/index.ts"
import isString from "../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes/index.ts"
import isDefined from "../../../../utilities/isDefined/index.ts"

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
export const filterAttributes = (attributes: BaseElementAttributes) => {
	const {
		id,
		href,
		target,
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

	// Add base-specific attributes
	if (isDefined(href)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("href")(href))
	}
	if (isDefined(target)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(TARGETS))("target")(target),
		)
	}

	// Add ARIA attributes
	if (isDefined(ariaHidden)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-hidden")(ariaHidden),
		)
	}

	return filteredAttrs
}

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
export const Base = (attributes: BaseElementAttributes = {}): ElementConfig => {
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
