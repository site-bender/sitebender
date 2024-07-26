import Error from "../../constructors/Error"
import isUndefined from "../isUndefined"
import not from "../predicates/not"
import getFromCheckbox from "./getFromCheckbox"
import getFromInnerHtml from "./getFromInnerHtml"
import getFromInput from "./getFromInput"
import getFromSelect from "./getFromSelect"
import getFromTextArea from "./getFromTextArea"
import getSelector from "./getSelector"

const getValue = op => () => {
	const selector = getSelector(op.source)

	if (not(selector)) {
		return {
			left: [
				Error(op)(op.tag)(
					"Must provide a selector by which to select element.",
				),
			],
		}
	}

	const element = document.querySelector(selector)

	if (isUndefined(element)) {
		return {
			left: [Error(op)(op.tag)(`Element at \`${selector}\` not found.`)],
		}
	}

	switch (element.tagName.toLocaleLowerCase()) {
		case "input":
			return element.type === "checkbox"
				? { right: getFromCheckbox(element)() }
				: { right: getFromInput(element)() }
		case "select":
			return { right: getFromSelect(element)() }
		case "textarea":
			return { right: getFromTextArea(element)() }
		case "data":
			return { right: getFromInput(element)() }
		default:
			return { right: getFromInnerHtml(element)() }
	}
}

export default getValue
