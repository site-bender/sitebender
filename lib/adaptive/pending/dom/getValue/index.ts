import type { ElementConfig, GlobalAttributes } from "../../types/index.ts"

import Error from "../../constructors/Error/index.ts"
import getSelector from "../getSelector/index.ts"
import isDefined from "../isDefined/index.ts"
import isUndefined from "../isUndefined/index.ts"
import not from "../predicates/not/index.ts"
import getFromCheckbox from "./getFromCheckbox/index.ts"
import getFromDataset from "./getFromDataset/index.ts"
import getFromInnerHtml from "./getFromInnerHtml/index.ts"
import getFromInput from "./getFromInput/index.ts"
import getFromLocal from "./getFromLocal/index.ts"
import getFromSelect from "./getFromSelect/index.ts"
import getFromTextArea from "./getFromTextArea/index.ts"

/**
 * Retrieves a value from a DOM element based on element configuration
 * 
 * @param op - Element configuration containing selector information
 * @returns Function that takes local values and returns either an error or the element value
 * @example
 * ```typescript
 * getValue({ id: "myInput" })()
 * getValue({ name: "fieldName", tag: "input" })(localValues)
 * ```
 */
const getValue = (op: ElementConfig) => (localValues?: GlobalAttributes) => {
	const selector = getSelector(op)

	if (not(selector)) {
		return {
			left: [Error(op)(op.tag)(`Invalid selector.`)],
		}
	}

	const local = getFromLocal(op)(localValues)

	if (isDefined(local)) {
		return local
	}

	if (typeof globalThis !== 'undefined' && globalThis.document) {
		const element = globalThis.document.querySelector(selector)

		if (isUndefined(element)) {
			return {
				left: [Error(op)(op.tag)(`Element at \`${selector}\` not found.`)],
			}
		}

		switch (element.tagName.toLocaleLowerCase()) {
			case "input":
				const inputElement = element as HTMLInputElement
				const inputType = inputElement.type || element.getAttribute('type')
				return inputType === "checkbox"
					? { right: getFromCheckbox(element) }
					: { right: getFromInput(element) }
			case "table":
				return { right: getFromDataset(element) }
			case "select":
				return { right: getFromSelect(element) }
			case "textarea":
				return { right: getFromTextArea(element) }
			case "data":
				// data element uses value attribute, not data-value
				const dataValue = element.getAttribute('value')
				return { right: dataValue || getFromInnerHtml(element) }
			default:
				const htmlElement = element as HTMLElement
				const hasDataValue = element.getAttribute('data-value') || 
					(htmlElement.dataset ? htmlElement.dataset.value : undefined)
				return hasDataValue
					? { right: getFromDataset(element) }
					: { right: getFromInnerHtml(element) }
		}
	}

	return {
		left: [Error(op)(op.tag)(`Cannot find window.document.`)],
	}
}

export default getValue
