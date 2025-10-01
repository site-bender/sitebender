import includes from "@sitebender/toolsmith/vanilla/array/includes/index.ts"

import hasDescendant from "./hasDescendant/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
type ElementConfig = {
	readonly tag?: string
	readonly attributes?: Record<string, unknown>
	readonly children?: readonly unknown[]
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
type PhrasingContentOptions = {
	readonly ancestors?: readonly string[]
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
