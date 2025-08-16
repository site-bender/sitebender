import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "../../../../../types/index.ts"
import type { ImageAriaAttributes } from "../../../types/aria/index.ts"
import type { AudioAttributes } from "../../../types/attributes/index.ts"
import type { ElementConfig } from "../../../types/index.ts"

import isDefined from "../../../../../../utilities/isDefined/index.ts"
import {
	CROSS_ORIGINS,
	PRELOADS,
} from "../../../../../constructors/elements/constants/index.ts"
import TextNode from "../../../../../constructors/elements/TextNode/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import { ADVANCED_FILTERS } from "../../../../../guards/createAdvancedFilters/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Audio element
 * Allows global attributes and validates audio-specific attributes
 */

/**
 * Extended Audio attributes including reactive properties and ARIA
 */
export type AudioElementAttributes = AudioAttributes & ImageAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Audio element
 * Allows global attributes and validates audio-specific attributes
 */
export const filterAttributes = (attributes: AudioElementAttributes) => {
	const {
		id,
		autoplay,
		controls,
		crossorigin,
		loop,
		muted,
		preload,
		src,
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

	// Add audio-specific attributes
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
	if (isDefined(crossorigin)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(CROSS_ORIGINS))("crossorigin")(crossorigin),
		)
	}
	if (isDefined(loop)) {
		Object.assign(filteredAttrs, filterAttribute(isBoolean)("loop")(loop))
	}
	if (isDefined(muted)) {
		Object.assign(filteredAttrs, filterAttribute(isBoolean)("muted")(muted))
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
 * Creates an Audio element configuration object
 *
 * The audio element represents a sound or audio stream.
 *
 * @example
 * ```typescript
 * const audio = Audio({
 *   src: "audio.mp3",
 *   controls: true,
 *   preload: "metadata"
 * })([
 *   TextNode("Your browser does not support the audio element.")
 * ])
 * ```
 */
export const Audio = (attributes: AudioElementAttributes = {}) =>
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
		tag: "Audio",
	}
}

export default Audio
