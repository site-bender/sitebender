import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const subtract = op => async (arg, localValues) => {
	const minuend = await composeOperators(op.minuend)(arg, localValues)
	const subtrahend = await composeOperators(op.subtrahend)(arg, localValues)

	if (isLeft(minuend)) {
		minuend.left.push(subtrahend)
		return minuend
	}

	if (isLeft(subtrahend)) {
		return { left: [minuend, ...subtrahend.left] }
	}

	return { right: minuend.right - subtrahend.right }
}

export default subtract
