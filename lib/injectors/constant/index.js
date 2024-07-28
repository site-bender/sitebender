import Error from "../../constructors/Error"
import isNumber from "../../utilities/isNumber"
import isUndefined from "../../utilities/isUndefined"

const constant =
	(op = {}) =>
	() => {
		const { datatype, value } = op

		if (datatype === "Number" || datatype === "Int") {
			const num = isNumber(value) ? parseFloat(String(value)) : NaN

			return isUndefined(num) || Number.isNaN(num)
				? {
						left: [Error(op)("Constant")("Value is not a number.")],
					}
				: {
						right: num,
					}
		}

		if (value == null) {
			return [Error(op)("Constant")("Value is missing.")]
		}

		return { right: value }
	}

export default constant
