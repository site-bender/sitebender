import isRight from "../../../utilities/isRight"
import composeComparators from "../composeComparators"

const composeConditional = op => async arg => {
	const conditional = await composeComparators(op)(arg)

	return isRight(conditional) && conditional.right !== false
}

export default composeConditional
