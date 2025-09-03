import type { NoAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { ScriptAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import filterAttributes from "./filterAttributes/index.ts"
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"

import {
	CROSS_ORIGINS,
	REFERRER_POLICIES,
} from "@engineSrc/constructors/elements/constants/index.ts"
import TextNode from "@engineSrc/constructors/elements/TextNode/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

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

export { default as filterAttributes } from "./filterAttributes/index.ts"
