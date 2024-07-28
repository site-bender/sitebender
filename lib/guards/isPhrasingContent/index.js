import {
	PHRASING_ELEMENTS,
	PHRASING_IF_AREA_DESCENDANT,
	PHRASING_IF_CONTAINS_PHRASING,
	PHRASING_IF_ITEMPROP_ATTRIBUTE,
} from "../../rendering/constants"
import hasDescendant from "./hasDescendant"

const isPhrasingContent =
	(config = {}) =>
	(options = {}) => {
		const { attributes = {}, tag } = config
		const { ancestors = [] } = options

		if (PHRASING_ELEMENTS.includes(tag)) {
			return true
		}

		if (
			PHRASING_IF_AREA_DESCENDANT.includes(tag) &&
			ancestors.at(-1) === "Area"
		) {
			return true
		}

		if (
			PHRASING_IF_ITEMPROP_ATTRIBUTE.includes(tag) &&
			Object.keys(attributes).includes("itemprop")
		) {
			return true
		}

		if (
			PHRASING_IF_CONTAINS_PHRASING.includes(tag) &&
			hasDescendant(config)(PHRASING_ELEMENTS)
		) {
			return true
		}

		return false
	}

export default isPhrasingContent
