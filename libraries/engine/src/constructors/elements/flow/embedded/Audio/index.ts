import type { ImageAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { AudioAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"

import {
	CROSS_ORIGINS,
	PRELOADS,
} from "@engineSrc/constructors/elements/constants/index.ts"
import TextNode from "@engineSrc/constructors/elements/TextNode/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import ADVANCED_FILTERS from "@engineSrc/guards/createAdvancedFilters/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@engineSrc/utilities/isDefined/index.ts"
import filterAttributes from "./filterAttributes/index.ts"

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
const Audio = (attributes: AudioElementAttributes = {}) =>
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
