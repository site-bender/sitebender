import Error from "../../../constructors/Error/index.js"
import isLeft from "../../../utilities/isLeft/index.js"
import { MULTIPLICATION_IDENTITY } from "../../constants.js"

const multiply = ({ multipliers, ...op }) => async (arg, localValues) => {
	const resolvedMultipliers = await Promise.all(
		multipliers.map((multiplier) => multiplier(arg, localValues)),
	)
	const errors = resolvedMultipliers.filter(isLeft)

	if (errors.length) {
		return {
			left: [
				Error(op)("Multiply")("Could not resolve all multipliers."),
				...errors,
			],
		}
	}

	const total = resolvedMultipliers.reduce(
		(acc, { right: value }) => acc * value,
		MULTIPLICATION_IDENTITY,
	)

	return { right: total }
}

export default multiply
