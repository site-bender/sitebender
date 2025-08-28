import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@adaptiveTypes/index.ts"
import type { NoAriaAttributes } from "@adaptiveSrc/constructors/elements/types/aria/index.ts"
import type { ScriptAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@adaptiveSrc/constructors/elements/types/index.ts"

import isDefined from "@toolkit/simple/validation/isDefined/index.ts"
import TextNode from "@adaptiveSrc/constructors/elements/TextNode/index.ts"
import { CROSS_ORIGINS, REFERRER_POLICIES } from "@adaptiveSrc/constructors/elements/constants/index.ts"
import getId from "@adaptiveSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@adaptiveSrc/guards/filterAttribute/index.ts"
import isBoolean from "@adaptiveSrc/guards/isBoolean/index.ts"
import isMemberOf from "@adaptiveSrc/guards/isMemberOf/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@adaptiveSrc/guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Script element
 * Allows global attributes and validates script-specific attributes
 */

/**
 * Extended Script attributes including reactive properties and ARIA
 */
export type ScriptElementAttributes = ScriptAttributes & NoAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Script element
 * Allows global attributes and validates script-specific attributes
 */
export const filterAttributes = (attributes: ScriptElementAttributes) => {
	const {
		id,
		async,
	crossOrigin,
		defer,
	referrerPolicy,
		src,
		type,
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

	// Add script-specific attributes
	if (isDefined(async)) {
		Object.assign(filteredAttrs, filterAttribute(isBoolean)("async")(async))
	}
	if (isDefined(crossOrigin)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(CROSS_ORIGINS))("crossorigin")(crossOrigin),
		)
	}
	if (isDefined(defer)) {
		Object.assign(filteredAttrs, filterAttribute(isBoolean)("defer")(defer))
	}
	if (isDefined(referrerPolicy)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(REFERRER_POLICIES))("referrerpolicy")(
				referrerPolicy,
			),
		)
	}
	if (isDefined(src)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("src")(src))
	}
	if (isDefined(type)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("type")(type))
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
 * Creates a Script element configuration object
 *
 * The script element allows authors to include dynamic script and data blocks
 * in their documents.
 *
 * @example
 * ```typescript
 * const script = Script({
 *   src: "script.ts",
 *   type: "module"
 * })([])
 * ```
 */
export const Script = (attributes: ScriptElementAttributes = {}) =>
(
	children: Array<ElementConfig> | ElementConfig | string = [],
): ElementConfig => {
	const { id, type = "module", ...attribs } = filterAttributes(attributes)
	const {
		calculation,
		dataset,
		display,
		format,
		scripts,
		stylesheets,
		validation,
	} = attributes

	const kids = typeof children === "string"
		? [TextNode(children)]
		: Array.isArray(children)
		? children
		: children
		? [children]
		: []

	return {
		attributes: {
			id,
			type,
			...attribs,
		},
		children: kids,
		...(isDefined(calculation) ? { calculation } : {}),
		...(isDefined(dataset) ? { dataset } : {}),
		...(isDefined(display) ? { display } : {}),
		...(isDefined(format) ? { format } : {}),
		...(isDefined(scripts) ? { scripts } : {}),
		...(isDefined(stylesheets) ? { stylesheets } : {}),
		...(isDefined(validation) ? { validation } : {}),
		tag: "Script",
	}
}

export default Script
