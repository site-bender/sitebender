import includes from "@sitebender/toolkit/simple/array/includes/index.ts"

import hasDescendant from "./hasDescendant/index.ts"

/**
 * Phrasing elements from HTML5 spec
 * TODO: Import from rendering/constants when available
 */
const PHRASING_ELEMENTS = [
	"Abbr",
	"Audio",
	"B",
	"Bdi",
	"Bdo",
	"Br",
	"Button",
	"Canvas",
	"Cite",
	"Code",
	"Data",
	"DataList",
	"Dfn",
	"Em",
	"Embed",
	"Fragment",
	"I",
	"Iframe",
	"Img",
	"Input",
	"Kbd",
	"Label",
	"Mark",
	"Math",
	"Meter",
	"NoScript",
	"Object",
	"Output",
	"Picture",
	"Progress",
	"Q",
	"Ruby",
	"S",
	"Samp",
	"Script",
	"Select",
	"Slot",
	"Small",
	"Span",
	"Strong",
	"Sub",
	"Sup",
	"Svg",
	"Template",
	"TextArea",
	"TextNode",
	"Time",
	"U",
	"Var",
	"Video",
	"Wbr",
]

const PHRASING_IF_AREA_DESCENDANT = ["Map"]
const PHRASING_IF_ITEMPROP_ATTRIBUTE = ["Link", "Meta"]
const PHRASING_IF_CONTAINS_PHRASING = ["A", "Del", "Ins", "Map"]

/**
 * Configuration object for element validation
 */
type ElementConfig = {
	readonly tag?: string
	readonly attributes?: Record<string, unknown>
	readonly children?: readonly unknown[]
}

/**
 * Options for phrasing content validation
 */
type PhrasingContentOptions = {
	readonly ancestors?: readonly string[]
}

/**
 * Creates a phrasing content validator function
 *
 * @param options - Validation options (ancestors, etc.)
 * @returns Function that validates if an element config represents phrasing content
 */
const isPhrasingContent =
	(options: PhrasingContentOptions = {}) =>
	(config: ElementConfig = {}): boolean => {
		const { attributes = {}, tag } = config
		const { ancestors = [] } = options

		// Basic phrasing element check
		if (tag && includes(tag)(PHRASING_ELEMENTS)) {
			return true
		}

		// Area element if descendant of Map
		if (
			tag && includes(tag)(PHRASING_IF_AREA_DESCENDANT) &&
			ancestors.at(-1) === "Area"
		) {
			return true
		}

		// Elements with itemprop attribute
		if (
			tag && includes(tag)(PHRASING_IF_ITEMPROP_ATTRIBUTE) &&
			includes("itemprop")(Object.keys(attributes))
		) {
			return true
		}

		// Elements that contain phrasing content
		if (
			tag && includes(tag)(PHRASING_IF_CONTAINS_PHRASING) &&
			config.children &&
			hasDescendant({ tag, attributes, children: config.children })(
				PHRASING_ELEMENTS,
			)
		) {
			return true
		}

		return false
	}

export default isPhrasingContent
