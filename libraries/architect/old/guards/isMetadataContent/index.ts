import { ELEMENTS } from "@sitebender/architect/guards/constants/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
type ElementConfig = {
	readonly tag?: string
	readonly attributes?: Record<string, unknown>
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
