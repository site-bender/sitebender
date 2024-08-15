import isLeft from "../../../utilities/isLeft"
import composeConditional from "../../composers/composeConditional"
import composeOperators from "../../composers/composeOperators"

const ternary = op => async (arg, localValues) => {
	const condition = await composeConditional(op.condition)(arg, localValues)
	const ifFalse = await composeOperators(op.ifFalse)(arg, localValues)
	const ifTrue = await composeOperators(op.ifTrue)(arg, localValues)

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
