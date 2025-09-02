import not from "@toolkit/simple/logic/not/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"
import isUndefined from "@toolkit/simple/validation/isUndefined/index.ts"

import type { ElementConfig } from "../../../constructors/elements/types/index.ts"

import Error from "../../../constructors/Error/index.ts"
import getSelector from "../getSelector/index.ts"
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
const getValue =
	(op: ElementConfig) => (localValues?: Record<string, unknown>) => {
		const selector = getSelector(
			op as unknown as { id?: string; name?: string; tag?: string },
		)

		if (not(selector)) {
			return {
				left: [Error(op.tag)(op.tag)(`Invalid selector.`)],
			}
		}

		const local = getFromLocal(
			op as unknown as import("./getFromLocal/index.ts").SelectorOp,
		)(localValues)

		if (isDefined(local)) {
			return local
		}

		if (typeof globalThis !== "undefined" && globalThis.document && selector) {
			const element = globalThis.document.querySelector(selector)

			if (isUndefined(element) || element === null) {
				return {
					left: [
						Error(op.tag)(op.tag)(`Element at \`${selector}\` not found.`),
					],
				}
			}

			switch (element.tagName.toLocaleLowerCase()) {
				case "input": {
					const inputElement = element as HTMLInputElement
					const inputType = inputElement.type || element.getAttribute("type")
					return inputType === "checkbox"
						? { right: getFromCheckbox(element) }
						: { right: getFromInput(element) }
				}
				case "table": {
					return { right: getFromDataset(element) }
				}
				case "select": {
					return { right: getFromSelect(element) }
				}
				case "textarea": {
					return { right: getFromTextArea(element) }
				}
				case "data": {
					// data element uses value attribute, not data-value
					const dataValue = element.getAttribute("value")
					return { right: dataValue || getFromInnerHtml(element) }
				}
				default: {
					const htmlElement = element as HTMLElement
					const hasDataValue = element.getAttribute("data-value") ||
						(htmlElement.dataset ? htmlElement.dataset.value : undefined)
					return hasDataValue
						? { right: getFromDataset(element) }
						: { right: getFromInnerHtml(element) }
				}
			}
		}

		return {
			left: [Error(op.tag)(op.tag)(`Cannot find window.document.`)],
		}
	}

export default getValue
