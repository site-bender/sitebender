import isDefined from "../../isDefined"
import not from "../../predicates/not.js"

const getFromCheckbox = (input) => {
	if (not(input?.checked)) {
		return false
	}

	if (isDefined(input.value)) {
		if (input.value === "true" || input.value === "yes") {
			return true
		}

		return input.value
	}
}

export default getFromCheckbox
