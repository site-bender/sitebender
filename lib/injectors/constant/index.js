import Error from "../../constructors/Error"
import isNumber from "../../utilities/isNumber"
import isUndefined from "../../utilities/isUndefined"

const constant =
	(operation = {}) =>
	async () => {
		const { datatype, value } = operation

		if (value == null) {
			return { left: [Error(operation)("Constant")("Value is missing.")] }
		}

		if (datatype === "Number" || datatype === "Integer") {
			const num = isNumber(value) ? parseFloat(String(value)) : NaN

			return isUndefined(num) || Number.isNaN(num)
				? {
						left: [Error(operation)("Constant")("Value is not a number.")],
					}
				: {
						right: num,
					}
		}

		if (datatype === "String" && typeof value !== "string") {
			return {
				left: [Error(operation)("Constant")("Value is not a string.")],
			}
		}

		return { right: value }
	}

export default constant
