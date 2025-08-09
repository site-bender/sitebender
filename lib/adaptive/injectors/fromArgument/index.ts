import Error from "../../constructors/Error"
import isNumber from "../../utilities/isNumber"
import isUndefined from "../../utilities/isUndefined.js"

const fromArgument = (operation = {}) => async (arg, localValues) => {
	const { datatype } = operation

	if (arg == null) {
		return {
			left: [Error(operation)("FromArgument")("Argument is missing.")],
		}
	}

	if (datatype === "Number" || datatype === "Integer") {
		const num = isNumber(arg, localValues)
			? parseFloat(String(arg, localValues))
			: NaN

		return isUndefined(num) || Number.isNaN(num)
			? {
				left: [Error(operation)("FromArgument")("Value is not a number.")],
			}
			: {
				right: num,
			}
	}

	return { right: arg }
}

export default fromArgument
