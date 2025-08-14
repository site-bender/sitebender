import type { Value } from "../../../types/index.ts"

import isDefined from "../../isDefined/index.ts"

const getFromCheckbox = (input: HTMLInputElement): Value => {
	if (!input.checked) {
		return false
	}

	if (isDefined(input.value)) {
		if (input.value === "true" || input.value === "yes") {
			return true
		}

		return input.value
	}

	return true
}

export default getFromCheckbox
