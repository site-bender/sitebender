import Error from "../../constructors/Error"
import composeOperators from "../../operations/composers/composeOperators"
import castValue from "../../utilities/castValue"
import getValue from "../../utilities/getValue"
import isDefined from "../../utilities/isDefined"
import isRight from "../../utilities/isRight"

const fromLookupTable = op => async arg => {
	const { datatype = "Json" } = op || {}

	const column = await composeOperators(op.column)(arg)
	const test = await composeOperators(op.test)(arg)
	const col = isRight(column) ? column.right : 1
	const table = castValue(datatype)(getValue(op))

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
