import Error from "../../constructors/Error"
import castValue from "../../utilities/castValue"
import getValue from "../../utilities/getValue"
import isDefined from "../../utilities/isDefined.js"

const fromLookup = (op) => async (_arg, localValues) => {
	const { datatype } = op

	const result = castValue(datatype)(getValue(op)(localValues))

	if (isDefined(result.left)) {
		return { left: [Error(op)("FromLookup")(result.left)] }
	}

	return result
}

export default fromLookup
