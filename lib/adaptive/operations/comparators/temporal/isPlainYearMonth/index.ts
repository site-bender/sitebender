import { Temporal } from "temporal-polyfill"

import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators/index.js"

const isPlainYearMonth = (op) => async (arg, localValues) => {
	const operand = await composeComparators(op.operand)(arg, localValues)

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
