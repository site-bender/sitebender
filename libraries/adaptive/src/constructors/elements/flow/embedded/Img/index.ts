import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@adaptiveTypes/index.ts"
import type { ImageAriaAttributes } from "@adaptiveSrc/constructors/elements/types/aria/index.ts"
import type { ImageAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@adaptiveSrc/constructors/elements/types/index.ts"

import isDefined from "@toolkit/simple/validation/isDefined/index.ts"
import { getImgAllowedRoles } from "@adaptiveSrc/constructors/elements/constants/aria-roles.ts"
import {
	CROSS_ORIGINS,
	DECODING_HINTS,
	FETCH_PRIORITIES,
	LOADINGS,
	REFERRER_POLICIES,
} from "@adaptiveSrc/constructors/elements/constants/index.ts"
import getId from "@adaptiveSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@adaptiveSrc/guards/filterAttribute/index.ts"
import isBoolean from "@adaptiveSrc/guards/isBoolean/index.ts"
import isInteger from "@adaptiveSrc/guards/isInteger/index.ts"
import isMemberOf from "@adaptiveSrc/guards/isMemberOf/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@adaptiveSrc/guards/pickGlobalAttributes/index.ts"

/**
 * Extended Img attributes including reactive properties and ARIA
 */
export type ImgElementAttributes = ImageAttributes & ImageAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Img element
 * Allows global attributes and validates img-specific attributes
 */
export const filterAttributes = (attributes: ImgElementAttributes) => {
	const {
		id,
		alt,
		crossOrigin,
		decode,
		fetchPriority,
		height,
		isMap,
		loading,
		referrerPolicy,
		sizes,
		src,
		srcSet,
		useMap,
		width,
		// ARIA attributes
		role,
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby,
		"aria-describedby": ariaDescribedby,
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

	// Add image-specific attributes
	if (isDefined(alt)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("alt")(alt))
	}
    if (isDefined(crossOrigin)) {
		Object.assign(
			filteredAttrs,
	    filterAttribute(isMemberOf(CROSS_ORIGINS))("crossOrigin")(crossOrigin),
		)
	}
    if (isDefined(decode)) {
		Object.assign(
			filteredAttrs,
	    filterAttribute(isMemberOf(DECODING_HINTS))("decode")(decode),
		)
	}
    if (isDefined(fetchPriority)) {
		Object.assign(
			filteredAttrs,
	    filterAttribute(isMemberOf(FETCH_PRIORITIES))("fetchPriority")(
		fetchPriority,
			),
		)
	}
	if (isDefined(height)) {
		Object.assign(filteredAttrs, filterAttribute(isInteger)("height")(height))
	}
	if (isDefined(isMap)) {
		Object.assign(filteredAttrs, filterAttribute(isBoolean)("isMap")(isMap))
	}
	if (isDefined(loading)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(LOADINGS))("loading")(loading),
		)
	}
	if (isDefined(referrerPolicy)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(REFERRER_POLICIES))("referrerPolicy")(
				referrerPolicy,
			),
		)
	}
	if (isDefined(sizes)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("sizes")(sizes))
	}
	if (isDefined(src)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("src")(src))
	}
	if (isDefined(srcSet)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("srcSet")(srcSet))
	}
	if (isDefined(useMap)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("useMap")(useMap))
	}
	if (isDefined(width)) {
		Object.assign(filteredAttrs, filterAttribute(isInteger)("width")(width))
	}

	// Add ARIA attributes with proper role validation based on alt attribute
	const allowedRoles = getImgAllowedRoles(alt)
	if (isDefined(role)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(allowedRoles))("role")(role),
		)
	}
	if (isDefined(ariaLabel)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-label")(ariaLabel),
		)
	}
	if (isDefined(ariaLabelledby)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-labelledby")(ariaLabelledby),
		)
	}
	if (isDefined(ariaDescribedby)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-describedby")(ariaDescribedby),
		)
	}
	if (isDefined(ariaHidden)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-hidden")(ariaHidden),
		)
	}

	return filteredAttrs
}

/**
 * Creates an Img element configuration object
 *
 * The img element embeds an image into the document.
 * Images are void elements and cannot have children.
 *
 * @example
 * ```typescript
 * const img = Img({
 *   src: "image.jpg",
 *   alt: "Description of image",
 *   width: 300,
 *   height: 200,
 *   loading: "lazy"
 * })
 * ```
 */
export const Img = (attributes: Partial<ImgElementAttributes> = {}): ElementConfig => {
	const { id, ...attribs } = filterAttributes(attributes as ImgElementAttributes)
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
		children: [], // Img is a void element
		...(isDefined(calculation) ? { calculation } : {}),
		...(isDefined(dataset) ? { dataset } : {}),
		...(isDefined(display) ? { display } : {}),
		...(isDefined(format) ? { format } : {}),
		...(isDefined(scripts) ? { scripts } : {}),
		...(isDefined(stylesheets) ? { stylesheets } : {}),
		...(isDefined(validation) ? { validation } : {}),
		tag: "Img",
	}
}

export default Img
