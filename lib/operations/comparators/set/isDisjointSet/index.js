import Set from "core-js-pure/actual/set"

import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const IsDisjointSet = op => async (arg, localValues) => {
	const operand = await composeComparators(op.operand)(arg, localValues)
	const test = await composeComparators(op.test)(arg, localValues)

	if (isLeft(operand)) {
		operand.left.push(test)
		return operand
	}

	if (isLeft(test)) {
		return { left: [operand, ...test.left] }
	}

	try {
		const left = new Set(operand.right)
		const right = new Set(test.right)

		return left.isDisjointFrom(right)
			? operand
			: {
					left: [
						Error(op)("IsDisjointSet")(
							`${JSON.stringify(operand.right)} is not disjoint from ${JSON.stringify(test.right)}`,
						),
					],
				}
	} catch (e) {
		return {
			left: [Error(op)("IsDisjointSet")(`Error creating sets: ${e}`)],
		}
	}
}

export default IsDisjointSet
