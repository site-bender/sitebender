import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const subtract = op => arg => {
	const minuend = composeOperators(op.minuend)(arg)
	const subtrahend = composeOperators(op.subtrahend)(arg)

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
