import Error from "../../constructors/Error"
import isNumber from "../../utilities/isNumber"
import isUndefined from "../../utilities/isUndefined"

const fromArgument = op => value => {
	const { datatype } = op

	if (datatype === "Number" || datatype === "Int") {
		const num = isNumber(value) ? parseFloat(String(value)) : NaN

		return isUndefined(num) || Number.isNaN(num)
			? {
					left: [Error(op)("FromArgument")("Value is not a number.")],
				}
			: {
					right: num,
				}
	}

	if (value == null) {
		return {
			left: [Error(op)("FromArgument")("Argument is missing.")],
		}
	}

	return { right: value }
}

export default fromArgument
