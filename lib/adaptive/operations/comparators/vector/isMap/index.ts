import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators/index.js"

const isMap = (op) => async (arg, localValues) => {
	const operand = await composeComparators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	try {
		new Map(operand.right)

		return operand
	} catch (e) {
		return {
			left: [
				Error(op)("IsMap")(
					`Error creating map from ${JSON.stringify(operand.right)}: ${e}.`,
				),
			],
		}
	}
}

export default isMap
