import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const IsSuperset = op => async arg => {
	const operand = await composeComparators(op.operand)(arg)
	const test = await composeComparators(op.test)(arg)

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

		return left.isSupersetOf(right)
			? operand
			: {
					left: [
						Error(op)("IsSuperset")(
							`${JSON.stringify(operand.right)} is a superset of ${JSON.stringify(test.right)}`,
						),
					],
				}
	} catch (e) {
		return {
			left: [Error(op)("IsSuperset")(`Error creating sets: ${e}`)],
		}
	}
}

export default IsSuperset
