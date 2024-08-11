import Error from "../../constructors/Error"
import isDefined from "../isDefined"
import isUndefined from "../isUndefined"
import not from "../predicates/not"
import getFromCheckbox from "./getFromCheckbox"
import getFromInnerHtml from "./getFromInnerHtml"
import getFromInput from "./getFromInput"
import getFromLookupTable from "./getFromLookupTable"
import getFromSelect from "./getFromSelect"
import getFromTextArea from "./getFromTextArea"
import getSelector from "./getSelector"

const getValue = op => {
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

	if (isDefined(globalThis._sitebender_)) {
		const { id, local, name } = op.source
		const key = local || id || name

		const right = globalThis._sitebender_[key]

		console.log(`Got ${key} from _sitebender_ as ${right}.`)

		if (isUndefined(right)) {
			return {
				left: [Error(op)(op.tag)(`Element at key \`${key}\` not found.`)],
			}
		}

		return { right }
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
				return { right: getFromLookupTable(element) }
			case "select":
				return { right: getFromSelect(element) }
			case "textarea":
				return { right: getFromTextArea(element) }
			case "data":
				return { right: getFromInput(element) }
			default:
				return { right: getFromInnerHtml(element) }
		}
	}

	return {
		left: [Error(op)(op.tag)(`Cannot get value at \`${selector}\`.`)],
	}
}

export default getValue
