import { Temporal } from "temporal-polyfill"

import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isPlainYearMonth = op => arg => {
	const operand = composeComparators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	try {
		const _ = Temporal.PlainYearMonth.from(operand.right)
		return operand
	} catch (e) {
		return {
			left: [
				Error(op)("IsPlainYearMonth")(
					`${operand.right} is not a plain year-month: ${e}.`,
				),
			],
		}
	}
}

export default isPlainYearMonth
