import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators/index.js"

const doesNotMatch = (op) => async (arg, localValues) => {
	const operand = await composeComparators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	try {
		const pattern = new RegExp(op.pattern, op.flags)

		return pattern.test(operand.right)
			? {
				left: [
					Error(op)("DoesNotMatch")(`${operand.right} matches ${pattern}.`),
				],
			}
			: { right: true }
	} catch (e) {
		return { left: Error(op)("DoesNotMatch")(`Bad regular expression: ${e}.`) }
	}
}

export default doesNotMatch
