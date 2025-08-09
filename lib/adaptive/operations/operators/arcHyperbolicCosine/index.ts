import Error from "../../../constructors/Error/index.js"
import isLeft from "../../../utilities/isLeft/index.js"

const arcHyperbolicCosine =
	({ operand, ...op }) => async (arg, localValues) => {
		const resolvedOperand = await operand(arg, localValues)

		if (isLeft(resolvedOperand)) {
			return resolvedOperand
		}

		return { right: Math.acosh(resolvedOperand.right) }
	}

export default arcHyperbolicCosine
