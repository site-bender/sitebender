import { Temporal } from "temporal-polyfill"

import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isCalendar = op => arg => {
	const operand = composeComparators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	try {
		const _ = Temporal.Calendar.from(operand.right)
		return operand
	} catch (e) {
		return {
			left: [
				Error(op)("IsCalendar")(`${operand.right} is not a calendar: ${e}.`),
			],
		}
	}
}

export default isCalendar