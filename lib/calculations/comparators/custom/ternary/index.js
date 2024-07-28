import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"
import composeConditional from "../../../composers/composeConditional"

const ternary = op => arg => {
	const condition = composeConditional(op.condition)(arg)
	const ifFalse = composeComparators(op.ifFalse)(arg)
	const ifTrue = composeComparators(op.ifTrue)(arg)

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
