import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "../../../../../types/index.ts"
import type { NoAriaAttributes } from "../../../types/aria/index.ts"
import type { AreaAttributes } from "../../../types/attributes/index.ts"
import type { ElementConfig } from "../../../types/index.ts"

import isDefined from "../../../../../../utilities/isDefined/index.ts"
import {
	REFERRER_POLICIES,
	RELS_FOR_AREA,
	SHAPES,
	TARGETS,
} from "../../../../../constructors/elements/constants/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

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
export const filterAttributes = (attributes: AreaElementAttributes) => {
	const {
		id,
		alt,
		coords,
		download,
		href,
		hreflang,
		media,
		ping,
		referrerpolicy,
		rel,
		shape,
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

	// Add area-specific attributes
	if (isDefined(alt)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("alt")(alt))
	}
	if (isDefined(coords)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("coords")(coords))
	}
	if (isDefined(download)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("download")(download),
		)
	}
	if (isDefined(href)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("href")(href))
	}
	if (isDefined(hreflang)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("hreflang")(hreflang),
		)
	}
	if (isDefined(media)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("media")(media))
	}
	if (isDefined(ping)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("ping")(ping))
	}
	if (isDefined(referrerpolicy)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(REFERRER_POLICIES))("referrerpolicy")(
				referrerpolicy,
			),
		)
	}
	if (isDefined(rel)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(RELS_FOR_AREA))("rel")(rel),
		)
	}
	if (isDefined(shape)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(SHAPES))("shape")(shape),
		)
	}
	if (isDefined(target)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(TARGETS))("target")(target),
		)
	}

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
export const Area = (attributes: AreaElementAttributes = {}): ElementConfig => {
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
		tag: "Area",
	}
}

export default Area
