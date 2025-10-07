import { ELEMENTS } from "../../guards/constants/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
type ElementConfig = {
	readonly tag?: string
	readonly attributes?: Record<string, unknown>
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isInteractiveContent = (config: unknown = {}): boolean => {
	if (typeof config !== "object" || config === null || !("tag" in config)) {
		return false
	}

	const element = config as ElementConfig
	const { tag, attributes = {} } = element

	if (!tag || typeof tag !== "string") {
		return false
	}

	// Always interactive elements
	if (ELEMENTS.interactive.includes(tag)) {
		return true
	}

	// Conditionally interactive elements
	switch (tag) {
		case "A":
			// A element is interactive if it has href attribute
			return "href" in attributes

		case "Audio":
		case "Video":
			// Audio/Video elements are interactive if they have controls attribute
			return "controls" in attributes

		case "Input": {
			// Input elements are interactive except for type="hidden"
			const inputType = attributes["type"] as string
			return inputType !== "hidden"
		}

		case "Img":
			// Img element is interactive if it has usemap attribute
			return "usemap" in attributes

		case "Object":
			// Object element is interactive if it has usemap attribute
			return "usemap" in attributes

		default:
			return false
	}
}

export default isInteractiveContent
