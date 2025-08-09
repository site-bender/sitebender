import Error from "../../../constructors/Error/index.js"
import isLeft from "../../../utilities/isLeft/index.js"
import { ADDITION_IDENTITY } from "../../constants.js"

const add = ({ addends, ...op }) => async (arg, localValues) => {
	const resolvedAddends = await Promise.all(
		addends.map((addend) => addend(arg, localValues)),
	)
	const errors = resolvedAddends.filter(isLeft)

	if (errors.length) {
		return {
			left: [Error(op)("Add")("Could not resolve all addends."), ...errors],
		}
	}

	const total = resolvedAddends.reduce(
		(acc, { right: value }) => acc + value,
		ADDITION_IDENTITY,
	)

	return { right: total }
}

export default add
