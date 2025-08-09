import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators/index.js"

const matches = (op) => async (arg, localValues) => {
	const operand = await composeComparators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	try {
		const pattern = new RegExp(op.pattern, op.flags)

		return pattern.test(operand.right) ? { right: true } : {
			left: [
				Error(op)("Matches")(`${operand.right} does not match ${pattern}.`),
			],
		}
	} catch (e) {
		return { left: Error(op)("Matches")(`Bad regular expression: ${e}.`) }
	}
}

export default matches
