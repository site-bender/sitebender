import {
	ELEMENTS,
	FLOW_IF_ITEMPROP_ATTRIBUTE,
	FLOW_IF_MAP_DESCENDANT,
} from "../../guards/constants/index.ts"

/**
 * Configuration object for element validation
 */
type ElementConfig = {
	readonly tag?: string
	readonly attributes?: Record<string, unknown>
}

/**
 * Options for flow content validation
 */
type FlowContentOptions = {
	readonly ancestors?: readonly string[]
}

/**
 * Creates a flow content validator function
 *
 * @param options - Validation options (ancestors, etc.)
 * @returns Function that validates if an element config represents flow content
 */
export default function isFlowContent(options: any = {}) {
	return (config: any = {}) => {
		const { attributes = {}, tag } = config
		const { ancestors = [] } = options

		// Check both the tag and its capitalized version for flow content
		if (
			ELEMENTS.flow.includes(tag) ||
			ELEMENTS.flow.includes(tag.charAt(0).toUpperCase() + tag.slice(1))
		) {
			return true
		}

		if (FLOW_IF_MAP_DESCENDANT.includes(tag) && ancestors.at(-1) === "Map") {
			return true
		}

		if (
			FLOW_IF_ITEMPROP_ATTRIBUTE.includes(tag) &&
			Object.keys(attributes).includes("itemprop")
		) {
			return true
		}

		return false
	}
}
