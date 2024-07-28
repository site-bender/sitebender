import {
	INTERACTIVE_ELEMENTS,
	INTERACTIVE_IF_CONTROLS_ATTRIBUTE,
	INTERACTIVE_IF_HREF_ATTRIBUTE,
	INTERACTIVE_IF_TYPE_ATTRIBUTE_NOT_HIDDEN_STATE,
	INTERACTIVE_IF_USEMAP_ATTRIBUTE,
} from "../../rendering/constants"
import not from "../../utilities/predicates/not"

const isInteractiveContent = (config = {}) => {
	const { attributes = {}, tag } = config

	if (INTERACTIVE_ELEMENTS.includes(tag)) {
		return true
	}

	if (
		INTERACTIVE_IF_HREF_ATTRIBUTE.includes(tag) &&
		Object.keys(attributes).includes("href")
	) {
		return true
	}

	if (
		INTERACTIVE_IF_CONTROLS_ATTRIBUTE.includes(tag) &&
		Object.keys(attributes).includes("controls")
	) {
		return true
	}

	if (
		INTERACTIVE_IF_USEMAP_ATTRIBUTE.includes(tag) &&
		Object.keys(attributes).includes("usemap")
	) {
		return true
	}

	if (
		INTERACTIVE_IF_TYPE_ATTRIBUTE_NOT_HIDDEN_STATE.includes(tag) &&
		Object.keys(attributes).includes("type") &&
		not(Object.keys(attributes).includes("hidden"))
	) {
		return true
	}

	return false
}

export default isInteractiveContent
