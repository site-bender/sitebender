import isLeft from "../../../utilities/isLeft"
import composeConditional from "../../composers/composeConditional"
import composeOperators from "../../composers/composeOperators"

const ternary = op => async arg => {
	const condition = composeConditional(op.condition)(arg)
	const ifFalse = await composeOperators(op.ifFalse)(arg)
	const ifTrue = await composeOperators(op.ifTrue)(arg)

	if (isLeft(ifFalse)) {
		ifFalse.left.push(ifTrue)

		return ifFalse
	}

	if (isLeft(ifTrue)) {
		ifTrue.left.push(ifFalse)

		return ifTrue
	}

	return condition ? ifTrue : ifFalse
}

export default ternary
