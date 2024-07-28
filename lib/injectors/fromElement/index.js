import Error from "../../constructors/Error"
import castValue from "../../utilities/castValue"
import getValue from "../../utilities/getValue"
import isDefined from "../../utilities/isDefined"

const fromElement = op => () => {
	const { datatype = "Number" } = op || {}

	const result = castValue(datatype)(getValue(op)())

	if (isDefined(result.left)) {
		return { left: [Error(op)("FromElement")(result.left)] }
	}

	return result
}

export default fromElement