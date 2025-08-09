import Error from "../../../constructors/Error/index.js"
import isLeft from "../../../utilities/isLeft/index.js"

const subtract =
	({ minuend, subtrahend, ...op }) => async (arg, localValues) => {
		const resolvedMinuend = await minuend(arg, localValues)
		if (isLeft(resolvedMinuend)) return resolvedMinuend

		const resolvedSubtrahend = await subtrahend(arg, localValues)
		if (isLeft(resolvedSubtrahend)) return resolvedSubtrahend

		return { right: resolvedMinuend.right - resolvedSubtrahend.right }
	}

export default subtract
