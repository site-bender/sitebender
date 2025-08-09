import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators/index.js"

const and = (op) => async (arg, localValues) => {
	return await op.operands.reduce(async (out, val) => {
		const operand = await composeComparators(val)(arg, localValues)

		let ret = await out

		if (isLeft(ret)) {
			ret.left.push(operand)

			return ret
		}

		if (isLeft(operand)) {
			ret = { left: [ret, ...operand.left] }

			return ret
		}

		return operand
	}, {})
}

export default and
