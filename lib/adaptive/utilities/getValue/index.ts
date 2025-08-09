import Error from "../../constructors/Error"
import getSelector from "../getSelector"
import isDefined from "../isDefined"
import isUndefined from "../isUndefined"
import not from "../predicates/not.js"
import getFromCheckbox from "./getFromCheckbox"
import getFromDataset from "./getFromDataset"
import getFromInnerHtml from "./getFromInnerHtml"
import getFromInput from "./getFromInput"
import getFromLocal from "./getFromLocal"
import getFromSelect from "./getFromSelect"
import getFromTextArea from "./getFromTextArea"

const getValue = (op) => (localValues) => {
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

	const local = getFromLocal(op)(localValues)

	if (isDefined(local)) {
		return local
	}

	if (isDefined(document)) {
		const element = document.querySelector(selector)

		if (isUndefined(element)) {
			return {
				left: [Error(op)(op.tag)(`Element at \`${selector}\` not found.`)],
			}
		}

		switch (element.tagName.toLocaleLowerCase()) {
			case "input":
				return element.type === "checkbox"
					? { right: getFromCheckbox(element) }
					: { right: getFromInput(element) }
			case "table":
				return { right: getFromDataset(element) }
			case "select":
				return { right: getFromSelect(element) }
			case "textarea":
				return { right: getFromTextArea(element) }
			case "data":
				return { right: getFromInput(element) }
			default:
				return element.dataset?.value
					? { right: getFromDataset(element) }
					: { right: getFromInnerHtml(element) }
		}
	}

	return {
		left: [Error(op)(op.tag)(`Cannot find window.document.`)],
	}
}

export default getValue
