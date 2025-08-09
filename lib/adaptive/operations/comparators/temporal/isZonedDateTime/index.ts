import { Temporal } from "temporal-polyfill"

import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators/index.js"

const isZonedDateTime = (op) => async (arg, localValues) => {
	const operand = await composeComparators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	try {
		const _ = Temporal.ZonedDateTime.from(operand.right)
		return operand
	} catch (e) {
		return {
			left: [
				Error(op)("IsZonedDateTime")(
					`${operand.right} is not a zoned date-time: ${e}`,
				),
			],
		}
	}
}

export default isZonedDateTime
