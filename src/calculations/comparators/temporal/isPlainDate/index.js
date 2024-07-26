import { Temporal } from "temporal-polyfill"

import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isPlainDate = op => arg => {
	const operand = composeComparators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	try {
		const _ = Temporal.PlainDate.from(operand.right)
		return operand
	} catch (e) {
		return {
			left: [
				Error(op)("IsPlainDate")(`${operand.right} is not a plain date: ${e}.`),
			],
		}
	}
}

export default isPlainDate
