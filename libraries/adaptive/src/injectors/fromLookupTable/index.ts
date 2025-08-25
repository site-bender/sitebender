import Error from "../../constructors/Error/index.ts"
import composeOperators from "../../operations/composers/composeOperators/index.ts"
import { isRight } from "../../../types/index.ts"
import castValue from "../../utilities/castValue/index.ts"
import getValue from "../../utilities/getValue/index.ts"
import isDefined from "../../utilities/isDefined/index.ts"

const fromLookupTable = (op) => async (arg, localValues) => {
	const { datatype = "Json" } = op

	const column = await composeOperators(op.column)(arg, localValues)
	const test = await composeOperators(op.test)(arg, localValues)
	const col = isRight(column) ? column.right : 1
	const table = castValue(datatype)(getValue(op)(localValues))

	if (isDefined(table.left)) {
		return { left: [Error(op)("FromLookupTable")(table.left)] }
	}

	if (isDefined(test.left)) {
		return { left: [Error(op)("FromLookupTable")(table.left)] }
	}

	const out = table.right.reduce((acc, row) => {
		const out = row[col]
		return test?.right >= row[0] ? out : acc
	}, table.right[0][col])

	return { right: out }
}

export default fromLookupTable
