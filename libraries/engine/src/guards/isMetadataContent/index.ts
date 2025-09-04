import { ELEMENTS } from "@sitebender/engine/guards/constants/index.ts"

/**
 * Configuration object for element validation
 */
type ElementConfig = {
	readonly tag?: string
	readonly attributes?: Record<string, unknown>
}

/**
 * Checks if an element config represents metadata content
 *
 * @param config - Element configuration object
 * @returns true if the element is metadata content
 */
const isMetadataContent = (config: unknown = {}): boolean => {
	if (typeof config !== "object" || config === null || !("tag" in config)) {
		return false
	}

	const element = config as ElementConfig
	const { tag } = element

	if (!tag || typeof tag !== "string") {
		return false
	}

	return ELEMENTS.metadata.includes(tag)
}

export default isMetadataContent
