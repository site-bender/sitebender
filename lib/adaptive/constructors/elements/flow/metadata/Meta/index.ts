import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "../../../../../types/index.ts"
import type { NoAriaAttributes } from "../../../types/aria/index.ts"
import type { MetaAttributes } from "../../../types/attributes/index.ts"
import type { ElementConfig } from "../../../types/index.ts"

import isDefined from "../../../../../../utilities/isDefined/index.ts"
import { HTTP_EQUIVS } from "../../../../../constructors/elements/constants/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

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
export const filterAttributes = (attributes: MetaElementAttributes) => {
	const {
		id,
		charset,
		content,
		httpEquiv,
		media,
		name,
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

	// Add meta-specific attributes
	if (isDefined(charset)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("charset")(charset))
	}
	if (isDefined(content)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("content")(content))
	}
	if (isDefined(httpEquiv)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(HTTP_EQUIVS))("httpEquiv")(httpEquiv),
		)
	}
	if (isDefined(media)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("media")(media))
	}
	if (isDefined(name)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("name")(name))
	}

	// Add ARIA attributes (only aria-hidden for metadata elements)
	if (isDefined(ariaHidden)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-hidden")(ariaHidden),
		)
	}

	return filteredAttrs
}

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
export const Meta = (attributes: MetaElementAttributes = {}): ElementConfig => {
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
