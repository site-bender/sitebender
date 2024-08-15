import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"
import composeConditional from "../../../composers/composeConditional"

const ternary = op => async (arg, localValues) => {
	const condition = await composeConditional(op.condition)(arg, localValues)
	const ifFalse = await composeComparators(op.ifFalse)(arg, localValues)
	const ifTrue = await composeComparators(op.ifTrue)(arg, localValues)

	if (isLeft(condition)) {
		condition.left.push(ifFalse)
		condition.left.push(ifTrue)

		return condition
	}

	if (isLeft(ifFalse)) {
		ifFalse.left.push(condition)
		ifFalse.left.push(ifTrue)

		return ifFalse
	}

	if (isLeft(ifTrue)) {
		ifTrue.left.push(ifFalse)
		ifTrue.left.push(condition)

		return ifTrue
	}

	return condition.right ? ifTrue : ifFalse
}

export default ternary
