import Error from "../../../constructors/Error"
import castValue from "../../../utilities/castValue"
import isLeft from "../../../utilities/isLeft"
import composeComparators from "../../composers/composeComparators/index.js"
import getErrorMessage from "./getErrorMessage"

export const compare = (comparator) => (op) => async (arg, localValues) => {
	const operand = await composeComparators(op.operand)(arg, localValues)
	const test = await composeComparators(op.test)(arg, localValues)

	if (isLeft(operand)) {
		return isLeft(test)
			? { left: [...operand.left, ...test.left] }
			: { left: [...operand.left, test] }
	}

	if (isLeft(test)) {
		return { left: [operand, ...test.left] }
	}

	const o = castValue(op.operand.datatype)(operand)
	const t = castValue(op.test.datatype)(test)

	if (isLeft(t)) {
		return isLeft(o)
			? { left: [...t.left, ...o.left] }
			: { left: [...t.left, o] }
	}

	if (isLeft(o)) {
		return { left: [t, ...o.left] }
	}

	return comparator(o.right, t.right) ? operand : {
		left: [
			Error(op)(op.tag)(`${o.right} ${getErrorMessage(op)} ${t.right}.`),
		],
	}
}

export default compare
