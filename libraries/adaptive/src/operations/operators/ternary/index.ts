import { isLeft } from "../../../../types/index.ts"

const ternary =
	({ condition, ifTrue, ifFalse }) => async (arg, localValues) => {
		const resolvedCondition = await condition(arg, localValues)

		if (isLeft(resolvedCondition)) {
			return resolvedCondition
		}

		return resolvedCondition.right
			? await ifTrue(arg, localValues)
			: await ifFalse(arg, localValues)
	}

export default ternary
