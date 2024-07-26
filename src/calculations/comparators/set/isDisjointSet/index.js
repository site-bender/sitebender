import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const IsDisjointSet = op => arg => {
	const operand = composeComparators(op.operand)(arg)
	const test = composeComparators(op.test)(arg)

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
