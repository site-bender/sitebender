import {
	FLOW_ELEMENTS,
	FLOW_IF_ITEMPROP_ATTRIBUTE,
	FLOW_IF_MAP_DESCENDANT,
} from "../../rendering/constants"

const isFlowContent =
	(config = {}) =>
	(options = {}) => {
		const { attributes = {}, tag } = config
		const { ancestors = [] } = options

		if (FLOW_ELEMENTS.includes(tag)) {
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

export default isFlowContent
