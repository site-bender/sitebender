import { isRight } from "../../../../types/index.ts"
import composeComparators from "../composeComparators/index.ts"

const composeConditional = (op) => async (arg, localValues) => {
	const conditional = await composeComparators(op)(arg, localValues)

	return isRight(conditional) && conditional.right !== false
}

export default composeConditional
