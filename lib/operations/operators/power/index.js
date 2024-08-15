import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const power = op => async (arg, localValues) => {
	const base = await composeOperators(op.base)(arg, localValues)
	const exponent = await composeOperators(op.exponent)(arg, localValues)

	if (isLeft(base)) {
		base.left.push(exponent)
		return base
	}

	if (isLeft(exponent)) {
		return { left: [base, ...exponent.left] }
	}

	return { right: Math.pow(base.right, exponent.right) }
}

export default power
