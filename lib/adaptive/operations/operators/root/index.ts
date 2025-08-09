import Error from "../../../constructors/Error/index.js"
import isLeft from "../../../utilities/isLeft/index.js"

const root = ({ radicand, degree, ...op }) => async (arg, localValues) => {
	const resolvedRadicand = await radicand(arg, localValues)
	if (isLeft(resolvedRadicand)) return resolvedRadicand

	const resolvedDegree = await degree(arg, localValues)
	if (isLeft(resolvedDegree)) return resolvedDegree

	if (resolvedDegree.right === 0) {
		return {
			left: [Error(op)("Root")("The degree of a root cannot be zero.")],
		}
	}

	return {
		right: Math.sign(resolvedRadicand.right) *
			Math.pow(Math.abs(resolvedRadicand.right), 1 / resolvedDegree.right),
	}
}

export default root
