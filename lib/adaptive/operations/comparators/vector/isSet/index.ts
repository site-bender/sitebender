import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators/index.js"

const isSet = (op) => async (arg, localValues) => {
	const operand = await composeComparators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	try {
		const set = new Set(operand.right)

		return set.size === [...operand.right].length ? operand : {
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
