import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import not from "../../../../utilities/predicates/not"
import composeComparators from "../../../composers/composeComparators"

const isSet = op => async arg => {
	const operand = await composeComparators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	try {
		const set = new Set(operand.right)

		if (not(set instanceof Set)) {
			return {
				left: [
					Error(op)("IsSet")(`${JSON.stringify(operand.right)} is not a set.`),
				],
			}
		}

		return set.size === [...operand.right].length
			? operand
			: {
					left: [
						Error(op)("IsSet")(
							`${JSON.stringify(operand.right)} has duplicate members (not a set).`,
						),
					],
				}
	} catch (e) {
		return {
			left: [
				Error(op)("IsSet")(
					`Error creating set from ${JSON.stringify(operand.right)}: ${e}.`,
				),
			],
		}
	}
}

export default isSet
