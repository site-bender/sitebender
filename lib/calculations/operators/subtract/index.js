import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const subtract = op => async arg => {
	const minuend = await composeOperators(op.minuend)(arg)
	const subtrahend = await composeOperators(op.subtrahend)(arg)

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
