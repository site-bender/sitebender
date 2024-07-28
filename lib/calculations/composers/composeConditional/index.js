import isRight from "../../../utilities/isRight"
import composeComparators from "../composeComparators"

const composeConditional = op => arg => {
	const conditional = composeComparators(op)(arg)

	return isRight(conditional) && conditional.right !== false
}

export default composeConditional
