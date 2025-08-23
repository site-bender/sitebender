import type { GlobalAttributes } from "../../types/index.ts"

import { ELEMENTS } from "../../guards/constants/index.ts"

/**
 * Configuration object for element validation
 */
type ElementConfig = {
	readonly tag?: string
	readonly attributes?: Record<string, unknown>
}

/**
 * Checks if an element config represents interactive content
 *
 * Interactive content is content that is specifically intended for user interaction.
 * This includes:
 * - Always interactive elements (button, details, embed, iframe, label, select, textarea)
 * - Conditionally interactive elements (a with href, audio/video with controls, input, etc.)
 *
 * @param config - Element configuration object
 * @returns true if the element is interactive content
 */
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

		case "Input":
			// Input elements are interactive except for type="hidden"
			const inputType = attributes["type"] as string
			return inputType !== "hidden"

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
