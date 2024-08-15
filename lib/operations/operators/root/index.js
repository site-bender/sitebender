import Error from "../../../constructors/Error"
import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const root = op => async (arg, localValues) => {
	const radicand = await composeOperators(op.radicand)(arg, localValues)
	const index = await composeOperators(op.index)(arg, localValues)

	if (isLeft(radicand)) {
		radicand.left.push(index)
		return radicand
	}

	if (isLeft(index)) {
		return { left: [radicand, ...index.left] }
	}

	if (index.right === 0) {
		return {
			left: [radicand, Error(op)("Root")("Cannot take the 0th root.")],
		}
	}

	return { right: Math.pow(radicand.right, 1 / index.right) }
}

export default root
