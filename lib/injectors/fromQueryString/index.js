import Error from "../../constructors/Error"
import castValue from "../../utilities/castValue"
import isDefined from "../../utilities/isDefined"
import isUndefined from "../../utilities/isUndefined"

const fromQueryString =
	(op = {}) =>
	() => {
		const { datatype, key } = op
		const value = new URLSearchParams(window.location.search).get(key)

		if (isUndefined(value)) {
			return Error(op)("FromQueryString")(
				`Unable to find key "${key}" in URL search string.`,
			)
		}

		const casted = castValue(datatype)(value)

		return isDefined(casted.right)
			? casted
			: Error(op)("FromQueryString")(casted.left)
	}

export default fromQueryString
