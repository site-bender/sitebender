import type { NoAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { AreaAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
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
	REFERRER_POLICIES,
	RELS_FOR_AREA,
	SHAPES,
	TARGETS,
} from "@engineSrc/constructors/elements/constants/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

/**
 * Extended Area attributes including reactive properties and ARIA
 */
export type AreaElementAttributes = AreaAttributes & NoAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Area element
 * Allows global attributes and validates area-specific attributes
 */


/**
 * Creates an Area element configuration object
 *
 * The area element represents an area inside an image map,
 * or a dead area on an image map.
 * It is a void element and cannot contain children.
 *
 * @example
 * ```typescript
 * const area = Area({
 *   shape: "rect",
 *   coords: "0,0,100,100",
 *   href: "/section1",
 *   alt: "Section 1"
 * })
 * ```
 */
export const Area = (
	attributes: Partial<AreaElementAttributes> = {},
): ElementConfig => {
	const { id, ...attribs } = filterAttributes(
		attributes as AreaElementAttributes,
	)
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
		tag: "Area",
	}
}

export default Area

export { default as filterAttributes } from "./filterAttributes/index.ts"
