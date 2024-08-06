import concat from "../../../../utilities/array/concat"
import isLeft from "../../../../utilities/isLeft"
import isRight from "../../../../utilities/isRight"
import composeComparators from "../../../composers/composeComparators"

const or = op => async arg => {
	const results = await Promise.all(
		op.operands.map(async operand => await composeComparators(operand)(arg)),
	)

	const rights = results.filter(isRight)

	if (rights.length) {
		return rights[0]
	}

	return results.reduce(
		(out, left) => {
			if (isLeft(left)) {
				return { left: concat(out.left)(left.left) }
			}

			return out
		},
		{ left: [] },
	)
}

export default or
