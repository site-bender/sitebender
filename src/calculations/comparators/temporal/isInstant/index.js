import { Temporal } from "temporal-polyfill"

import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isInstant = op => arg => {
	const operand = composeComparators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	try {
		const _ = Temporal.Instant.from(operand.right)
		return operand
	} catch (e) {
		return {
			left: [
				Error(op)("IsInstant")(`${operand.right} is not an instant: ${e}.`),
			],
		}
	}
}

export default isInstant
