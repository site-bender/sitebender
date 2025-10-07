import { isRight, type LocalValues } from "../../../../types/index.ts"
import composeComparators from "../composeComparators/index.ts"

const composeConditional = (op: unknown) =>
async (
	arg: unknown,
	localValues?: LocalValues,
) => {
	const conditionalFn = await composeComparators(op as unknown as never)
	const conditional = await conditionalFn(arg, localValues)
	return isRight(conditional) && conditional.right !== false
}

export default composeConditional
