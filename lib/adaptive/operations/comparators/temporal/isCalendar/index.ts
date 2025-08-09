import { Temporal } from "temporal-polyfill"

import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators/index.js"

const isCalendar = (op) => async (arg, localValues) => {
	const operand = await composeComparators(op.operand)(arg, localValues)

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
