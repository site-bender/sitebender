import concat from "../../../../utilities/array/concat"
import isRight from "../../../../utilities/isRight"
import composeComparators from "../../../composers/composeComparators/index.js"

const or = (op) => async (arg, localValues) => {
	const results = await Promise.all(
		op.operands.map(
			async (operand) => await composeComparators(operand)(arg, localValues),
		),
	)

	const rights = results.filter(isRight)

	if (rights.length) {
		return rights[0]
	}

	return results.reduce(
		(out, left) => ({ left: concat(out.left)(left.left) }),
		{ left: [] },
	)
}

export default or
