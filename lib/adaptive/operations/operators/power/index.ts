import isLeft from "../../../utilities/isLeft/index.js"

const power = ({ base, exponent, ...op }) => async (arg, localValues) => {
	const resolvedBase = await base(arg, localValues)
	if (isLeft(resolvedBase)) return resolvedBase

	const resolvedExponent = await exponent(arg, localValues)
	if (isLeft(resolvedExponent)) return resolvedExponent

	return { right: Math.pow(resolvedBase.right, resolvedExponent.right) }
}

export default power
