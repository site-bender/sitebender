import Error from "../../constructors/Error"
import isNumber from "../../utilities/isNumber"
import isUndefined from "../../utilities/isUndefined"

const fromArgument =
	(operation = {}) =>
	async arg => {
		const { datatype } = operation

		if (datatype === "Number" || datatype === "Integer") {
			const num = isNumber(arg) ? parseFloat(String(arg)) : NaN

			return isUndefined(num) || Number.isNaN(num)
				? {
						left: [Error(operation)("FromArgument")("Value is not a number.")],
					}
				: {
						right: num,
					}
		}

		if (arg == null) {
			return {
				left: [Error(operation)("FromArgument")("Argument is missing.")],
			}
		}

		return { right: arg }
	}

export default fromArgument
