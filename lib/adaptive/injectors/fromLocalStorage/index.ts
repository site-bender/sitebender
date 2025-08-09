import Error from "../../constructors/Error"
import castValue from "../../utilities/castValue"
import getFromLocal from "../../utilities/getValue/getFromLocal"
import isDefined from "../../utilities/isDefined.js"

const fromLocalStorage = (op) => async (_, localValues) => {
	const local = getFromLocal(op)(localValues)

	if (isDefined(local)) {
		return local
	}

	const { datatype, key } = op
	const value = globalThis.localStorage?.getItem(key)

	if (value == null) {
		return {
			left: [Error(op)("FromLocalStorage")(`Value at key "${key}" not found.`)],
		}
	}

	const casted = castValue(datatype)({ right: value })

	return isDefined(casted.right)
		? casted
		: Error(op)("FromLocalStorage")(casted.left)
}

export default fromLocalStorage
