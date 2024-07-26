import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const power = op => arg => {
	const base = composeOperators(op.base)(arg)
	const exponent = composeOperators(op.exponent)(arg)

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
