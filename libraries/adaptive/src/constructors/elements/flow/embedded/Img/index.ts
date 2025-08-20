import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "../../../../../types/index.ts"
import type { ImageAriaAttributes } from "../../../types/aria/index.ts"
import type { ImageAttributes } from "../../../types/attributes/index.ts"
import type { ElementConfig } from "../../../types/index.ts"

import isDefined from "../../../../../../utilities/isDefined/index.ts"
import { getImgAllowedRoles } from "../../../../../constructors/elements/constants/aria-roles.ts"
import {
	CROSS_ORIGINS,
	DECODING_HINTS,
	FETCH_PRIORITIES,
	LOADINGS,
	REFERRER_POLICIES,
} from "../../../../../constructors/elements/constants/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isInteger from "../../../../../guards/isInteger/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

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
		crossorigin,
		decoding,
		fetchpriority,
		height,
		ismap,
		loading,
		longdesc,
		referrerpolicy,
		sizes,
		src,
		srcset,
		usemap,
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
	if (isDefined(crossorigin)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(CROSS_ORIGINS))("crossorigin")(crossorigin),
		)
	}
	if (isDefined(decoding)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(DECODING_HINTS))("decoding")(decoding),
		)
	}
	if (isDefined(fetchpriority)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(FETCH_PRIORITIES))("fetchpriority")(
				fetchpriority,
			),
		)
	}
	if (isDefined(height)) {
		Object.assign(filteredAttrs, filterAttribute(isInteger)("height")(height))
	}
	if (isDefined(ismap)) {
		Object.assign(filteredAttrs, filterAttribute(isBoolean)("ismap")(ismap))
	}
	if (isDefined(loading)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(LOADINGS))("loading")(loading),
		)
	}
	if (isDefined(longdesc)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("longdesc")(longdesc),
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
	if (isDefined(sizes)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("sizes")(sizes))
	}
	if (isDefined(src)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("src")(src))
	}
	if (isDefined(srcset)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("srcset")(srcset))
	}
	if (isDefined(usemap)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("usemap")(usemap))
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
export const Img = (attributes: ImgElementAttributes = {}): ElementConfig => {
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
