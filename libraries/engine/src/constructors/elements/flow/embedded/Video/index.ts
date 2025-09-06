import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { ImageAriaAttributes } from "@sitebender/engine/constructors/elements/types/aria/index.ts"
import type { VideoAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/engine/constructors/elements/types/index.ts"

import TextNode from "@sitebender/engine/constructors/elements/TextNode/index.ts"
import ADVANCED_FILTERS from "@sitebender/engine/guards/createAdvancedFilters/index.ts"
import isString from "@sitebender/engine/guards/isString/index.ts"
import isDefined from "@sitebender/engine/utilities/isDefined/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

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
const Video = (attributes: VideoElementAttributes = {}) =>
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
