import { Temporal } from "temporal-polyfill"

import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isPlainMonthDay = op => arg => {
	const operand = composeComparators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	try {
		const _ = Temporal.PlainMonthDay.from(operand.right)
		return operand
	} catch (e) {
		return {
			left: [
				Error(op)("IsPlainMonthDay")(
					`${operand.right} is not a plain month-day: ${e}`,
				),
			],
		}
	}
}

export default isPlainMonthDay
