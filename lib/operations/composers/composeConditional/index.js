import isRight from "../../../utilities/isRight"
import composeComparators from "../composeComparators"

const composeConditional = op => async (arg, localValues) => {
	const conditional = await composeComparators(op)(arg, localValues)

	return isRight(conditional) && conditional.right !== false
}

export default composeConditional
