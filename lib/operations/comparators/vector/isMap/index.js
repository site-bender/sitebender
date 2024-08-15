import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isMap = op => async (arg, localValues) => {
	const operand = await composeComparators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	try {
		const map = new Map(operand.right)

		return map instanceof Map
			? operand
			: {
					left: [
						Error(op)("IsMap")(
							`${JSON.stringify(operand.right)} is not a map.`,
						),
					],
				}
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
