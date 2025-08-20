import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "../../../../../types/index.ts"
import type { NoAriaAttributes } from "../../../types/aria/index.ts"
import type { ScriptAttributes } from "../../../types/attributes/index.ts"
import type { ElementConfig } from "../../../types/index.ts"

import isDefined from "../../../../../../utilities/isDefined/index.ts"
import {
	BLOCKINGS,
	CROSS_ORIGINS,
	FETCH_PRIORITIES,
	REFERRER_POLICIES,
} from "../../../../../constructors/elements/constants/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

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
		blocking,
		crossorigin,
		defer,
		fetchpriority,
		integrity,
		nomodule,
		referrerpolicy,
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
	if (isDefined(blocking)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(BLOCKINGS))("blocking")(blocking),
		)
	}
	if (isDefined(crossorigin)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(CROSS_ORIGINS))("crossorigin")(crossorigin),
		)
	}
	if (isDefined(defer)) {
		Object.assign(filteredAttrs, filterAttribute(isBoolean)("defer")(defer))
	}
	if (isDefined(fetchpriority)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(FETCH_PRIORITIES))("fetchpriority")(
				fetchpriority,
			),
		)
	}
	if (isDefined(integrity)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("integrity")(integrity),
		)
	}
	if (isDefined(nomodule)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("nomodule")(nomodule),
		)
	}
	if (isDefined(referrerpolicy)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(REFERRER_POLICIES))("referrerpolicy")(
				referrerpolicy,
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

	return {
		attributes: {
			id,
			type,
			...attribs,
		},
		children,
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
