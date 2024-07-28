import composeOperators from "../../calculations/composers/composeOperators"
import Error from "../../constructors/Error"
import castValue from "../../utilities/castValue"
import getValue from "../../utilities/getValue"
import isDefined from "../../utilities/isDefined"
import isRight from "../../utilities/isRight"

const fromLookupTable = op => arg => {
	const { datatype = "Json" } = op || {}

	const column = composeOperators(op.column)(arg)
	const test = composeOperators(op.test)(arg)
	const col = isRight(column) ? column.right : 1
	const table = castValue(datatype)(getValue(op)(arg))

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
