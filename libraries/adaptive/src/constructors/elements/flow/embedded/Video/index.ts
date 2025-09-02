import type { ImageAriaAttributes } from "@adaptiveSrc/constructors/elements/types/aria/index.ts"
import type { VideoAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@adaptiveSrc/constructors/elements/types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@adaptiveTypes/index.ts"

import {
	CROSS_ORIGINS,
	PRELOADS,
} from "@adaptiveSrc/constructors/elements/constants/index.ts"
import TextNode from "@adaptiveSrc/constructors/elements/TextNode/index.ts"
import getId from "@adaptiveSrc/constructors/helpers/getId/index.ts"
import { ADVANCED_FILTERS } from "@adaptiveSrc/guards/createAdvancedFilters/index.ts"
import filterAttribute from "@adaptiveSrc/guards/filterAttribute/index.ts"
import isBoolean from "@adaptiveSrc/guards/isBoolean/index.ts"
import isInteger from "@adaptiveSrc/guards/isInteger/index.ts"
import isMemberOf from "@adaptiveSrc/guards/isMemberOf/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@adaptiveSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

/**
 * Extended Video attributes including reactive properties and ARIA
 */
export type VideoElementAttributes = VideoAttributes & ImageAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Video element
 * Allows global attributes and validates video-specific attributes
 */
export const filterAttributes = (attributes: VideoElementAttributes) => {
	const {
		id,
		autoplay,
		controls,
		crossOrigin,
		height,
		loop,
		muted,
		playsInline,
		poster,
		preload,
		src,
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

	// Add video-specific attributes
	if (isDefined(autoplay)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("autoplay")(autoplay),
		)
	}
	if (isDefined(controls)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("controls")(controls),
		)
	}
	if (isDefined(crossOrigin)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(CROSS_ORIGINS))("crossorigin")(crossOrigin),
		)
	}
	if (isDefined(height)) {
		Object.assign(filteredAttrs, filterAttribute(isInteger)("height")(height))
	}
	if (isDefined(loop)) {
		Object.assign(filteredAttrs, filterAttribute(isBoolean)("loop")(loop))
	}
	if (isDefined(muted)) {
		Object.assign(filteredAttrs, filterAttribute(isBoolean)("muted")(muted))
	}
	if (isDefined(playsInline)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("playsinline")(playsInline),
		)
	}
	if (isDefined(poster)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("poster")(poster))
	}
	if (isDefined(preload)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(PRELOADS))("preload")(preload),
		)
	}
	if (isDefined(src)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("src")(src))
	}
	if (isDefined(width)) {
		Object.assign(filteredAttrs, filterAttribute(isInteger)("width")(width))
	}

	// Add ARIA attributes
	if (isDefined(role)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("role")(role))
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
 * Creates a Video element configuration object
 *
 * The video element is used to embed video content in a document.
 *
 * @example
 * ```typescript
 * const video = Video({
 *   src: "movie.mp4",
 *   controls: true,
 *   width: 640,
 *   height: 480,
 *   poster: "poster.jpg"
 * })([
 *   TextNode("Your browser does not support the video tag.")
 * ])
 * ```
 */
export const Video = (attributes: VideoElementAttributes = {}) =>
(
	children: Array<ElementConfig> | ElementConfig | string = [],
): ElementConfig => {
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

	// Convert string children to TextNode and filter children
	const kids = isString(children)
		? [TextNode(children)]
		: Array.isArray(children)
		? children.filter(ADVANCED_FILTERS.audioContent)
		: ADVANCED_FILTERS.audioContent(children)
		? [children]
		: []

	return {
		attributes: {
			id,
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
		tag: "Video",
	}
}

export default Video
