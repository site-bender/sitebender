import type { Value } from "../../../../../types/index.ts"

import isDefined from "../../../../../../toolkit/src/simple/validation/isDefined/index.ts"

const getFromCheckbox = (input: HTMLInputElement | Element): Value => {
	// For deno-dom, check for checked attribute
	const isChecked = "checked" in input
		? (input as HTMLInputElement).checked
		: (input as Element).hasAttribute("checked")

	if (!isChecked) {
		return ""
	}

	// Get value from attribute or property
	const value = "value" in input
		? (input as HTMLInputElement).value
		: (input as Element).getAttribute("value")

	if (isDefined(value) && value !== "on") {
		return value
	}

	return "on"
}

export default getFromCheckbox
