import { Temporal } from "temporal-polyfill"

import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isPlainTime = op => arg => {
	const operand = composeComparators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	try {
		const _ = Temporal.PlainTime.from(operand.right)
		return operand
	} catch (e) {
		return {
			left: [
				Error(op)("IsPlainTime")(`${operand.right} is not a plain time: ${e}.`),
			],
		}
	}
}

export default isPlainTime
