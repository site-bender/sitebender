import { Temporal } from "temporal-polyfill"

import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isTimeZone = op => arg => {
	const operand = composeComparators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	try {
		const _ = Temporal.TimeZone.from(operand.right)
		return operand
	} catch (e) {
		return {
			left: [
				Error(op)("IsTimeZone")(`${operand.right} is not a time zone: ${e}.`),
			],
		}
	}
}

export default isTimeZone
