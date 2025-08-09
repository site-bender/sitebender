import Error from "../../../constructors/Error/index.js"
import isLeft from "../../../utilities/isLeft/index.js"

const arcHyperbolicTangent =
	({ operand, ...op }) => async (arg, localValues) => {
		const resolvedOperand = await operand(arg, localValues)

		if (isLeft(resolvedOperand)) {
			return resolvedOperand
		}

		return { right: Math.atanh(resolvedOperand.right) }
	}

export default arcHyperbolicTangent
