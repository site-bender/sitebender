import Error from "../../constructors/Error/index.ts"
import castValue from "../../utilities/castValue/index.ts"
import getValue from "../../utilities/getValue/index.ts"
import isDefined from "../../utilities/isDefined.ts"

const fromLookup = (op) => async (_arg, localValues) => {
	const { datatype } = op

	const result = castValue(datatype)(getValue(op)(localValues))

	if (isDefined(result.left)) {
		return { left: [Error(op)("FromLookup")(result.left)] }
	}

	return result
}

export default fromLookup
