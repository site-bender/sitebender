import { Temporal } from "temporal-polyfill"

import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isDuration = op => async arg => {
	const operand = await composeComparators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	try {
		const _ = Temporal.Duration.from(operand.right)
		return operand
	} catch (e) {
		return {
			left: [
				Error(op)("IsDuration")(`${operand.right} is not a duration: ${e}.`),
			],
		}
	}
}

export default isDuration